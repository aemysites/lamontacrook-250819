/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the content container with the headline, subheading, and CTA
  let grid = element.querySelector('.grid-layout');

  // Fallback: use the only div in container if .grid-layout is missing
  if (!grid) {
    const possibleContainers = element.querySelectorAll('div');
    grid = possibleContainers[possibleContainers.length - 1];
  }

  // The grid contains two children: one with text, one with button
  let headline = null;
  let subheading = null;
  let cta = null;
  if (grid) {
    for (const child of grid.children) {
      if (!headline && child.querySelector('h1, h2, h3, h4, h5, h6')) {
        // Headline is the first heading
        headline = child.querySelector('h1, h2, h3, h4, h5, h6');
        // Subheading is likely a <p> in this child
        subheading = child.querySelector('p');
      } else if (!cta && child.tagName === 'A') {
        cta = child;
      }
    }
  }

  // Build the cell content for row 3: headline, subheading, call-to-action
  const contentArr = [];
  if (headline) contentArr.push(headline);
  if (subheading) contentArr.push(subheading);
  if (cta) contentArr.push(cta);

  // According to the example, there is no background image row in the screenshot, so row 2 is blank
  const rows = [
    ['Hero (hero35)'],
    [''], // Background image row, left blank as per this HTML/example
    [contentArr],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
