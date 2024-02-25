// WEB BURGER MENU LINKS EXPLANATION
// Step 1: Define a variable to track clicks on .nav-menu-button
let menuButtonClickCount = 0;

// Step 2: Define a function to calculate the position of .case-descr and assign it to .nav-link-info
function assignPosition() {
  setTimeout(() => {
    const caseDescr = document.querySelector(".case-descr");
    const caseDescrRect = caseDescr.getBoundingClientRect();
    const caseDescrLeft = caseDescrRect.left + window.scrollX;
    const caseDescrTop = caseDescrRect.top + window.scrollY;

    // Calculate top position relative to the viewport
    const relativeTop = caseDescrTop - window.scrollY;

    console.log("Top position (case-descr):", relativeTop, "px");
    console.log("Left position (case-descr):", caseDescrLeft, "px");

    const navLinkInfos = document.querySelectorAll(".nav-link-info");
    navLinkInfos.forEach((navLinkInfo) => {
      navLinkInfo.style.position = "absolute";
      navLinkInfo.style.left = caseDescrLeft + "px";
      navLinkInfo.style.top = relativeTop + "px";
      navLinkInfo.style.display = "none"; // Set display to none initially
    });

    const containerInNav = document.querySelector(".container.in-nav");
    if (menuButtonClickCount % 2 === 1) {
      containerInNav.style.pointerEvents = "auto";

      // Set display back to block after repositioning
      navLinkInfos.forEach((navLinkInfo) => {
        navLinkInfo.style.display = "block";
      });
    } else {
      containerInNav.style.pointerEvents = "none";
    }
  }, 100); // Delay of 1 second (1000 milliseconds)
}

// Step 3: Get all elements with the class .nav-menu-button
const navMenuButtons = document.querySelectorAll(".nav-menu-button");

// Step 4: Attach click event listener to each .nav-menu-button
navMenuButtons.forEach((navMenuButton) => {
  navMenuButton.addEventListener("click", () => {
    // Increment the click count
    menuButtonClickCount++;
    assignPosition();
  });
});

function updateWindowDimensions() {
  if (
    (screen.width === 1024 && screen.height === 1366) ||
    (screen.width === 1366 && screen.height === 1024)
  ) {
    // Update CSS statements
    document.querySelector(".prtfl-sticky").style.overflow = "auto";
    document.querySelector(".prtfl-sticky-abs").style.position = "relative";
    document.querySelector(".container.prtfl-height").style.paddingBottom =
      "12rem";
    document.querySelector(".container.prtfl-height").style.overflow = "auto";
    document.querySelector(
      ".main-wrapper.home-prtfl-wrap",
    ).style.paddingBottom = "0";
    document.querySelector(".prtfl-sticky-wrap").style.paddingTop = "0";
    document.querySelector(".prtfl-sticky-wrap").style.height = "auto";
    document.querySelector(".prtfl-sticky-list").style.paddingRight = "0";
    document.querySelector(".prtfl-sticky-list").style.paddingLeft = "3rem";
    document.querySelector(".prtfl-sticky-list").style.alignItems =
      "flex-start";
    document.querySelector(".prtfl-sticky-list").style.marginRight = "0";
    document.querySelector(".two-third-bl.hero-slides").style.display = "none";
    document.querySelector(".container.hero-sec").style.minHeight = "auto";
    document.querySelector("h1.hero-text_h").style.fontSize = "4rem";
    console.log("values updated");
  }
}

updateWindowDimensions(); // Check and update dimensions on page load

// Add an event listener to check and update dimensions on window resize
window.addEventListener("resize", updateWindowDimensions);

//TABS COLOR UNDERLINE
var partnerTabsMenu = document.querySelector(".partner-tabs-menu");
var parrentTabsBefore = document.querySelector(".parrent-tabs-before");
var parrentTabsAfter = document.querySelector(".parrent-tabs-after");
var initialScrollPosition = partnerTabsMenu.scrollLeft;
var totalScrollWidth;
var parrentTabsAfterOpacity = 1;

parrentTabsBefore.style.opacity = "0";
parrentTabsAfter.style.opacity = "1";

window.addEventListener("load", function () {
  setTimeout(function () {
    totalScrollWidth =
      partnerTabsMenu.scrollWidth - partnerTabsMenu.clientWidth;

    partnerTabsMenu.addEventListener("scroll", function () {
      var scrolledDistance =
        (partnerTabsMenu.scrollLeft / totalScrollWidth) * 100;

      if (scrolledDistance > 15) {
        parrentTabsBefore.style.opacity = "1";
      } else {
        parrentTabsBefore.style.opacity = "0";
      }

      if (scrolledDistance > 85) {
        parrentTabsAfter.style.opacity = "0";
      } else {
        parrentTabsAfter.style.opacity = "1";
      }

      console.log("Scrolled distance (percentage):", scrolledDistance);
    });

    const tabLinks = document.querySelectorAll(".partner-tab-link");
    let currentTabLink = document.querySelector(".partner-tab-link.w--current");

    tabLinks.forEach((tab) => {
      const underline = tab.querySelector(".partners-underline");
      const image = tab.querySelector(".partner-tab-image.is-active");

      if (tab === currentTabLink) {
        underline.style.opacity = "100%";
        image.style.opacity = "100%";
      } else {
        underline.style.opacity = "0%";
        image.style.opacity = "0%";
      }

      tab.addEventListener("click", function () {
        const prevUnderline = currentTabLink.querySelector(
          ".partners-underline",
        );
        const prevImage = currentTabLink.querySelector(
          ".partner-tab-image.is-active",
        );
        prevUnderline.style.opacity = "0%";
        prevImage.style.opacity = "0%";

        currentTabLink = this;

        underline.style.opacity = "100%";
        image.style.opacity = "100%";
      });
    });

    console.log("tabs color code");
  }, 1000);
});