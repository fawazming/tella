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
        const urlRegex = /<a[^>]*href="([^">]+)"/;

        const match = post.content.match(imgRegex);
        const umatch = post.content.match(urlRegex);
        let firstImageUrl = '';
        let firstUrl = umatch?umatch[1]:'';
        if (match) {
            firstImageUrl = match[1];
        }
        const listItem = document.createElement('div');
        listItem.classList.add('col-lg-6', 'col-md-12', 'col-12', 'picture-item')
        listItem.setAttribute('data-bs-target', 'p'+post.id);
        listItem.setAttribute('data-bs-title', post.title);
        listItem.setAttribute('data-bs-image', firstImageUrl);
        listItem.setAttribute('data-bs-description', post.content);
        listItem.innerHTML = `
                    <div class="work-continer position-relative d-block overflow-hidden rounded">
                        <div class="card-body p-0 text-justify">
                            <h5 class="mb-3" style="margin-left:5px"><a class="content-title" target="_blank" href="${firstUrl}">${post.title}</a></h5>
                            ${post.content}
                            <!-- <img src="${firstImageUrl}" class="img-fluid" alt="work-image"> 
                            
                            <div class="">
                                <h5 class="mb-3" style="margin-left:5px"><a class="content-title" target="_blank" href="${firstUrl}">${post.title}</a></h5>
                            </div>-->
                        </div>
                    </div>`;
        postList.appendChild(listItem);
    });
}

// Function to display posts in a list
function displayBPosts(posts) {
    const postList = document.getElementById('blogwrap');
    posts.forEach(post => {
        const imgRegex = /<img[^>]*src="([^">]+)"/;
        const match = post.content.match(imgRegex);
        let firstImageUrl = match?match[1]:'';

        const listItem = document.createElement('div');
        listItem.classList.add('col-xxl-4', 'col-xl-4', 'col-lg-4', 'col-md-4')
        listItem.innerHTML = `
                    <a class="text-uppercase text-dark" href="blog/?postId=${post.id}">
                    <div class="blog-box">
                        <div class="blog-images">
                            <img src="${firstImageUrl?firstImageUrl:'images/blog/13.jpg'}" class="img-fluid rounded" alt="blog image">
                        </div>
                        <div class="blog-content">
                            <h6 class="blog-title mt-4">
                                <a href="blog/?postId=${post.id}">${post.title}</a>
                            </h6>
                            <div class="read-link mt-4">
                                <a class="text-uppercase text-dark" href="blog/?postId=${post.id}">Read More</a>
                            </div>
                        </div>
                    </div></a>`;
        postList.appendChild(listItem);
    });
}


// Main function to handle the logic
async function main() {
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
        const posts = await fetchPosts(portfolioId);
        console.log(posts)
        displayPPosts(posts);
    }

    if (singleBlogId) {
        const post = await fetchPost(BlogId, singleBlogId);
        displayPost(post);
    } else {
        const posts = await fetchPosts(BlogId);
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