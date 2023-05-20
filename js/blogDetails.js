const contentContainer = document.querySelector(".content-container");

const apiBase = "https://bringthebugsback.murots.no/";
const postsBase = "wp-json/wp/v2/posts/";

const fullPostListURL = apiBase + postsBase;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const blogId = params.get("id");

const specificPostURL = fullPostListURL + blogId;

async function getPostDetails() {
    const response =  await fetch(specificPostURL);
    const postDetails = await response.json();
    console.dir(postDetails);
    return postDetails;  
}

async function createPostDetailsHTML(postDetails) {
    const featuredImageId = postDetails.featured_media;
    const featuredImageURL = apiBase + "wp-json/wp/v2/media/" + featuredImageId;
    const response = await fetch(featuredImageURL);
    const featuredImage = await response.json();

    const detailsHeading = document.querySelector("#dynamic-detailsHeading");
    detailsHeading.innerText = postDetails.title.rendered.charAt(0).toUpperCase() + postDetails.title.rendered.slice(1).toLowerCase();
    
    const postFeaturedImage = featuredImage.source_url;
    const featuredContainer = document.querySelector(".featured-container");

    const bannerImage = document.createElement("div");
    bannerImage.className = "slide-image";
    bannerImage.style.backgroundImage = `url(${postFeaturedImage})`;
    bannerImage.setAttribute("alt", featuredImage.alt_text);
    featuredContainer.append(bannerImage);

    const blogTitle = document.createElement("h1");
    blogTitle.className = "blogDetails-title";
    blogTitle.innerText = postDetails.title.rendered;
    contentContainer.append(blogTitle);

    const blogContent = document.createElement("div");
    blogContent.className = "blog-content";
    blogContent.innerHTML = postDetails.content.rendered;
    console.log(postDetails.content.rendered);
    contentContainer.append(blogContent);

    const overlay = document.createElement("div");
    overlay.className = "fullscreen-overlay";
    contentContainer.append(overlay);

    const images = blogContent.querySelectorAll("img");
    const videos = blogContent.querySelectorAll("video");
  
    images.forEach(function(image) {
        image.addEventListener("click", function() {
            image.classList.toggle("fullscreen");
            document.body.classList.toggle("fullscreen-active");
            if (image.classList.contains("fullscreen")) {
                overlay.style.display = "block";
            } else {
                overlay.style.display = "none";
            }
        });
    });

    videos.forEach(function(video) {
        video.addEventListener("click", function() {
            video.classList.toggle("fullscreen");
            document.body.classList.toggle("fullscreen-active");
            if (video.classList.contains("fullscreen")) {
                overlay.style.display = "block";
            } else {
                overlay.style.display = "none";
            }
        });
    });
    
}

async function main() {
    const postDetails = await getPostDetails();
    const title = document.querySelector("title");
    title.innerText = "Bring the bugs back | " + postDetails.title.rendered;
    createPostDetailsHTML(postDetails);
    // const loaderDiv = document.querySelector(".loader");
    // loaderDiv.remove();
}

main();