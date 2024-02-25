if (
    !(
      (screen.width === 1024 && screen.height === 1366) ||
      (screen.width === 1366 && screen.height === 1024) ||
      screen.width <= 991
    )
  ) {
    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-wrapper.home-prtfl-wrap",
        start: "top 15%",
        end: "105% bottom",
        scrub: true,
      },
    });
    scrollTl.to(".prtfl-sticky-wrap", { x: "-100%", duration: 0.8 });
    console.log("portfolio run on desktop");
  
    //PORTFOLIO SECTION HEIGHT + AUTO ROTATE TABS
    // AUTO detect height of the portfolio section
    // Optional - Set sticky section heights based on inner content width
    // Makes scroll timing feel more natural
    function setTrackHeights() {
      $(".container.prtfl-height").each(function (index) {
        let trackWidth = $(this).find(".prtfl-sticky-list").outerWidth();
        let desiredHeight = trackWidth - $(window).width();
        $(this).height(desiredHeight);
      });
    }
    setTrackHeights();
    window.addEventListener("resize", function () {
      setTrackHeights();
    });
  
    //AUTO CHANGE TABS
    var Webflow = Webflow || [];
    Webflow.push(function () {
      // DOMready has fired
      // May now use jQuery and Webflow API
  
      // Start everything
      var tabTimeout;
      clearTimeout(tabTimeout);
      var tabLoopInterval;
  
      // Define loop - cycle through all tabs
      function tabLoop() {
        tabLoopInterval = setInterval(function () {
          var $next = $(".offer-tabs_menu").children(".w--current:first").next();
  
          if ($next.length) {
            $next.click(); // Click resets timeout, so no need for interval
          } else {
            $(".offer-tab-link:first").click();
          }
        }, 6000); // 6-second tab loop
      }
  
      // Start tab rotation on site load, only if tabs are in view
      var tabObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          tabLoop();
        } else {
          clearInterval(tabLoopInterval);
        }
      });
  
      // Observe the tabs container for visibility changes
      var tabsContainer = document.querySelector(".offer-tabs_menu");
      tabObserver.observe(tabsContainer);
  
      // Reset timeout if a tab is clicked
      $(".offer-tab-link").click(function () {
        clearTimeout(tabTimeout);
        clearInterval(tabLoopInterval);
        tabLoop();
      });
    });
  
    // Get all the tab links
    const tabLinks = document.querySelectorAll(
      ".offer-tab-link.w-inline-block.w-tab-link",
    );
  
    // Function to check if an element is in view
    const isInView = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    };
  
    // Function to handle the animation
    const handleAnimation = (tabLink) => {
      // Get the child element (offer-tab-load)
      const tabLoad = tabLink.querySelector(".offer-tab-load");
  
      // Set the transition duration and width based on the conditions
      if (tabLink.classList.contains("w--current") && isInView(tabLink)) {
        tabLoad.style.transitionDuration = "6s";
        tabLoad.style.width = "100%";
      } else {
        tabLoad.style.transitionDuration = ".3s";
        tabLoad.style.width = "0%";
      }
    };
  
    // Function to handle scroll event
    const handleScroll = () => {
      tabLinks.forEach((tabLink) => {
        handleAnimation(tabLink);
      });
    };
  
    // Iterate over each tab link
    tabLinks.forEach((tabLink) => {
      // Call the handleAnimation function initially to set the initial state
      handleAnimation(tabLink);
  
      // Create a MutationObserver to track changes in the classList
      const observer = new MutationObserver(() => {
        handleAnimation(tabLink);
      });
  
      // Start observing changes in the classList
      observer.observe(tabLink, { attributes: true });
  
      // Create an IntersectionObserver to track changes in the element's visibility
      const intersectionObserver = new IntersectionObserver(() => {
        handleAnimation(tabLink);
      });
  
      // Start observing changes in the element's visibility
      intersectionObserver.observe(tabLink);
    });
  
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);
    //END OF AUTOCHANGE TABS
    console.log("auto change tabs on desktop run");
  }