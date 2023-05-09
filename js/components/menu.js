const hamburgerMenu = document.querySelector(".hamburger-menu");
const sliderContainer = document.querySelector(".slider-container");
let menuContainer = null;

hamburgerMenu.addEventListener('click', function() {
    if (!menuContainer) {
        menuContainer = document.createElement("div");
        menuContainer.className = "menu-container";
        sliderContainer.append(menuContainer);

        const navBlogs = document.createElement("a");
        navBlogs.classList = "menu-links menu-linksBlogs";
        navBlogs.href = "../../blogs.html";
        navBlogs.innerText = "BLOGS";
        menuContainer.append(navBlogs);

        const navAbout = document.createElement("a");
        navAbout.className = "menu-links";
        navAbout.href = "../../about.html";
        navAbout.innerText = "ABOUT";
        menuContainer.append(navAbout);
    } else {
        menuContainer.remove();
        menuContainer = null;
    }
    console.log(menuContainer);
    
});


// if (menuContainer) {
//     window.addEventListener('click', function() {
//         menuContainer.remove();
//         menuContainer = null;
// });
// }


// window.addEventListener('click', function(event) {
//   if (menuContainer && !event.target.closest('.menu-container') && !event.target.closest('.hamburger-menu')) {
//     menuContainer.remove();
//     menuContainer = null;
//   }
// });

window.addEventListener('click', function(event) {
    if (menuContainer && event.target.closest('.slider-container') && !event.target.closest('.hamburger-menu')) {
      menuContainer.remove();
      menuContainer = null;
    }
  });
  