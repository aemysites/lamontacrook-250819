/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns (should be a 2-column layout)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (correspond to columns)
  const cols = Array.from(grid.children);

  // Defensive: Expecting at least 2 columns
  const leftCol = cols[0];
  const rightCol = cols[1];

  // Build table header as specified
  const headerRow = ['Columns (columns27)'];
  // Each cell should reference an existing DOM element (column container)
  const row = [];
  if (leftCol) row.push(leftCol);
  if (rightCol) row.push(rightCol);

  // If only one column present, still create two cells (one empty)
  if (row.length === 1) row.push('');

  const cells = [
    headerRow,
    row
  ];

  // Create the columns block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the section with the new table
  element.replaceWith(block);
}