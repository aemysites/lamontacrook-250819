/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block definition
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];
  // Only select direct child card containers
  const cardContainers = Array.from(element.querySelectorAll(':scope > div'));
  cardContainers.forEach(card => {
    // Find the main image inside the card (must be present)
    const img = card.querySelector('img');
    if (!img) return; // skip if no image (required by spec)
    // Try to find a text container with title and description
    let title = card.querySelector('h3, h2, h4, h5, h6');
    let desc = card.querySelector('p');
    let textContent = [];
    if (title) textContent.push(title);
    if (desc) textContent.push(desc);
    // If both missing, try for any block with text (e.g., .utility-padding-all-2rem)
    if (!title && !desc) {
      const altTextBlock = card.querySelector('.utility-padding-all-2rem');
      if (altTextBlock) textContent.push(...Array.from(altTextBlock.childNodes));
    }
    // If nothing found, preserve cell with non-breaking space to keep column count
    if (!textContent.length) textContent = ['\u00A0'];
    rows.push([
      img,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });
  // Build and replace block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
