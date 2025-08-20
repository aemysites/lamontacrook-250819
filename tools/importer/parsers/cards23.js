/* global WebImporter */
export default function parse(element, { document }) {
  // The table header should exactly match the provided example
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // Find all tab panes under the top-level element
  const tabPanes = element.querySelectorAll('[class*="w-tab-pane"]');
  tabPanes.forEach((tabPane) => {
    // For each tab, find its grid container
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;

    // Each card is an immediate child <a> of the grid
    const cardLinks = Array.from(grid.querySelectorAll(':scope > a'));
    cardLinks.forEach((card) => {
      // Card image (first cell)
      let imgCell = '';
      const img = card.querySelector('img');
      if (img) imgCell = img;

      // Card text (second cell)
      let textCell = [];
      // Heading
      const heading = card.querySelector('h3, h4, h2, h1');
      if (heading) textCell.push(heading);
      // Description
      const desc = card.querySelector('.paragraph-sm');
      if (desc) textCell.push(desc);
      // If textCell is empty, fallback to plain text content
      if (textCell.length === 0) {
        // Try to get any text node in the card
        if (card.textContent.trim()) {
          textCell = [document.createTextNode(card.textContent.trim())];
        }
      }
      // If only one text element, don't wrap in array
      const textCellFinal = (textCell.length === 1) ? textCell[0] : textCell;

      cells.push([imgCell, textCellFinal]);
    });
  });

  // Make the block and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
