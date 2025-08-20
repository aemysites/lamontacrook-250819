/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu (labels)
  const tabMenu = element.querySelector('.w-tab-menu');
  // Get the tab content container
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // Get tab label elements
  const labelLinks = Array.from(tabMenu.children).filter(el => el.matches('a,button,[role="tab"]'));
  // Get tab pane elements
  const tabPanes = Array.from(tabContent.children).filter(el => el.classList.contains('w-tab-pane'));

  // Build rows: [Label, Content]
  const rows = [];
  for (let i = 0; i < labelLinks.length && i < tabPanes.length; i++) {
    // Use the inner div for label if present, fallback to label link
    let labelEl = labelLinks[i].querySelector('div');
    if (!labelEl) labelEl = labelLinks[i];
    
    // Content: if the tab pane has a single child div, use it; else use the pane
    let contentBlock = tabPanes[i];
    const tabPaneDivs = tabPanes[i].querySelectorAll(':scope > div');
    if (tabPaneDivs.length === 1) {
      contentBlock = tabPaneDivs[0];
    }
    rows.push([labelEl, contentBlock]);
  }

  // Table header row: block name (EXACTLY one column)
  const headerRow = ['Tabs'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
