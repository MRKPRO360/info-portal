"use-strict";

// Selecting Elements
const categoriesList = document.querySelector(".categories__list");
const categoryFound = document.querySelector(".category-found");

const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (err) {
    alert("Sorry to fetch :( Please try again later!");
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

const categoryDetails = async (id, categoryName) => {
  console.log(id, categoryName);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.data);

    const html = `
    <h4 class="heading-4 category-found__text">
          ${data.data.length} items found of ${categoryName}
        </h4>
    `;
    // clear the previous markup
    categoryFound.innerHTML = "";
    categoryFound.insertAdjacentHTML("beforeend", html);
  } catch (err) {
    alert("Sorry to fetch :( Please try again later!");
  }
};

loadCategories();
