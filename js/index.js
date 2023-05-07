const slider = document.querySelector('.slider');

const apiBase = "https://bringthebugsback.murots.no/";
const postsBase = "wp-json/wp/v2/posts";
const fiveLatestPostsBase = "?per_page=5&order=desc";

const fullLatestPostsURL = apiBase + postsBase + fiveLatestPostsBase;

async function getLatestPosts() {
    const response = await fetch(fullLatestPostsURL);
    const latestPosts = await response.json();
    console.log(latestPosts);
    return latestPosts;
}

async function createSliderHTML(latestPost) {
    const featuredImageId = latestPost.featured_media;
    const featuredImageURL = apiBase + "wp-json/wp/v2/media/" + featuredImageId;
    const response = await fetch(featuredImageURL);
    const featuredImage = await response.json();

    const slideImage = featuredImage.source_url;
    console.log(featuredImage.source_url);

    const slide = document.createElement("div");
    slide.className = "slide-image";
    slide.style.backgroundImage = `url(${slideImage})`;
    slider.append(slide);

    const sliderButtonPrev = document.querySelector('.slider-button-prev');
    const sliderButtonNext = document.querySelector('.slider-button-next');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    sliderButtonPrev.disabled = true;
    let ongoingAnimation = false;

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
}

function createLatestPostsHTML(latestPosts) {
  for (let i = 0; i < latestPosts.length; i++) {
    const latestPost = latestPosts[i];
    console.log(latestPost);
    createSliderHTML(latestPost);
  }
}

async function main() {
  const latestPosts = await getLatestPosts();
  createLatestPostsHTML(latestPosts);
}

main();