/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cards24)'];

  // Get all cards (each <a> direct child)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // First cell: image (reference the actual <img> element)
    let imgEl = null;
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Second cell: text content
    const textParts = [];

    // Info row: Tag and Date (optional)
    const infoRow = card.querySelector('.flex-horizontal');
    if (infoRow) {
      // We want to combine tag and date in a single line, separated by a space
      const tag = infoRow.querySelector('.tag');
      const date = infoRow.querySelector('.paragraph-sm');
      if (tag || date) {
        const infoDiv = document.createElement('div');
        if (tag) {
          // Use the existing tag element directly
          infoDiv.appendChild(tag);
        }
        if (date) {
          if (tag) {
            // Add separator if both tag and date
            infoDiv.appendChild(document.createTextNode(' '));
          }
          infoDiv.appendChild(date);
        }
        textParts.push(infoDiv);
      }
    }

    // Heading row (title)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      // Use the original heading element (preserving class and tag)
      textParts.push(heading);
    }

    return [imgEl, textParts];
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
