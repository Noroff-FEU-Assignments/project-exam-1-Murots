const hamburgerMenu = document.querySelector(".hamburger-menu");
const sliderContainer = document.querySelector(".slider-container");
const noHeaderContainer = document.querySelector(".noBanner-header");
const featuredContainer = document.querySelector(".featured-container");
let menuContainer = null;

hamburgerMenu.addEventListener("click", function() {
    if (!menuContainer) {
        menuContainer = document.createElement("div");
        // sliderContainer.append(menuContainer);

        const navLink1 = document.createElement("a");
        navLink1.href = "../../index.html";
        navLink1.innerText = "HOME";
        menuContainer.append(navLink1);

        const navLink2 = document.createElement("a");
        navLink2.href = "../../blogList.html";
        navLink2.innerText = "BLOG";
        menuContainer.append(navLink2);

        const navLink3 = document.createElement("a");
        navLink3.href = "../../about.html";
        navLink3.innerText = "ABOUT";
        menuContainer.append(navLink3);

        if (sliderContainer) {
            sliderContainer.append(menuContainer);
            menuContainer.className = "menu-container";
            navLink1.style.display = "none";
            navLink2.classList = "menu-links menu-linksMargin";
            navLink3.className = "menu-links";
        } else if (featuredContainer) {
            featuredContainer.append(menuContainer);
            menuContainer.className = "menu-container";
            navLink1.classList = "menu-links menu-linksMargin";
            navLink2.className = "menu-links";
            navLink3.className = "menu-links";
        } else {
            noHeaderContainer.append(menuContainer);
            menuContainer.className = "menu-container2";
            navLink1.classList = "menu-links2 menu-linksMargin";
            navLink2.style.display = "none";
            navLink3.className = "menu-links2";
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
