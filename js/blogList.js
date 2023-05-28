const blogListContainer = document.querySelector(".blogList-container");
const loadMoreButton = document.querySelector("#loadMore-button");

const apiBase = "https://bringthebugsback.murots.no/";
const postsBase = "wp-json/wp/v2/posts";
let postValue = 1;
let currentPage = `?page=${postValue}`;

const pageURL = apiBase + postsBase + currentPage;

async function getPosts() {
    try {
        const response = await fetch(pageURL);
        const posts = await response.json();
        console.log(posts);
        return posts;
    } catch (error) {
        console.error(error);
        blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
    }
}

async function createPostListHTML(post) {
    try {
        const featuredImageId = post.featured_media;
        const featuredImageURL = apiBase + "wp-json/wp/v2/media/" + featuredImageId;
        const response = await fetch(featuredImageURL);
        const featuredImage = await response.json();

        const blogId = post.id;
        const blogListImage = featuredImage.source_url;
        
        const blogContainer = document.createElement("a");
        blogContainer.classList.add("blog-container");
        blogContainer.classList.add("featuredImage-" + featuredImageId); 
        blogContainer.style.backgroundImage = `url(${blogListImage})`;
        blogContainer.setAttribute("alt", featuredImage.alt_text);
        blogContainer.href = "blogDetails.html?id=" + blogId;
        blogListContainer.append(blogContainer);

        const TextContent = document.createElement("div");
        TextContent.className = "blogContainer-textContent";
        blogContainer.append(TextContent);

        const blogTitle = document.createElement("h5");
        blogTitle.className = "blogContainer-title";
        blogTitle.innerText = post.title.rendered;
        TextContent.append(blogTitle);

        const readMore = document.createElement("h4");
        readMore.className = "blogContainer-readMore";
        readMore.innerText = "Read more...";
        TextContent.append(readMore);
    } catch (error) {
        console.error(error);
        blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
    }
}

function createPostsHTML(posts) {
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        console.log(post);
        createPostListHTML(post);
    }
}

async function loadMorePosts() {
    try {
        postValue++;
        currentPage = `?page=${postValue}`;
        const nextPageURL = apiBase + postsBase + currentPage;

        const response = await fetch(nextPageURL);
        const posts = await response.json();
        console.log(posts);
        createPostsHTML(posts);

        if (posts.length < 10) {
            loadMoreButton.disabled = true;
            loadMoreButton.style.backgroundColor = "#717c5b"; 
        }
    } catch (error) {
        console.error(error);
        blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
    }
}

loadMoreButton.addEventListener("click", loadMorePosts);


async function main() {
    try {
        const posts = await getPosts();
        createPostsHTML(posts);

        if (posts.length < 10) {
            loadMoreButton.disabled = true;
        }

        const loaderDiv = document.querySelector(".loader");
        loaderDiv.remove();
    } catch (error) {
        console.error(error);
        blogListContainer.innerHTML = errorMessage("Could not fetch data. Please try again later.");
    }
}

main();