/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the example exactly
  const headerRow = ['Cards'];

  // Collect all direct child card containers (one per card)
  const cardDivs = element.querySelectorAll(':scope > div');

  const rows = [headerRow];

  cardDivs.forEach(cardDiv => {
    // The text for each card is in the <p> tag inside the card div
    // We must reference the existing <p> element (do not clone)
    const p = cardDiv.querySelector('p');
    if (p && p.textContent.trim()) {
      rows.push([p]);
    }
  });

  // Only create the Cards table; there is no Section Metadata in the example
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
