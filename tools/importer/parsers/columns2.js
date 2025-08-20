/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the block name exactly
  const headerRow = ['Columns (columns2)'];

  // Find the grid layout that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // The first child is the large left card
  const leftCol = gridChildren[0];

  // The next two are the right column, stacked vertically
  // To ensure all text and structure are preserved, append both into a container
  const rightCol = document.createElement('div');
  gridChildren.slice(1).forEach(child => {
    rightCol.appendChild(child);
  });

  // All content remains referenced, not cloned
  // Assemble the cells as per the block structure: header row, then 1 row of 2 columns
  const cells = [
    headerRow,
    [leftCol, rightCol],
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
