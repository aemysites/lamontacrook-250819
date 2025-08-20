/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: Must match example
  const headerRow = ['Hero (hero20)'];

  // --- Extract background images ---
  // Find the grid containing possible hero images
  let bgCell = '';
  const gridLayout = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (gridLayout) {
    // Get all img elements directly inside grid
    const imgs = Array.from(gridLayout.querySelectorAll('img'));
    if (imgs.length > 0) {
      // If more than one image, wrap in a div to preserve structure and reference all images
      if (imgs.length === 1) {
        bgCell = imgs[0];
      } else {
        const bgDiv = document.createElement('div');
        imgs.forEach(img => bgDiv.appendChild(img));
        bgCell = bgDiv;
      }
    }
  }

  // --- Extract text content: Heading, subheading, CTA ---
  // Look for content container (contains h1, p, buttons)
  let contentCell = '';
  const content = element.querySelector('.ix-hero-scale-3x-to-1x-content .container, .ix-hero-scale-3x-to-1x-content');
  if (content) {
    contentCell = content;
  }

  // Block table structure: 1 col, 3 rows
  const cells = [
    headerRow,
    [bgCell],
    [contentCell]
  ];

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
