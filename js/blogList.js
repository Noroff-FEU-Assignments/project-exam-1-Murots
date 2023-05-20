const blogListContainer = document.querySelector(".blogList-container");

const apiBase = "https://bringthebugsback.murots.no/";
const postsBase = "wp-json/wp/v2/posts";
const tenLatestPostsBase = "?per_page=10&order=desc";

const fullLatestPostsURL = apiBase + postsBase + tenLatestPostsBase;

async function getLatestPosts() {
    const response = await fetch(fullLatestPostsURL);
    const latestPosts = await response.json();
    console.log(latestPosts);
    return latestPosts;
}

async function createPostListHTML(latestPost) {

    const featuredImageId = latestPost.featured_media;
    const featuredImageURL = apiBase + "wp-json/wp/v2/media/" + featuredImageId;
    const response = await fetch(featuredImageURL);
    const featuredImage = await response.json();

    const blogId = latestPost.id;
    const blogListImage = featuredImage.source_url;

    const blogContainer = document.createElement("a");
    blogContainer.className = "blog-container";
    blogContainer.style.backgroundImage = `url(${blogListImage})`;
    blogContainer.setAttribute("alt", featuredImage.alt_text);
    blogContainer.href = "blogDetails.html?id=" + blogId;
    blogListContainer.append(blogContainer);

    const TextContent = document.createElement("div");
    TextContent.className = "blogContainer-textContent";
    blogContainer.append(TextContent);

    const blogTitle = document.createElement("h1");
    blogTitle.className = "blogContainer-title";
    blogTitle.innerText = latestPost.title.rendered;
    TextContent.append(blogTitle);

    const readMore = document.createElement("h4");
    readMore.className = "blogContainer-readMore";
    readMore.innerText = "Read more...";
    TextContent.append(readMore);
}

function createLatestPostsHTML(latestPosts) {
    for (let i = 0; i < latestPosts.length; i++) {
        const latestPost = latestPosts[i];
        console.log(latestPost);
        createPostListHTML(latestPost);
    }
}
  
async function main() {
    const latestPosts = await getLatestPosts();
    createLatestPostsHTML(latestPosts);
    const loaderDiv = document.querySelector(".loader");
    loaderDiv.remove();
}
  
main();