const API_KEY = "f7a2f9a847314df880293b977a3d77b5"; // Replace with your NewsAPI key
const url = "https://newsapi.org/v2/everything?q=";

document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-text").value.trim();
    if (query) {
        fetchNews(query);
    } else {
        alert("Please enter a search term.");
    }
});

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    if (data.status === "ok" && data.articles.length > 0) {
        displayNews(data.articles);
    } else {
        displayNoResults();
    }
}

function displayNews(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = ""; // Clear previous results

    articles.forEach((article) => {
        if (article.urlToImage && article.title && article.description) {
            const cardClone = newsTemplate.content.cloneNode(true);
            const img = cardClone.querySelector("#news-img");
            const title = cardClone.querySelector("#news-title");
            const desc = cardClone.querySelector("#news-desc");

            img.src = article.urlToImage;
            title.textContent = article.title;
            desc.textContent = article.description;

            // Add click event to open the news article
            cardClone.firstElementChild.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });

            cardsContainer.appendChild(cardClone);
        }
    });
}

function displayNoResults() {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "<p>No news articles found. Try another search.</p>";
}
