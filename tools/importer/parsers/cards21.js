/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the block, per spec and example
  const headerRow = ['Cards (cards21)'];

  // 2. Find the card(s). The structure is:
  // div.utility-position-sticky.sticky-mobile
  //   > div.ix-card-rotate-2.ix-backdrop-filter-blur (holds card)
  //     > div.card.card-on-secondary
  //       > div.card-body
  //         > div.h4-heading (title)
  //         > img.cover-image (image)

  // For future-proofing, handle multiple cards if present
  // (now only one in current example)
  const cards = [];
  const cardNodes = element.querySelectorAll('.card-body');
  if (cardNodes.length > 0) {
    cardNodes.forEach(cardBody => {
      // Find image (required) and heading (optional)
      const img = cardBody.querySelector('img');
      const heading = cardBody.querySelector('h1, h2, h3, h4, h5, h6, .h4-heading, [class*="heading"]');

      // Use heading if present, else fallback to empty div (preserves 2-column structure)
      const textCell = heading ? heading : document.createElement('div');
      cards.push([img, textCell]);
    });
  } else {
    // fallback: parse old structure if card-body missing
    const img = element.querySelector('img');
    const heading = element.querySelector('h1, h2, h3, h4, h5, h6, .h4-heading, [class*="heading"]');
    if (img || heading) {
      cards.push([
        img,
        heading ? heading : document.createElement('div')
      ]);
    }
  }

  // 3. Compose table data: header row + card rows
  const rows = [headerRow, ...cards];

  // 4. Create table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace element with block
  element.replaceWith(block);
}
