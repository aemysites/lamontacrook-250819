/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const mainContainer = element.querySelector('.container');
  if (!mainContainer) return;
  const gridLayout = mainContainer.querySelector('.w-layout-grid');
  if (!gridLayout) return;

  // Get all direct children of the grid (these are the column cells)
  const gridChildren = Array.from(gridLayout.children);
  if (gridChildren.length === 0) return;

  // Compose the table so that the header row is a single cell (spanning all columns)
  // and the content row contains one cell per column
  const headerRow = ['Columns (columns15)'];
  const contentRow = gridChildren;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,           // single column header
    contentRow           // multi-column content row
  ], document);

  element.replaceWith(table);
}
