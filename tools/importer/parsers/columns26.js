/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container and the main grid
  const mainContainer = element.querySelector('.container');
  if (!mainContainer) return;
  const mainGrid = mainContainer.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get immediate children of mainGrid
  const gridChildren = Array.from(mainGrid.children);
  // Defensive: If structure not as expected, exit
  if (gridChildren.length < 3) return;

  // The nested grid with testimonial content
  const nestedGrid = gridChildren[2];
  if (!nestedGrid || !nestedGrid.classList.contains('w-layout-grid')) return;
  const nestedChildren = Array.from(nestedGrid.children);

  // Defensive: Make sure nested grid has all expected parts
  if (nestedChildren.length < 3) return;

  // LEFT COLUMN
  // - Heading (gridChildren[0])
  // - Divider (nestedChildren[0])
  // - Avatar/name/title (nestedChildren[1])
  const leftColumnElements = [gridChildren[0], nestedChildren[0], nestedChildren[1]];

  // RIGHT COLUMN
  // - Quote (gridChildren[1])
  // - Logo/brand (nestedChildren[2])
  const rightColumnElements = [gridChildren[1], nestedChildren[2]];

  // Header row as per block name
  const headerRow = ['Columns (columns26)'];
  // 2 columns, each with relevant grouped elements
  const contentRow = [leftColumnElements, rightColumnElements];

  const tableRows = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
