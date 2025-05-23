/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';

// Setup mock before importing the module
jest.unstable_mockModule('./storage.js', () => ({
  getUserIds: () => ['user1'],
  getData: () => [],
  setData: () => {},
}));

// Set up DOM before importing script.js
beforeAll(() => {
  document.body.innerHTML = `
    <select id="user-select"></select>
    <select id="userSelect"></select>
    <div id="bookmark-list"></div>
    <form id="bookmarkForm">
      <input id="url" />
      <input id="title" />
      <input id="description" />
    </form>
  `;
});

// Now import after DOM setup
const { displayBookmarks } = await import('./script.js');

test("displayBookmarks shows empty message when no bookmarks", () => {
  displayBookmarks("user1");
  const container = document.getElementById("bookmark-list");
  expect(container.textContent).toContain("No bookmarks for this user.");
});
