/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const cols = Array.from(grid.children);
  // Defensive: expect two columns (image and text)
  if (cols.length < 2) return;

  // First column: image (reference existing element)
  const imgCol = cols.find(child => child.tagName === 'IMG');
  // Second column: everything else (typically a div)
  const contentCol = cols.find(child => child.tagName !== 'IMG');

  // Table header row matches example exactly
  const headerRow = ['Columns (columns32)'];
  // Table row: both columns as elements
  const dataRow = [imgCol, contentCol];

  // Only create the block table, no Section Metadata or extra <hr>, per the example
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  element.replaceWith(table);
}
