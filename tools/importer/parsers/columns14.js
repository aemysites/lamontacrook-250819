/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns14) block
  const headerRow = ['Columns (columns14)'];

  // Find the grid layout that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columnNodes = Array.from(grid.children);
  // Defensive check: only proceed if there are at least 2 columns
  if (columnNodes.length < 2) return;

  // Each cell is a column block, referencing the actual element
  // This structure matches the example: heading in column 1, paragraph+button in column 2
  const row = [
    columnNodes[0], // h2, left column
    columnNodes[1]  // right column (div with p and a)
  ];

  // Build and replace with table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}
