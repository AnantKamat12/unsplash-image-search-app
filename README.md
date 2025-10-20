# Unsplash Image Search App

A responsive web application built with vanilla JavaScript, HTML, and modern CSS Grid to search and display images from the Unsplash API.

---

## 🚀 Key Features

* **Image Search:** Fetches images based on user input.
* **Load More:** Infinite scrolling functionality via a "Load More" button.
* **Responsive Grid:** Images are displayed in a clean, uniform-height grid using CSS Grid and `object-fit: cover`.
* **Secure API Key Handling:** Utilizes a placeholder for the API key, demonstrating best practice for client-side security (key is intended to be loaded via environment variables during deployment).

---

## ⚙️ Setup & Usage

### Prerequisites

You need a valid **Unsplash Developer Access Key**.

1.  Register as a developer on Unsplash to get your Access Key.

### Local Setup

Since this is a client-side application, you must replace the placeholder key in `script.js` to run it locally.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AnantKamat12/unsplash-image-search-app.git](https://github.com/AnantKamat12/unsplash-image-search-app.git)
    cd unsplash-image-search-app
    ```

2.  **Edit `script.js`:**
    Open `script.js` and temporarily replace the placeholder with your actual key:
    ```javascript
    // Change this:
    const accessKey = '$$UNSPLASH_ACCESS_KEY$$'; 
    // To your actual key for local testing:
    const accessKey = 'YOUR_ACTUAL_UNSPLASH_KEY';
    ```

3.  **Run:**
    Open the **`index.html`** file directly in your web browser.

**⚠️ Security Note:** *Before committing any changes to this file, ensure you revert `accessKey` back to the placeholder (`'$$UNSPLASH_ACCESS_KEY$$'`).*
