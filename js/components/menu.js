const hamburgerMenu = document.querySelector(".hamburger-menu");
const sliderContainer = document.querySelector(".slider-container");
const headerContainer = document.querySelector("header");
let menuContainer = null;

hamburgerMenu.addEventListener("click", function() {
    if (!menuContainer) {
        menuContainer = document.createElement("div");
        // sliderContainer.append(menuContainer);

        const navLink1 = document.createElement("a");
        menuContainer.append(navLink1);

        const navLink2 = document.createElement("a");
        navLink2.href = "../../about.html";
        navLink2.innerText = "ABOUT";
        menuContainer.append(navLink2);

        if (sliderContainer) {
            sliderContainer.append(menuContainer);
            menuContainer.className = "menu-container";
            navLink1.classList = "menu-links menu-linksMargin";
            navLink1.href = "../../blogList.html";
            navLink1.innerText = "BLOGS";
            navLink2.className = "menu-links";
        } else {
            headerContainer.append(menuContainer);
            menuContainer.className = "menu-container2";
            navLink1.classList = "menu-links2 menu-linksMargin";
            navLink1.href = "../../index.html";
            navLink1.innerText = "HOME";
            navLink2.className = "menu-links2";
        }
    } else {
        menuContainer.remove();
        menuContainer = null;
    }
    console.log(menuContainer);
    
});

window.addEventListener("click", function(event) {
    if (menuContainer && !event.target.closest(".menu-container") && !event.target.closest(".hamburger-menu")) {
        menuContainer.remove();
        menuContainer = null;
    }
});