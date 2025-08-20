/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure header row is a single cell with the correct text
  const headerRow = ['Columns (columns31)'];

  // Find the grid container - handles most common layout cases
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    columns = Array.from(grid.children);
  } else {
    columns = Array.from(element.children);
  }

  // For each column, collect ALL relevant content
  // If the column is a wrapper, flatten its direct children if appropriate
  // But for this case, each column is a div with all content inside
  const columnsRow = columns.map((col) => {
    // If there is only one direct relevant child, use it (for flexibility)
    // Otherwise, use the column itself
    //
    // For more complex HTML, you could flatten if col only wraps one block
    // But here, use col directly
    return col;
  });

  // Defensive: ensure each cell has content (could further flatten if needed)
  // But for this HTML, each col is correct
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
