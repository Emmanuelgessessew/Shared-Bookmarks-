// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

window.onload = function () {
  const users = getUserIds();
  const userSelect = document.getElementById("userSelect");

  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
};

export function displayBookmarks(userId) {
  const bookmarks = getData(userId) || [];

  const container = document.getElementById("bookmark-list");
  container.innerHTML = ""; // Clear old content

  if (bookmarks.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No bookmarks for this user.";
    container.appendChild(msg);
    return;
  }

  // Reverse chronological order
  const sorted = bookmarks.slice().reverse();

  sorted.forEach((bookmark) => {
    const item = document.createElement("div");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";

    const desc = document.createElement("p");
    desc.textContent = bookmark.description;

    const time = document.createElement("small");
    time.textContent = `Saved: ${new Date(bookmark.createdAt).toLocaleString()}`;

    item.appendChild(link);
    item.appendChild(desc);
    item.appendChild(time);

    container.appendChild(item);
  });
}

// Add listener to dropdown
document.getElementById("user-select").addEventListener("change", function () {
  const selectedUserId = this.value;
  displayBookmarks(selectedUserId);
});

document.getElementById("bookmarkForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const url = document.getElementById("url").value.trim();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const userId = document.getElementById("user-select").value;

  if (!userId) {
    alert("Please select a user first.");
    return;
  }

  const newBookmark = {
    url,
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  const existing = getData(userId) || [];
  existing.push(newBookmark);
  setData(userId, existing);

  document.getElementById("bookmarkForm").reset();
  displayBookmarks(userId);
});

