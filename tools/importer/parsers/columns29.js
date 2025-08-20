/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build the content row by referencing the relevant child of each column
  const contentRow = columns.map(col => {
    return col.children.length ? col.children[0] : col;
  });

  // Header row: first cell is the header, the rest are empty strings (to match number of columns)
  const headerRow = ['Columns (columns29)'];
  while (headerRow.length < contentRow.length) {
    headerRow.push('');
  }

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
