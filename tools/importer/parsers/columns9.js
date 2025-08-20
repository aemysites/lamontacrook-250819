/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // Compose the header row with exactly one cell
  const headerRow = ['Columns (columns9)'];
  // Compose the second row with one cell per column
  const contentRow = columns;
  // Create the table with the correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}