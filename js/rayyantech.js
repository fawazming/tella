// Obfuscate your API key
const API_KEY = 'AIzaSyBzYC473sbzrK4QQG3zcRp_kPl_moqvEdo'; // Replace with your actual API key

// Function to fetch all posts
async function fetchPosts(blogId) {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${API_KEY}`);
    const data = await response.json();
    return data.items;
}

// Function to display posts in a list
function displayPosts(posts) {
    const postList = document.getElementById('galwrap');
    posts.forEach(post => {
        const listItem = document.createElement('div');
        let newHTML = `<div class="col-lg-4 col-md-6 col-12 picture-item" data-groups='["branding"]'>
                    <div class="work-container position-relative d-block overflow-hidden rounded">
                        <div class="card-body p-0">
                            <img src="images/portfolio/01.jpg" class="img-fluid" alt="work-image">
                            <div class="overlay-work bg-dark"></div>
                            <div class="content">
                                <h5 class="mb-3"><a class='content-title' href='/queue/layout/page-portfolio-detail'>Mockup Collection</a></h5>
                                <h6 class="text-light tag mb-0">Mockup</h6>
                            </div>
                        </div>
                    </div>
                </div>`;
        listItem.innerHTML = `<a href="?postId=${post.id}">${post.title}</a>`;
        listItem.innerHTML = ` <div class="col-lg-4 col-md-6 col-12 picture-item" data-groups='["branding"]'>
                    <div class="work-container position-relative d-block overflow-hidden rounded">
                        <div class="card-body p-0">
                            <img src="images/portfolio/01.jpg" class="img-fluid" alt="work-image">
                            <div class="overlay-work bg-dark"></div>
                            <div class="content">
                                <h5 class="mb-3"><a class="content-title" href="?postId=${post.id}">${post.title}</a></h5>
                                <h6 class="text-light tag mb-0">Mockup</h6>
                            </div>
                        </div>
                    </div>
                </div>`;
        postList.appendChild(listItem);
    });
}

// Function to fetch a single post
async function fetchPost(blogId, postId) {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}?key=${API_KEY}`);
    const post = await response.json();
    return post;
}

// Function to display a single post
function displayPost(post) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = `
        <h1>${post.title}</h1>
        <div>${post.content}</div>
    `;
}

// Main function to handle the logic
async function main() {
    console.log("MAin fun called")
    const blogId = '3754457232408122297';
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    if (postId) {
        const post = await fetchPost(blogId, postId);
        displayPost(post);
    } else {
        console.log("MAin fun posts called")
        const posts = await fetchPosts(blogId);
        console.log(posts)
        displayPosts(posts);
    }
}

// Call the main function on page load
window.onload = main;