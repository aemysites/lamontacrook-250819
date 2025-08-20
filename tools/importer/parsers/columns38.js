/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell array (one column)
  const headerRow = ['Columns (columns38)'];

  // The columns: each direct child div is a column
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, include the entire content (not just images), to support mixed content as in example
  const contentRow = columns.map(col => col);

  // The table must have exactly two rows: header (1 cell), then content (N cells)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  
  element.replaceWith(table);
}
