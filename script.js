// script.js

import { getUserIds, getData, setData } from "./storage.js";

export function displayBookmarks(userId) {
  const bookmarks = getData(userId) || [];

  const container = document.getElementById("bookmark-list");
  container.innerHTML = "";

  if (bookmarks.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No bookmarks for this user.";
    container.appendChild(msg);
    return;
  }

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

window.onload = () => {
  const users = getUserIds();
  const userSelect = document.getElementById("userSelect");

  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });

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
};
