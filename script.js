const API_KEY = "47425892-6d52093e00d99ce372ddd5ad3";
const API_URL = "https://pixabay.com/api/?key=";

const inputEl = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const resultsEl = document.querySelector(".results");
const showMoreBtn = document.querySelector(".show-more");

let page = 1;
let keyword = "";

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputEl.value.trim()) {
    alert("please enter the text");
    return;
  }
  keyword = inputEl.value.trim();
  resultsEl.innerHTML = "";
  handleSearchImages();
  showMoreBtn.style.display = "block";
});

async function handleSearchImages() {
  try {
    const response = await fetch(
      `${API_URL}${API_KEY}&page=${page}&q=${encodeURIComponent(keyword)}`
    );
    const data = await response.json();

    data.hits.forEach((hit) => {
      const img = document.createElement("img");
      img.src = hit.webformatURL;
      img.alt = hit.tags;
      img.classList.add("img");
      resultsEl.appendChild(img);
    });
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

showMoreBtn.addEventListener("click", () => {
  page++;
  handleSearchImages();
});
