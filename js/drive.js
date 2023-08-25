// Declarations
const file_card = document.querySelectorAll(".file-card");
const uploadBtn = document.querySelector("#upload-btn");
const uploadDropdown = document.querySelector("#upload-dropdown");
const contextMenu = document.querySelector(".context-menu-wrapper");
const shareMenu = contextMenu.querySelector(".context-menu-sharesub");
const sortMenu = contextMenu.querySelector(".context-menu-sortsub");
let firstClickedCard = null;

// Functions
/**
 * @param {Element} card
 * Change border of selected card
 */
function selectCard(card) {
  card.classList.add("card-selected");
}

/**
 * @param {Element} card
 * Remove border of selected card
 */
function deselectCard(card) {
  card.classList.remove("card-selected");
}

/**
 * @param {Element} card
 * Toggle border of selected card
 */
function toggleCardSelection(card) {
  card.classList.toggle("card-selected");
}

/**
 * @param {Element} card
 * Get clicked card's index
 */
function getCardIndex(card) {
  return Array.from(file_card).indexOf(card);
}

/**
 * @param {Element} start
 * @param {Element} end
 * Select card within two clicks when holding shift key
 */
function selectRange(start, end) {
  const startIndex = Math.min(start, end);
  const endIndex = Math.max(start, end);

  for (let i = startIndex; i <= endIndex; i++) {
    selectCard(file_card[i]);
  }
}

/**
 * Remove border from all cards
 */
function deselectAll() {
  file_card.forEach((card) => deselectCard(card));
}

/**
 * Calculate the position of the context menu
 */
function calculatePosition(x, y) {
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const cmWidth = contextMenu.offsetWidth;
  const cmHeight = contextMenu.offsetHeight;

  let posX = Math.min(x, winWidth - cmWidth);
  let posY = Math.min(y, winHeight - cmHeight);

  if (x > winWidth - cmWidth - shareMenu.offsetWidth) {
    shareMenu.style.left = "-10rem";
  } else {
    shareMenu.style.left = "";
    shareMenu.style.right = "-10rem";
  }

  return { posX, posY };
}

/**
 * Show context menu in the cursor position
 */
function showContextMenu(x, y) {
  contextMenu.style.display = "block"; // Moved here
  const { posX, posY } = calculatePosition(x, y);
  contextMenu.style.left = `${posX}px`;
  contextMenu.style.top = `${posY}px`;
}

/**
 * Hide context menu
 */
function hideContextMenu() {
  contextMenu.style.display = "none";
}

// Main Code
window.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("click", function (event) {
  const clickedCard = event.target.closest(".file-card");

  if (clickedCard) {
    if (event.shiftKey && firstClickedCard !== null) {
      // When holding shift key
      const secondClickedIndex = getCardIndex(clickedCard);
      deselectAll();
      selectRange(firstClickedCard, secondClickedIndex);
      firstClickedCard = null;
    } else if (event.ctrlKey || event.metaKey) {
      // When holding ctrl key
      toggleCardSelection(clickedCard);
      firstClickedCard = null;
    } else {
      // When select card without pressing ctrl or shift key
      deselectAll();
      selectCard(clickedCard);
      firstClickedCard = getCardIndex(clickedCard);
    }
  } else {
    // When click on area other than card
    deselectAll();
    firstClickedCard = null;
  }
});

// When click on area other than new button
document.addEventListener("click", (event) => {
  if (!uploadBtn.contains(event.target) && !uploadDropdown.contains(event.target)) {
    uploadDropdown.close();
  }
});

// Toggle upload dropdown menu
uploadBtn.addEventListener("click", () => {
  if (uploadDropdown.open) {
    uploadDropdown.close();
  } else {
    uploadDropdown.show();
  }
});

// Toggle context menu
window.addEventListener("contextmenu", (e) => {
  for (const card of file_card) {
    if (card.contains(e.target)) {
      e.preventDefault();
      showContextMenu(e.clientX, e.clientY);
      return;
    }
  }
  hideContextMenu();
});

document.addEventListener("click", hideContextMenu);
