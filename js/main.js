"use-strict";

// Selecting Elements
const categoriesList = document.querySelector(".categories__list");
const categoryFound = document.querySelector(".category__found");
const categoriesLinks = document.querySelectorAll(".categories__link");
const categoryCardsContainer = document.querySelector(
  ".category__cards-container"
);

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalInfoContainer = document.querySelector(".modal__info-container");
const modalCrossBtn = document.querySelector(".modal__cross");

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

    displayCards(data.data);

    if (data.data.length === 0) {
      // Clear the spinner
      categoryCardsContainer.innerHTML = "";
      throw new Error("No data available!");
    }
  } catch (err) {
    alert(`Sorry to fetch :( ${err.message} Please try again later!`);
  }
};

const displayCards = (cards) => {
  // Hide the spinner
  const spinner = document.querySelector(".spinner");
  spinner.classList.add("d-none");

  const sortedResponse = cards.sort((a, b) => +b.total_view - +a.total_view);

  console.log(sortedResponse);

  sortedResponse.forEach((card) => {
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
                    ? card.author.published_date
                    : "No date found"
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
                card.total_view ? card.total_view + " M" : "No data found"
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

            <a href="#" class="category__next" onclick="displayCardDetails('${
              card._id
            }')">&rarr;</a>
          </div>
        </div>
        </div>
    `;
    categoryCardsContainer.insertAdjacentHTML("beforeend", html);
  });
};
const displayCardDetails = async (id) => {
  try {
    // clearing modal container
    modalInfoContainer.innerHTML = "";
    // open up the modal window
    modal.classList.add("open");
    modal.classList.remove("close");

    overlay.classList.add("open");
    overlay.classList.remove("close");

    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    const modalInfo = data.data[0];

    if (modalInfo.length === 0) throw new Error("No data available!");
    const html = `
     <div class="category__cards modal__card mb-4">
            <div class="category__img-container">
              <img
                src="${modalInfo.image_url}"
                alt=""
                class="category__img"
              />
            </div>

            <div class="category__info">
              <h2 class="category__card-title heading-2">
                ${modalInfo.title}
              </h2>

              <p class="category__text">
                ${modalInfo.details.slice(0, 650)}
              </p>
            </div>
          </div>
          <div class="category__summary">
            <div class="category__publisher">
              <div class="category__pubisher-img-container">
                <img
                   src="${modalInfo.author.img}"
                  alt=""
                  class="category__pubisher-img"
                />
              </div>

              <div class="category__text-container">
                <h5 class="heading-5 category__publisher-name">${
                  modalInfo.author.name
                    ? modalInfo.author.name
                    : "No author found"
                }</h5>
                <span class="category__publish-date">${
                  modalInfo.author.published_date
                    ? modalInfo.author.published_date
                    : "No date found"
                }</span>

              </div>
            </div>

            <div class="category__trending-container">
              <div class="category__trending-img-container">
                <img
                  src="./img/trending-up.svg"
                  alt=""
                  class="category__trending-img"
                />
              </div>
              <h5 class="heading-5 category__publisher-name category__trending">
                ${modalInfo.others_info.is_trending}
              </h5>
            </div>

            <div class="category__badge-container">
              <div class="category__badge-img-container">
                <img src="./img/badge.png" alt="" class="category__badge-img" />
              </div>
              <h5 class="heading-5 category__publisher-name category__badge">
                ${modalInfo.rating.badge}
              </h5>
            </div>

            <div class="category__view-container">
              <div class="category__view-img-container">
                <img
                  src="./img/carbon_view.svg"
                  alt=""
                  class="category__view-img"
                />
              </div>
              <p class="category__view-text">${
                modalInfo.total_view
                  ? modalInfo.total_view + " M"
                  : "No data found"
              }</p>
            </div>

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
          </div>
    `;
    modalInfoContainer.insertAdjacentHTML("beforeend", html);
  } catch (err) {
    alert(`Sorry to fetch :( ${err.message} Please try again later!`);
  }
};

loadCategories();

// Custom Modal
modalCrossBtn.addEventListener("click", function () {
  modal.classList.add("close");
  modal.classList.remove("open");

  overlay.classList.add("close");
  overlay.classList.remove("open");
});

overlay.addEventListener("click", function () {
  overlay.classList.add("close");
  overlay.classList.remove("open");

  modal.classList.add("close");
  modal.classList.remove("open");
});
