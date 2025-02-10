// Obfuscate your API key
const API_KEY = 'AIzaSyBzYC473sbzrK4QQG3zcRp_kPl_moqvEdo';

// Function to fetch all posts
async function fetchPosts(blogId) {
    const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${API_KEY}`);
    const data = await response.json();
    return data.items;
}

// Function to display posts in a list
function displayPPosts(posts) {
    const postList = document.getElementById('galwrap');
    posts.forEach(post => {
        const imgRegex = /<img[^>]*src="([^">]+)"/;
        const match = post.content.match(imgRegex);
        let firstImageUrl = ''
        if (match) {
            firstImageUrl = match[1];
        }
        const listItem = document.createElement('div');
        listItem.classList.add('col-lg-4', 'col-md-6', 'col-12', 'picture-item')
        listItem.setAttribute('data-bs-target', 'p'+post.id);
        listItem.setAttribute('data-bs-title', post.title);
        listItem.setAttribute('data-bs-image', firstImageUrl);
        listItem.setAttribute('data-bs-description', post.content);
        listItem.innerHTML = `
                    <div class="work-container position-relative d-block overflow-hidden rounded">
                        <div class="card-body p-0">
                            <img src="${firstImageUrl}" class="img-fluid" alt="work-image">
                            
                            <div class="">
                                <h5 class="mb-3" style="margin-left:5px"><a class="content-title" href="?postId=${post.id}">${post.title}</a></h5>
                            </div>
                        </div>
                    </div>`;
        postList.appendChild(listItem);
    });
}

// Function to display posts in a list
function displayBPosts(posts) {
    const postList = document.getElementById('blogwrap');
    posts.forEach(post => {
        const listItem = document.createElement('div');
        listItem.classList.add('col-xxl-4', 'col-xl-4', 'col-lg-4', 'col-md-4')
        listItem.innerHTML = `
                    <div class="blog-box">
                        <div class="blog-images">
                            <img src="images/blog/blog-05.jpg" class="img-fluid rounded" alt="blog image">
                        </div>
                        <div class="blog-content">
                            <h6 class="blog-title mt-4">
                                <a href="#">${post.title}</a>
                            </h6>

                            <div class="read-link mt-4">
                                <a class="text-uppercase text-dark" href="?postId=${post.id}">Read More</a>
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
    const portfolioId = '3754457232408122297';
    const BlogId = '3642558814134041603';
    const urlParamsP = new URLSearchParams(window.location.search);
    const urlParamsB = new URLSearchParams(window.location.search);
    const singlePortfolioId = urlParamsP.get('singlePortfolioId');
    const singleBlogId = urlParamsB.get('singleBlogId');

    if (singlePortfolioId) {
        const post = await fetchPost(portfolioId, singlePortfolioId);
        displayPost(post);
    } else {
        console.log("MAin fun posts called")
        const posts = await fetchPosts(portfolioId);
        console.log(posts)
        displayPPosts(posts);
    }

    if (singleBlogId) {
        const post = await fetchPost(BlogId, singleBlogId);
        displayPost(post);
    } else {
        console.log("MAin fun blogs called")
        const posts = await fetchPosts(BlogId);
        console.log(posts)
        displayBPosts(posts);
    }

    
// Get all picture items
const pictureItems = document.querySelectorAll('.picture-item');

// Add event listener to each picture item
pictureItems.forEach((item) => {
    console.log(item);
    item.addEventListener('click', () => {
        // Get modal ID
        const modalId = item.getAttribute('data-bs-target');

        // Get modal title
        const modalTitle = item.getAttribute('data-bs-title');

        // Get modal image
        const modalImage = item.getAttribute('data-bs-image');

        // Get modal description
        const modalDescription = item.getAttribute('data-bs-description');

        // Get modal element
        const modal = document.querySelector('#portfolio-modal');

        // Set modal title
        modal.querySelector('.modal-title').textContent = modalTitle;

        // Set modal description
        modal.querySelector('.modal-body p').innerHTML = modalDescription;

        // Show modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    });
});
}



// Call the main function on page load
window.onload = main;