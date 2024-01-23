export default class Card {
  constructor() {
    this.deleteButton = [];
    this.textBox = [];
    this.cards = [];
  }

  addCard(el) {
    const textBox = document.createElement("div");
    const card = document.createElement("input");
    const deleteButton = document.createElement("button");
    textBox.className = "textBox";
    card.className = "card";
    deleteButton.className = "deleteButton";
    deleteButton.innerHTML = "&#9747";
    const parent = el.closest(".column");
    parent.querySelector(".textBoxList").append(textBox);
    textBox.append(card);
    // textBox.append(deleteButton);
    // this.textBox.push(textBox);
    // this.deleteButton.push(deleteButton);
    el.style.display = "none";

    const buttonsBlock = document.createElement("div");
    buttonsBlock.className = "buttonsBlock";
    const addButton = document.createElement("button");
    addButton.className = "addButton";
    const removeButton = document.createElement("button");
    removeButton.className = "removeButton";
    addButton.textContent = "Add Card";
    removeButton.innerHTML = "&#9747";

    el.before(buttonsBlock);
    buttonsBlock.append(addButton);
    buttonsBlock.append(removeButton);

    addButton.addEventListener("click", () => {
      const newCard = document.createElement("div");
      newCard.className = "newCard";
      newCard.textContent = card.value;

      card.remove();
      buttonsBlock.remove();
      el.style.display = "block";

      textBox.append(newCard);
      textBox.append(deleteButton);
      this.textBox.push(textBox);
      this.cards.push(newCard);
      this.deleteButton.push(deleteButton);
      this.addListner();
    });

    removeButton.addEventListener("click", () => {
      textBox.remove();
      buttonsBlock.remove();
      el.style.display = "block";
    });
  }

  removeCard(element) {
    element.remove();
  }

  addListner() {
    this.textBox.forEach((element) =>
      element.addEventListener("mouseover", (element) => {
        const parent = element.target.closest(".textBox");
        parent.querySelector(".deleteButton").style.display = "block";
      }),
    );

    let actualElement;

    const onMouseOver = (e) => {
      actualElement.style.top = e.clientY + "px";
      actualElement.style.left = e.clientX + "px";
    };

    const onMouseUp = (e) => {
      const textBoxList = e.target.closest(".textBoxList");
      const mouseUpItem = e.target.closest(".textBox");

      textBoxList.insertBefore(actualElement, mouseUpItem);

      actualElement.classList.remove("dragged");

      actualElement = undefined;

      document.documentElement.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseover", onMouseOver);
    };

    this.cards.forEach((element) =>
      element.addEventListener("mousedown", (element) => {
        element.preventDefault();
        actualElement = element.target.closest(".textBox");
        actualElement.classList.add("dragged");
        actualElement.style.cursor = "grab";

        document.documentElement.addEventListener("mouseup", onMouseUp);
        document.documentElement.addEventListener("mouseover", onMouseOver);
      }),
    );

    this.textBox.forEach((element) =>
      element.addEventListener("mouseout", (element) => {
        const parent = element.target.closest(".textBox");
        parent.querySelector(".deleteButton").style.display = "none";
      }),
    );

    this.deleteButton.forEach((element) =>
      element.addEventListener("click", (e) => {
        this.removeCard(e.target.closest(".textBox"));
      }),
    );
  }
}
