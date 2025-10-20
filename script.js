const accessKey = 'Your_key in here'; // 👈 FIX 1: You must put your actual Unsplash API Key here
const searchform = document.getElementById('search-box');
const searchinput = searchform.querySelector('input');
const resultdiv = document.getElementById('search-result'); 
const loadmorebtn = document.getElementById('load-more-btn');   
// Ensure initial state is hidden
loadmorebtn.style.display = 'none'; 

let keyword = '';
let page = 1;

async function fetchImages() {
    keyword = searchinput.value.trim();

    // Check if the keyword is empty before searching
    if (keyword === '') {
        resultdiv.innerHTML = '<h2>Please enter a search term.</h2>';
        loadmorebtn.style.display = 'none';
        return;
    }

   const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&page=${page}&client_id=${accessKey}&per_page=15`;
    // Add a loading state (Optional, but good practice)
    if (page === 1) {
        resultdiv.innerHTML = '<p>Loading...</p>';
    }

    const response = await fetch(url);
    
    if (!response.ok) {
        console.error('Failed to fetch images:', response.statusText);
        resultdiv.innerHTML = `<p>Error fetching results: ${response.statusText}</p>`;
        loadmorebtn.style.display = 'none';
        return;
    }
    
    const data = await response.json();
    
    // 👈 FIX 2: The correct property name from the API response is 'results', not 'results'
    const imageResults = data.results; 
    
    const totalPages = data.total_pages; // Get total pages for pagination logic

    if(page === 1) {
        resultdiv.innerHTML = '';
    }

    // 👈 FIX 3: You were iterating over an undefined variable 'results'
    imageResults.forEach((result) => { 
        // 1. Create the Image element
        const img = document.createElement('img');
        img.src = result.urls.small; // Accessing nested properties directly
        img.alt = result.alt_description || result.description || 'Search Result Image';
        
        // 2. Create the Anchor (Link) element
        const imagelink = document.createElement('a');
        imagelink.href = result.links.html; // Accessing nested properties directly
        imagelink.target = "_blank";
        
        // Add a class for CSS styling (Improvement)
        imagelink.classList.add('search-result-link');
        
        // 3. Assemble the elements
        imagelink.appendChild(img);
        
        // 4. Append the fully assembled link to the results container
        resultdiv.appendChild(imagelink); // 👈 Improvement: Append to resultdiv
    });

    // Pagination Logic & Button Display
    if (imageResults.length > 0) {
        // Show the load more button if there are more pages to load
        if (page < totalPages) {
            loadmorebtn.style.display = 'block';
        } else {
            // Hide the button if all results are loaded
            loadmorebtn.style.display = 'none'; 
            if (page > 1) {
                 // Only show 'no more' message after the initial search
                // resultdiv.innerHTML += '<p style="text-align: center; margin-top: 20px;">No more images found for this query.</p>'; 
            }
        }
    } else if (page === 1) {
        // Handle case where no results are found on the first page
        resultdiv.innerHTML = '<h2>No images found for that search. Try a different term!</h2>';
        loadmorebtn.style.display = 'none';
    }
}

searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    // No need to set keyword here as it's set inside fetchImages
    page = 1;
    fetchImages();
});

loadmorebtn.addEventListener('click', () => {
    // Only load more if the input field is not empty (already checked in fetchImages)
    page++;
    fetchImages();
});

loadmorebtn.style.display = 'none';