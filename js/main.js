"use-strict";

// Selecting Elements
const categoriesList = document.querySelector(".categories__list");
const categoryFound = document.querySelector(".category__found");
const categoriesLinks = document.querySelectorAll(".categories__link");
const categoryCardsContainer = document.querySelector(
  ".category__cards-container"
);

let loading = false;

const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (err) {
    alert(`Sorry to fetch :( ${err.name} Please try again later!`);
  }
};

const displayCategories = (categories) => {
  categories.forEach((category) => {
    const html = `
       <li class="categories__item">
            <a href="#" class="categories__link" onclick="categoryDetails('${category.category_id}','${category.category_name}')">${category.category_name}</a>
          </li>
      `;
    categoriesList.insertAdjacentHTML("beforeend", html);
  });
};

const categoryDetails = async function (id, categoryName) {
  // setting spinner for every single fetch request
  categoryCardsContainer.innerHTML = `
   <svg class="spinner" viewBox="0 0 50 50">
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
          ></circle>
        </svg>
  `;

  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    const html = `
    <h4 class="heading-4 category-found__text">
    ${data.data.length} items found of ${categoryName}
        </h4>
    `;

    // clear the previous markup
    categoryFound.innerHTML = "";
    categoryFound.insertAdjacentHTML("beforeend", html);

    displayCard(data.data);

    if (data.data.length === 0) {
      // Clear the spinner
      categoryCardsContainer.innerHTML = "";
      throw new Error("No data available!");
    }
  } catch (err) {
    alert(`Sorry to fetch :( ${err.message} Please try again later!`);
  }
};

const displayCard = (cards) => {
  // Hide the spinner
  const spinner = document.querySelector(".spinner");
  spinner.classList.add("d-none");

  cards.forEach((card) => {
    const html = `
    <div class="category__cards bg-white">
    <div class="category__img-container">
          <img
            src="${card.image_url}"
            alt=""
            class="category__img"
          />
        </div>

        <div class="category__info">
          <h2 class="category__card-title heading-2">
            ${card.title}
          </h2>

          <p class="category__text">
           ${card.details.slice(0, 279)}
          </p>

          <p class="category__text ellipsis">
          ${card.details.slice(280)}
          </p>

          <div class="category__summary">
            <!-- 1st col -->
            <div class="category__publisher">
              <div class="category__pubisher-img-container">
                <img
                  src="${card.author.img}"
                  alt=""
                  class="category__pubisher-img"
                />
              </div>

              <div class="category__text-container">
                <h5 class="heading-5 category__publisher-name">${
                  card.author.name ? card.author.name : "No author found"
                }</h5>
                <span class="category__publish-date">${
                  card.author.published_date
                }</span>
              </div>
            </div>

            <!-- 2nd col -->
            <div class="category__view-container">
              <div class="category__view-img-container">
                <img
                  src="./img/carbon_view.svg"
                  alt=""
                  class="category__view-img"
                />
              </div>
              <p class="category__view-text">${
                card.total_view ? card.total_view : "No data found"
              }</p>
            </div>

            <!-- 3rd col -->
            <div class="category__icons">
              <img
                src="./img/bxs_star-half.svg"
                alt=""
                class="category__icon"
              />
              <img
                src="./img/ant-design_star-outlined.svg"
                alt=""
                class="category__icon"
              />
              <img
                src="./img/ant-design_star-outlined.svg"
                alt=""
                class="category__icon"
              />
              <img
                src="./img/ant-design_star-outlined.svg"
                alt=""
                class="category__icon"
              />
              <img
                src="./img/ant-design_star-outlined.svg"
                alt=""
                class="category__icon"
              />
            </div>

            <!-- 4th col -->

            <a href="#" class="category__next">&rarr;</a>
          </div>
        </div>
        </div>
    `;
    // clear the spinner
    // categoryCardsContainer.innerHTML = "";
    categoryCardsContainer.insertAdjacentHTML("beforeend", html);
  });
};

loadCategories();
