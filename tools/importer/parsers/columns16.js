/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid element containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get each image inside the grid columns
  const columnDivs = Array.from(grid.children);
  const images = columnDivs.map(colDiv => {
    const img = colDiv.querySelector('img');
    return img || '';
  });

  // Table header: ONLY one column, matching the example
  const headerRow = ['Columns (columns16)'];
  // Content row: one cell per image
  const contentRow = images;

  // Create table with correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the structured table
  element.replaceWith(table);
}
