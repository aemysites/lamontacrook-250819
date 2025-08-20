/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row exactly as in the example
  const headerRow = ['Hero (hero12)'];

  // Get grid layout children
  const grid = element.querySelector('.w-layout-grid');
  const gridChildren = grid ? grid.querySelectorAll(':scope > div') : [];

  // --- Row 2: Background Image ---
  let bgImg = '';
  if (gridChildren.length > 0) {
    const img = gridChildren[0].querySelector('img');
    if (img) bgImg = img;
  }
  const row2 = [bgImg];

  // --- Row 3: Foreground Content ---
  let foregroundContentElements = [];
  if (gridChildren.length > 1) {
    const secondCol = gridChildren[1];
    // Find the .card-body (where all key content lives)
    const cardBody = secondCol.querySelector('.card-body');
    if (cardBody) {
      // Find the inner grid (contains main content and additional image)
      const innerGrid = cardBody.querySelector('.grid-layout');
      if (innerGrid) {
        // Find all children of the inner grid
        const innerChildren = innerGrid.querySelectorAll(':scope > div, :scope > img');
        // Assume the main textual content is in the first child (div)
        if (innerChildren.length > 0) {
          const mainContentDiv = innerChildren[0];
          // Headline
          const headline = mainContentDiv.querySelector('h2');
          if (headline) foregroundContentElements.push(headline);
          // All paragraphs within features
          const featureParagraphs = mainContentDiv.querySelectorAll('p');
          featureParagraphs.forEach(p => foregroundContentElements.push(p));
          // All CTAs (links/buttons)
          const ctAs = mainContentDiv.querySelectorAll('a, button');
          ctAs.forEach(btn => foregroundContentElements.push(btn));
        }
        // Assume any additional images (e.g., concert crowd) are a separate child (img)
        for (let i = 1; i < innerChildren.length; i++) {
          const img = innerChildren[i];
          if (img.tagName && img.tagName.toLowerCase() === 'img') {
            foregroundContentElements.push(img);
          }
        }
      }
    }
    // Fallback: if no .card-body, use secondCol as a block
    if (foregroundContentElements.length === 0) {
      foregroundContentElements = [secondCol];
    }
  }
  // Fallback: if no second grid child, leave cell blank
  const row3 = [foregroundContentElements.length ? foregroundContentElements : ''];

  // Build the table
  const cells = [headerRow, row2, row3];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
