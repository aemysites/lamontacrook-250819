/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as shown in example
  const headerRow = ['Cards (cards7)'];
  // Collect all card containers (immediate children)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [headerRow];
  cardDivs.forEach(cardDiv => {
    // Find the <img> within this card
    const img = cardDiv.querySelector('img');
    // Use empty string for right column because there is no text content in the card
    // If more content is present, it would go here.
    rows.push([img, '']);
  });
  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
