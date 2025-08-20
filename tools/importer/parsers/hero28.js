/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // 2. First child: image/background
  const imageCol = gridChildren[0];
  // Look for a direct descendant image (not deep descendant)
  let img = null;
  // .cover-image is likely the correct image for hero
  img = imageCol.querySelector('img.cover-image');

  // 3. Second child: text/content
  const textCol = gridChildren[1];
  // The text column can have one or more wrappers, but we want all content
  // inside it. We'll collect all children of textCol, but prefer content inside the
  // .utility-margin-bottom-6rem container for hero text.
  let contentDiv = textCol.querySelector('.utility-margin-bottom-6rem');
  if (!contentDiv) {
    // fallback: just use textCol
    contentDiv = textCol;
  }

  // 4. Prepare block rows
  const headerRow = ['Hero (hero28)'];
  const imageRow = [img ? img : ''];
  const textRow = [contentDiv];

  // 5. Create and insert the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
