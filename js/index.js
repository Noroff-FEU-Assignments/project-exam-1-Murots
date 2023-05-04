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


async function createFeaturedListHTML(latestPost) {
    const featuredImageId = latestPost.featured_media;
    const featuredImageURL = apiBase + "wp-json/wp/v2/media/" + featuredImageId;
    const response = await fetch(featuredImageURL);
    const featuredImage = await response.json();
    // console.log(featuredImage);
    // return featuredImage;


// }

// async function mainFeature() {
//     const featuredImage = await createFeaturedListHTML();
//     createSliderHTML(featuredImage);
// }    

// function createSliderHTML(featuredImage) {
    const slideImage = featuredImage.source_url;
    console.log(featuredImage.source_url);

    const slide = document.createElement("div");
    slide.className = "slide-image";
    slide.style.backgroundImage = `url(${slideImage})`;
    slider.append(slide);


    const sliderDots = document.querySelectorAll('.slider-dot');
    for (let i = 0; i < sliderDots.length; i++) {
        const dot = sliderDots[i];
    
        dot.addEventListener('click', function() {

        slider.scroll({
            left: i * slider.offsetWidth,
            behavior: 'smooth'
        });

        for (let i = 0; i < sliderDots.length; i++) {
            const otherDot = sliderDots[i];
            otherDot.classList.remove('active');
        }

        dot.classList.add('active');
  
        });
    }
}
    
// }

function createLatestPostsHTML(latestPosts) {
    for (let i = 0; i < latestPosts.length; i++) {
        const latestPost = latestPosts[i];
        console.log(latestPost);
        createFeaturedListHTML(latestPost);
    }
}

async function main() {
    const latestPosts = await getLatestPosts();
    createLatestPostsHTML(latestPosts);
}

main();

