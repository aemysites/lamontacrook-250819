/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Select all immediate <a> children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach(card => {
    // Find the first image in this card
    const img = card.querySelector('img');

    // Find the content div (textual content)
    // The card inner structure is: .w-layout-grid > img + div (the second child div contains all text)
    let cardGrid = card.querySelector(':scope > .w-layout-grid');
    if (!cardGrid) cardGrid = card; // fallback
    const gridChildren = Array.from(cardGrid.children);
    // Find the first div sibling after the img
    let textDiv = null;
    for (let i = 0; i < gridChildren.length; i++) {
      if (gridChildren[i].tagName === 'IMG' && gridChildren[i + 1] && gridChildren[i + 1].tagName === 'DIV') {
        textDiv = gridChildren[i + 1];
        break;
      }
    }
    // Fallback: if not found, find the first direct child div (likely safe enough)
    if (!textDiv) {
      textDiv = gridChildren.find((n) => n.tagName === 'DIV');
    }

    // Row: [image, text content]
    rows.push([
      img,
      textDiv
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
