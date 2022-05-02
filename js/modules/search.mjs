import algoliasearch from "https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch-lite.esm.browser.js";

const client = algoliasearch("BQ93464WAA", "8c5d4d4e0f5b07555c1188b7da8089e1");
const searchIndex = client.initIndex("docs");

export default async () => {
  const searchBox = document.getElementById("search");
  const searchForm = document.getElementById("search-form");
  const searchWrap = document.getElementById("search-wrap");
  const searchResultsWrap = document.getElementById("search-results-wrap");
  searchBox.addEventListener("input", runSearch.debounce(250));
  searchForm.addEventListener("submit", (e) => e.preventDefault());

  // This is done here like this instead of in CSS or with a focusout event,
  // because focusout and blur events happen before the click event.
  // Therefore, the clicked link would disappear before it could actually be clicked.
  // This way we only hide the search results if a mousedown happens outside of
  // the search results box.
  searchWrap.addEventListener("focusin", (e) => {
    searchResultsWrap.style.display = "block";
  });
  window.addEventListener("mousedown", (e) => {
    if (e.target == null || !searchWrap.contains(e.target)) {
      searchResultsWrap.style.display = "none";
    }
  });
};

const runSearch = async (event) => {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.textContent = "";

  const searchTerm = event.target.value;
  if (searchTerm.length < 2) return;

  const productToFilterBy = event.target.dataset.filter || false;
  const alogliaArgs = {
    hitsPerPage: 10,
    attributesToRetrieve: ["title", "url", "_tags"],
    attributesToSnippet: ["content"],
    snippetEllipsisText: "…",
  };
  if (productToFilterBy) alogliaArgs.filters = productToFilterBy;

  const { hits: results } = await searchIndex.search(searchTerm, alogliaArgs);

  const formattedResults = results.map((result) => {
    const productName = extractProductName(result._tags);

    // Create elements
    const li = document.createElement("li");
    const link = document.createElement("a");
    const title = document.createElement("strong");
    const excerpt = document.createElement("p");
    const product = document.createElement("span");

    link.href = result.url;
    link.classList.add(
      "db",
      "link",
      "eggplant",
      "hover-dragonfruit",
      "hover-bg-snow-light",
      "pv3",
      "ph4"
    );

    excerpt.classList.add("search-snippet");
    excerpt.innerHTML = result._snippetResult.content.value;

    title.classList.add("flex", "items-center");
    title.innerText = result.title;

    product.innerText = productName;
    product.classList.add(
      "ttu",
      "ml-auto",
      "channels",
      "br2",
      "pv1",
      "ph2",
      "bg-white",
      "ba",
      "b--smoke",
      productName
    );

    // Put all the elements together
    title.appendChild(product);
    link.appendChild(title);
    link.appendChild(excerpt);
    li.appendChild(link);
    return li;
  });
  formattedResults.map((el) =>
    searchResultsContainer.insertAdjacentElement("beforeend", el)
  );
};

const extractProductName = (tags) => {
  return tags.filter((tag) => tag === "channels" || tag === "beams")[0];
};

Function.prototype.debounce = function (delay) {
  var outter = this,
    timer;

  return function () {
    var inner = this,
      args = [].slice.apply(arguments);

    clearTimeout(timer);
    timer = setTimeout(function () {
      outter.apply(inner, args);
    }, delay);
  };
};
