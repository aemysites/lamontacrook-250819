/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly the block as per spec.
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Find all accordion items (direct children)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // TITLE CELL: Find the inner text element (usually .paragraph-lg)
    let titleEl = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!titleEl) {
      // fallback to first .w-dropdown-toggle child that is not the icon
      const toggle = item.querySelector('.w-dropdown-toggle');
      if (toggle) {
        // Skip the icon, use remaining children or the toggle itself
        const candidates = Array.from(toggle.children).filter((c) => !c.classList.contains('dropdown-icon'));
        titleEl = candidates[0] || toggle;
      } else {
        // fallback: create an empty div
        titleEl = document.createElement('div');
      }
    }

    // CONTENT CELL: Find the expanded content (usually .w-dropdown-list > .utility-padding-all-1rem > .rich-text, fallback to padded div or .w-dropdown-list)
    let contentEl = null;
    const wDropdownList = item.querySelector('.w-dropdown-list');
    if (wDropdownList) {
      // Common structure: .utility-padding-all-1rem under .w-dropdown-list
      let padDiv = wDropdownList.querySelector('.utility-padding-all-1rem');
      if (padDiv) {
        // Most common case: .rich-text div inside
        contentEl = padDiv.querySelector('.rich-text') || padDiv;
      } else {
        // fallback: just take .w-dropdown-list
        contentEl = wDropdownList;
      }
    } else {
      // fallback: empty div
      contentEl = document.createElement('div');
    }

    // Add row to table, referencing existing elements
    rows.push([titleEl, contentEl]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
