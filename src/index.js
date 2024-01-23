import "./css/style.css";
import Card from "./js/card";

const card = new Card();

const btn = document.querySelectorAll(".btn");

btn.forEach((element) =>
  element.addEventListener("click", () => {
    card.addCard(element);
  }),
);
