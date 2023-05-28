const slider = document.querySelector('.slider');
const loaderDiv = document.querySelector(".loader");

const apiBase = "https://bringthebugsback.murots.no/";
const postsBase = "wp-json/wp/v2/posts";
const fiveLatestPostsBase = "?per_page=5&order=desc";

const fullLatestPostsURL = apiBase + postsBase + fiveLatestPostsBase;

async function getLatestPosts() {
    try {
        const response = await fetch(fullLatestPostsURL);
        const latestPosts = await response.json();
        return latestPosts;
    } catch (error) {
        console.error(error);
        loaderDiv.remove();
        slider.innerHTML = errorMessage("Could not fetch data. Please try again later.");
    }
}

async function createSliderHTML(latestPost) {
    try {
        const featuredImageId = latestPost.featured_media;
        const featuredImageURL = apiBase + "wp-json/wp/v2/media/" + featuredImageId;
        const response = await fetch(featuredImageURL);
        const featuredImage = await response.json();

        const slideImage = featuredImage.source_url;

        const slide = document.createElement("div");
        slide.classList.add("slide-image");
        slide.classList.add("featuredImage-" + featuredImageId); 
        slide.style.backgroundImage = `url(${slideImage})`;
        slide.setAttribute("alt", featuredImage.alt_text);
        slider.append(slide);   

        const slideTextContent = document.createElement("div");
        slideTextContent.className = "slide-textContent";
        slide.append(slideTextContent);

        const slideTextLatest = document.createElement("h4");
        slideTextLatest.className = "slide-textLatest";
        slideTextLatest.innerText = "Latest posts:";
        slideTextContent.append(slideTextLatest);

        const slideTitle = document.createElement("h5");
        slideTitle.className = "slide-title";
        slideTitle.innerText = latestPost.title.rendered;
        slideTextContent.append(slideTitle);

        const sliderButtonPrev = document.querySelector('.slider-button-prev');
        const sliderButtonNext = document.querySelector('.slider-button-next');
        const sliderDots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        sliderButtonPrev.disabled = true;
        let ongoingAnimation = false;

        const blogId = latestPost.id;

        const readNowButton = document.createElement("a");
        readNowButton.className = "readNow-button";
        readNowButton.href = "blogDetails.html?id=" + blogId;
        readNowButton.innerText = "Read now"
        slideTextContent.append(readNowButton);

        sliderButtonPrev.addEventListener('click', function() {
            if (ongoingAnimation) {
                return;
            }

            ongoingAnimation = true;

            slider.scrollBy({
                left: -slider.offsetWidth,
                behavior: 'smooth'
            });

            sliderDots[currentSlide].classList.remove('active');
            currentSlide -= 1;

            if (currentSlide < 0) {
                currentSlide = sliderDots.length - 1;
            }

            sliderDots[currentSlide].classList.add('active');

            if (currentSlide === 0) {
                sliderButtonPrev.disabled = true;
            } else {
                sliderButtonPrev.disabled = false;
            }

            if (sliderButtonNext.disabled) {
                sliderButtonNext.disabled = false;
            }

            setTimeout(function() {
                ongoingAnimation = false;
            }, 500);
        });

        sliderButtonNext.addEventListener('click', function() {
            if (ongoingAnimation) {
                return;
            }

            ongoingAnimation = true;

            slider.scrollBy({
                left: slider.offsetWidth,
                behavior: 'smooth'
            });

            sliderDots[currentSlide].classList.remove('active');
            currentSlide += 1;

            if (currentSlide >= sliderDots.length) {
                currentSlide = 0;
            }

            sliderDots[currentSlide].classList.add('active');

            if (currentSlide === sliderDots.length - 1) {
                sliderButtonNext.disabled = true;
            } else {
                sliderButtonNext.disabled = false;
            }

            if (sliderButtonPrev.disabled) {
                sliderButtonPrev.disabled = false;
            }

            setTimeout(function() {
                ongoingAnimation = false;
            }, 500);
        });
    } catch (error) {
        console.error(error);
        loaderDiv.remove();
        slider.innerHTML = errorMessage("Could not fetch data. Please try again later.");
    }
}

function createLatestPostsHTML(latestPosts) {
    for (let i = 0; i < latestPosts.length; i++) {
        const latestPost = latestPosts[i];
        createSliderHTML(latestPost);
    }
}

async function main() {
    try {
        const latestPosts = await getLatestPosts();
        createLatestPostsHTML(latestPosts);
        loaderDiv.remove();
    } catch (error) {
        console.error(error);
        loaderDiv.remove();
        loader.innerHTML = errorMessage("Could not fetch data. Please try again later.");
    }
}

main();