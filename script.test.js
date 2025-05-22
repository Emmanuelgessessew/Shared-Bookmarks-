/**
 * @jest-environment jsdom
 */

import { displayBookmarks } from "./script.js";
import { getData } from "./storage.js";

// Mock getData
jest.mock("./storage.js", () => ({
  getData: jest.fn()
}));

beforeEach(() => {
  // Set up the DOM structure
  document.body.innerHTML = `<div id="bookmark-list"></div>`;
});

test("displays message when no bookmarks exist", () => {
  getData.mockReturnValue([]);

  displayBookmarks("1");

  const container = document.getElementById("bookmark-list");
  expect(container.textContent).toContain("No bookmarks for this user.");
});

test("displays bookmarks in reverse order", () => {
  const bookmarks = [
    {
      url: "https://example.com/1",
      title: "Bookmark 1",
      description: "Desc 1",
      createdAt: "2024-01-01T12:00:00Z"
    },
    {
      url: "https://example.com/2",
      title: "Bookmark 2",
      description: "Desc 2",
      createdAt: "2024-02-01T12:00:00Z"
    }
  ];

  getData.mockReturnValue(bookmarks);

  displayBookmarks("1");

  const container = document.getElementById("bookmark-list");
  const links = container.querySelectorAll("a");

  expect(links.length).toBe(2);
  expect(links[0].textContent).toBe("Bookmark 2"); // Newest first
  expect(links[1].textContent).toBe("Bookmark 1");
});
