/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one cell
  const headerRow = ['Columns (columns11)'];

  // Main content: get the first grid (textual content/copy)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftCol = null;
  let rightCol = null;
  if (mainGrid) {
    const mainGridChildren = mainGrid.querySelectorAll(':scope > div');
    if (mainGridChildren.length > 0) leftCol = mainGridChildren[0];
    if (mainGridChildren.length > 1) rightCol = mainGridChildren[1];
  }

  // Compose first column: left and right content (as in example, both go into one cell)
  const textCellContent = [];
  if (leftCol) textCellContent.push(leftCol);
  if (rightCol) textCellContent.push(rightCol);

  // Get the second grid (images)
  const imageGrid = element.querySelector('.w-layout-grid.mobile-portrait-1-column');
  const imageCellContent = [];
  if (imageGrid) {
    const imgs = imageGrid.querySelectorAll('img');
    imgs.forEach(img => imageCellContent.push(img));
  }

  // Second row: exactly two columns (as in the example)
  const contentRow = [textCellContent, imageCellContent];

  // Create table with correct structure: header row (1 cell), content row (2 cells)
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
