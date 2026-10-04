(function () {
  "use strict";

  var mobile = window.matchMedia("(max-width: 76.234375em)");
  var rootSelector = ".md-nav--primary > .md-nav__list > .md-nav__item--nested > .md-nav__toggle";

  function resetToRoot() {
    if (!mobile.matches) {
      return;
    }

    var toggles = document.querySelectorAll(rootSelector);
    Array.prototype.forEach.call(toggles, function (toggle) {
      toggle.checked = false;
    });
  }

  function bindDrawer() {
    var drawer = document.getElementById("__drawer");
    if (!drawer || drawer.dataset.mobileRootBound === "true") {
      return;
    }

    drawer.dataset.mobileRootBound = "true";
    drawer.addEventListener("change", function () {
      if (drawer.checked) {
        resetToRoot();
      }
    });

    if (drawer.checked) {
      resetToRoot();
    }
  }

  function setup() {
    bindDrawer();
    resetToRoot();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(setup);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup, { once: true });
  } else {
    setup();
  }

  if (typeof mobile.addEventListener === "function") {
    mobile.addEventListener("change", function (event) {
      if (event.matches) {
        setup();
      }
    });
  } else if (typeof mobile.addListener === "function") {
    mobile.addListener(function (event) {
      if (event.matches) {
        setup();
      }
    });
  }
}());