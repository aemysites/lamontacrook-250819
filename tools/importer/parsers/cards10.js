/* global WebImporter */
export default function parse(element, { document }) {
  // Header matches the example exactly
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all direct child <a> elements (each is a card)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Image: always in the .utility-aspect-3x2 container
    let image = null;
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    if (imgContainer) {
      image = imgContainer.querySelector('img');
    }
    if (!image) {
      // fallback if structure changes
      image = card.querySelector('img');
    }

    // Text block: tag (optional), heading, description
    const textBlock = [];
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      textBlock.push(tagGroup);
    }
    const heading = card.querySelector('h3, .h4-heading, .card-title');
    if (heading) {
      textBlock.push(heading);
    }
    const desc = card.querySelector('p');
    if (desc) {
      textBlock.push(desc);
    }
    // Defensive: if all text missing, put a blank
    if (textBlock.length === 0) textBlock.push('');

    rows.push([
      image ? image : '',
      textBlock
    ]);
  });

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
