/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches exactly the block name as specified
  const headerRow = ['Accordion (accordion13)'];

  // Find all accordion items: direct children with class 'divider'
  const items = Array.from(element.querySelectorAll(':scope > .divider'));

  // Edge case: if no .divider children, but element itself is a .divider (unlikely for this structure, but included for resiliency)
  if (items.length === 0 && element.classList.contains('divider')) {
    items.push(element);
  }

  // Parse each accordion item
  const rows = items.map((item) => {
    // Each .divider has a single .w-layout-grid child containing two children: title and content
    const grid = item.querySelector(':scope > .w-layout-grid');
    if (!grid) {
      // Fallback: If structure is broken, supply empty cells
      return ['', ''];
    }
    const [titleEl, contentEl] = grid.children;
    // Defensive: If either is missing, create empty div
    const titleCell = titleEl || document.createElement('div');
    const contentCell = contentEl || document.createElement('div');
    // Reference elements directly (not cloning)
    return [titleCell, contentCell];
  });

  // Compose the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element in place
  element.replaceWith(block);
}
