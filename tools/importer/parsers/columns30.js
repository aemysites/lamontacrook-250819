/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (which contains the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Extract each direct column cell
  const columnEls = Array.from(grid.children);
  // Build the cells array so that the header row is a single cell
  // and the next row contains all columns
  const cells = [
    ['Columns (columns30)'], // header row, single column, as required
    columnEls               // content row, each cell is a column
  ];
  // Create the block table referencing original elements
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
