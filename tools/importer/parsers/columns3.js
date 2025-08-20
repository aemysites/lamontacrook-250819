/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  // The structure is section > div.container > div.grid-layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the direct children of the grid, each represents a column
  const columns = Array.from(grid.children);
  // If there are no columns, do nothing
  if (!columns.length) return;

  // The header row must be a single cell and match the markdown example exactly
  const headerRow = ['Columns (columns3)'];
  // The next row: as many columns/cells as found in the grid layout
  const contentRow = columns;

  // Create table structure
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
