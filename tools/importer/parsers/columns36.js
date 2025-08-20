/* global WebImporter */
export default function parse(element, { document }) {
  // Select the two main columns (left: text/buttons, right: images)
  const container = element.querySelector('.container');
  if (!container) return;
  const gridLayout = container.querySelector('.grid-layout');
  if (!gridLayout) return;
  const mainCols = Array.from(gridLayout.children);
  if (mainCols.length < 2) return;

  // Left column: heading, subheading, and buttons
  const leftCol = mainCols[0];
  const leftContent = [];
  // Get heading (h1)
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  // Get subheading/paragraph (subheading class or first p)
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Get button group (all links)
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) {
    leftContent.push(buttonGroup);
  }

  // Right column: images grid
  const rightCol = mainCols[1];
  // Find the nested images grid (may vary in class names, so look for grid-layout inside rightCol)
  let images = [];
  const imagesGrid = rightCol.querySelector('.grid-layout');
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Table header as per spec
  const headerRow = ['Columns (columns36)'];
  // Second row: left cell: all left content; right cell: all images
  const secondRow = [leftContent, images];
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
