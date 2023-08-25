// Declarations
const sidebarLink = document.querySelectorAll(".sidebar-link");
const logo = document.querySelector(".header-logo");
const home_btn = document.querySelector("#home-btn");
const accountIcon = document.querySelector(".account-icon");
const accountDropdown = document.querySelector(".account-dropdown");
const notificationsIcon = document.querySelector(".notifications-icon");
const notificationsDropdown = document.querySelector(".notifications-dropdown");

// Functions
/**
 *
 * @param {String} toggleId
 * @param {String} sidebarId
 * @param {String} mainId
 */
function showSidebar(toggleId, sidebarId, mainId) {
  const toggle = document.getElementById(toggleId);
  const sidebar = document.getElementById(sidebarId);
  const main = document.getElementById(mainId);

  if (toggle && sidebar && main) {
    toggle.addEventListener("click", () => {
      // Show sidebar
      sidebar.classList.toggle("show-sidebar");
      // Add padding main
      main.classList.toggle("main-pd");
    });
  }
}

// Link Active
function linkColor() {
  sidebarLink.forEach((l) => l.classList.remove("active-link"));
  this.classList.add("active-link");
}

// Main Code
// Show sidebar
showSidebar("header-toggle", "sidebar", "main");

// Show active link
sidebarLink.forEach((l) => l.addEventListener("click", linkColor));

// Show active link
logo.addEventListener("click", () => {
  sidebarLink.forEach((l) => l.classList.remove("active-link"));
  home_btn.classList.add("active-link");
});

// Close account dropdown menu when click on other area
document.addEventListener("click", (event) => {
  if (!accountIcon.contains(event.target) && !accountIcon.contains(event.target)) {
    accountDropdown.close();
  }
});

// Toggle account dropdown menu
accountIcon.addEventListener("click", () => {
  if (accountDropdown.open) {
    accountDropdown.close();
  } else {
    accountDropdown.show();
  }
});

// Close notifications dropdown menu when click on other area
document.addEventListener("click", (event) => {
  if (!notificationsIcon.contains(event.target) && !notificationsIcon.contains(event.target)) {
    notificationsDropdown.close();
  }
});

// Toggle notifications dropdown menu
notificationsIcon.addEventListener("click", () => {
  if (notificationsDropdown.open) {
    notificationsDropdown.close();
  } else {
    notificationsDropdown.show();
  }
});
