/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row exactly as required.
  const headerRow = ['Cards (cards37)'];

  // Find the outermost grid of cards
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // The mainGrid has a structure: first child is the big card, second child is another grid with more cards
  // Collect all card <a> elements in order
  const cardElements = [];
  for (const child of mainGrid.children) {
    if (child.matches('a')) {
      cardElements.push(child);
    } else if (child.matches('div.grid-layout')) {
      // This is the right-side grid with multiple cards
      for (const innerChild of child.children) {
        if (innerChild.matches('a')) {
          cardElements.push(innerChild);
        }
      }
    }
  }

  const rows = cardElements.map(card => {
    // Find the image: in a .utility-aspect-2x3 or .utility-aspect-1x1 container, or any <img>
    let img = null;
    const aspect = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (aspect) {
      img = aspect.querySelector('img');
    } else {
      img = card.querySelector('img');
    }
    // Text content: heading, description, button (if present)
    // Sometimes content is in a .utility-padding-all-2rem div
    let contentRoot = card.querySelector('.utility-padding-all-2rem') || card;
    const heading = contentRoot.querySelector('h2, h3, h4, h5, h6');
    const desc = contentRoot.querySelector('p');
    const cta = contentRoot.querySelector('.button, button, a.button');
    // Build the cell. Use only existing elements, preserve order
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (desc) contentCell.push(desc);
    if (cta) contentCell.push(cta);
    return [img, contentCell];
  });

  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
