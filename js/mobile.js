// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../sw.js")
    .then((registration) => {
      console.log("SW Registered!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Failed!");
      console.log(error);
    });
}

// Declarations
const doc = document;
const menuOpen = doc.querySelector(".menu");
const menuClose = doc.querySelector(".close");
const overlay = doc.querySelector(".overlay");

// Main Code
// When press on hamburger
menuOpen.addEventListener("click", () => {
  overlay.classList.add("overlay--active");
});

// When press on cross
menuClose.addEventListener("click", () => {
  overlay.classList.remove("overlay--active");
});
