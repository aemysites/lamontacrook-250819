/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each card: get image and corresponding text (from alt attribute)
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    let textContent;
    // If there's alt text, use that as the text cell; otherwise, provide non-breaking space
    if (img && img.alt && img.alt.trim()) {
      const p = document.createElement('p');
      p.textContent = img.alt;
      textContent = p;
    } else {
      textContent = '\u00A0';
    }
    rows.push([img, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
