/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect ALL its children (so if they have text, images, lists, links, etc)
  // This ensures we handle all content types, not just images
  const colContents = columns.map(col => {
    // Gather all children (nodes) as an array, including text nodes if relevant
    const nodes = Array.from(col.childNodes).filter(node => {
      // Keep element nodes, and non-empty text nodes
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
    });
    if (nodes.length === 1) {
      return nodes[0];
    } else if (nodes.length > 1) {
      return nodes;
    } else {
      return '';
    }
  });

  // Compose the cells for the columns4 block
  const cells = [
    ['Columns (columns4)'],
    colContents
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
