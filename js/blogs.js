const blogListContainer = document.querySelector(".blogList-container");
// const blogContainer = document.querySelector(".blog-container");

const apiBase = "https://bringthebugsback.murots.no/";
const blogsBase = "wp-json/wp/v2/posts";
const tenLatestBlogsBase = "?per_page=10&order=desc";

const fullLatestBlogsURL = apiBase + blogsBase + tenLatestBlogsBase;

async function getLatestBlogs() {
    const response = await fetch(fullLatestBlogsURL);
    const latestBlogs = await response.json();
    console.log(latestBlogs);
    return latestBlogs;
}

async function createBlogListHTML(latestBlog) {

    // const blogContainer = document.createElement("div");
    // blogContainer.className = "blog-container";
    // blogListContainer.append(blogContainer);

    
    const featuredImageId = latestBlog.featured_media;
    const featuredImageURL = apiBase + "wp-json/wp/v2/media/" + featuredImageId;
    const response = await fetch(featuredImageURL);
    const featuredImage = await response.json();

    const blogListImage = featuredImage.source_url;

    const blogContainer = document.createElement("div");
    blogContainer.className = "blog-container";
    blogContainer.style.backgroundImage = `url(${blogListImage})`;
    blogContainer.setAttribute("alt", featuredImage.alt_text);
    blogListContainer.append(blogContainer);

    // const slideTextContent = document.createElement("div");
    // slideTextContent.className = "slide-textContent";
    // slide.append(slideTextContent);

    // const slideTextLatest = document.createElement("h4");
    // slideTextLatest.className = "slide-textLatest";
    // slideTextLatest.innerText = "Latest posts:";
    // slideTextContent.append(slideTextLatest);

    // const slideTitle = document.createElement("h1");
    // slideTitle.className = "slide-title";
    // slideTitle.innerText = latestPost.title.rendered;
    // slideTextContent.append(slideTitle);

}

function createLatestBlogsHTML(latestBlogs) {
    for (let i = 0; i < latestBlogs.length; i++) {
        const latestBlog = latestBlogs[i];
        console.log(latestBlog);
        createBlogListHTML(latestBlog);
    }
}
  
async function main() {
    const latestBlogs = await getLatestBlogs();
    createLatestBlogsHTML(latestBlogs);
}
  
main();