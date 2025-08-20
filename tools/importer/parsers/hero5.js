/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example
  const headerRow = ['Hero (hero5)'];

  // Get the outer grid that contains both the content and image
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Find image element for background image (row 2)
  let bgImg = null;
  for (const child of children) {
    if (child.tagName === 'IMG' && child.src) {
      bgImg = child;
      break;
    }
  }

  // Find the content area (row 3: heading, paragraph, buttons)
  let contentBlock = null;
  for (const child of children) {
    // Look for the block that contains heading, paragraph, and buttons
    if (
      child.querySelector &&
      (
        child.querySelector('h1, h2, h3, h4, h5, h6') ||
        child.querySelector('.rich-text, .paragraph-lg, p') ||
        child.querySelector('.button-group, .button')
      )
    ) {
      contentBlock = child;
      break;
    }
  }

  // Ensure empty cells if missing for resilience
  const rows = [
    headerRow,
    [bgImg || ''],
    [contentBlock || ''],
  ];

  // Build table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
