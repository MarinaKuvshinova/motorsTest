//mobile drop-down
let mobileHeaderDrop = () => {
  const header = document.querySelector(".header");

  function navigationMenu() {
    const mobileOpenClose = header.querySelector(".nav-open-close");
    const headerDrop = header.querySelectorAll(".header-drop-menu");

    mobileOpenClose.addEventListener("click", function (e) {
      e.preventDefault();
      header.classList.remove("active-header-search");
      header.classList.toggle("active-header");
    });

    headerDrop.forEach(function (el) {
      el.closest("li").classList.add("has-child");
    });
  }

  function searchFunction() {
    const search = header.querySelector(".search-button");
    search.addEventListener("click", function (e) {
      e.preventDefault();
      header.classList.remove("active-header");
      header.classList.toggle("active-header-search");
    });
  }

  searchFunction();
  navigationMenu();
};

mobileHeaderDrop();
