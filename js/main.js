"use-strict";

const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.news_category);
  } catch (err) {
    alert("Sorry to fetch :( Please try again later!");
  }
};

loadCategories();
