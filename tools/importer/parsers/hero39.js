/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header exactly as required
  const headerRow = ['Hero (hero39)'];

  // 2. Extract background image (if any)
  let bgImg = null;
  // The image is inside the first major grid child
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid');
  for (const gridDiv of gridDivs) {
    // Look for an image directly contained
    const img = gridDiv.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // 3. Extract content block (heading, subhead, CTA)
  let contentCell = '';
  const gridDiv = element.querySelector('.container');
  if (gridDiv) {
    // This contains the main content (h1, paragraph, button)
    contentCell = gridDiv;
  }

  // 4. Compose table rows
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
