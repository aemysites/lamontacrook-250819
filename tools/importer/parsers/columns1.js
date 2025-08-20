/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid; expected image and main text block
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the image (leave as is, don't clone)
  const imageCol = gridChildren[0];
  // Second column: the text stack (h1, p, buttons)
  const textCol = gridChildren[1];

  // Compose the cells array for the columns block, header row first
  const cells = [
    ['Columns (columns1)'],
    [imageCol, textCol]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
