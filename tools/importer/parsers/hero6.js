/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with block name (exact)
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row (optional)
  // Look for the first <img> tag in the tree
  const img = element.querySelector('img');
  const imgRow = [img || ''];

  // 3. Content row: title, subheading, call-to-action (all content)
  // Find the second '.grid-layout' which contains the content
  const grids = element.querySelectorAll('.grid-layout');
  let contentCell = '';
  if (grids.length > 1) {
    // The 'card' holds all content (heading, subheading, ctas)
    const card = grids[1].querySelector('.card');
    if (card) {
      contentCell = card;
    } else {
      // Fallback: use the full grid if card isn't found
      contentCell = grids[1];
    }
  }
  const contentRow = [contentCell];

  // Compose the table
  const cells = [
    headerRow,
    imgRow,
    contentRow,
  ];

  // Replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
