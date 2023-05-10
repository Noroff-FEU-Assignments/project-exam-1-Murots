const featuredContainer = document.querySelector(".featured-container");
const contentContainer = document.querySelector(".content-container");

const apiBase = "https://bringthebugsback.murots.no/";
const postsBase = "wp-json/wp/v2/posts/";

const fullPostListURL = apiBase + postsBase;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const blogId = params.get("id");

const specificBlogURL = fullPostListURL + blogId;

async function getBlogDetails() {
    const response =  await fetch(specificBlogURL);
    const blogDetails = await response.json();
    console.dir(blogDetails);
    return blogDetails;  
}

getBlogDetails();