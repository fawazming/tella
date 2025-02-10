// Obfuscate your API key
const API_KEY = 'AIzaSyBzYC473sbzrK4QQG3zcRp_kPl_moqvEdo';

// Function to fetch a single post
async function fetchPost(blogId, postId) {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}?key=${API_KEY}`);
    const post = await response.json();
    return post;
}

// Function to display a single post
function displayPost(post) {
    const postContainer = document.getElementById('content');
    const postTitle = document.getElementById('blogTitle');
    postContainer.innerHTML = `<div>${post.content}</div>`;
    postTitle.innerText = `${post.title}`;
}

// Main function to handle the logic
async function main() {
    const BlogId = '3642558814134041603';
    const urlParamsB = new URLSearchParams(window.location.search);
    const singleBlogId = urlParamsB.get('postId');

    if (singleBlogId) {
        const post = await fetchPost(BlogId, singleBlogId);
        displayPost(post);
    } else {
        const posts = await fetchPosts(BlogId);
        displayBPosts(posts);
    }
}



// Call the main function on page load
window.onload = main;
