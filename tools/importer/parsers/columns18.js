/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container in the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid: 2 columns in this layout
  const gridChildren = Array.from(grid.children);

  // To match the rendered screenshot, column 1: text+list, column 2: image
  // We'll use their types to assign them
  let col1 = [];
  let col2 = [];

  // col1: All non-image elements (the div and ul)
  // col2: The image
  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      col2.push(child);
    } else {
      col1.push(child);
    }
  }

  // If either column is empty, fallback to empty array
  if (!col1.length) col1 = [''];
  if (!col2.length) col2 = [''];

  // Header row per spec
  const headerRow = ['Columns (columns18)'];
  const cellsRow = [col1, col2];

  const table = WebImporter.DOMUtils.createTable([headerRow, cellsRow], document);

  element.replaceWith(table);
}
