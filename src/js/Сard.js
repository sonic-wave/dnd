export default class Card {
  constructor() {
    this.deleteButton = [];
    this.textBox = [];
    this.cards = [];
    this.mouseUpItem = undefined;
    this.proection = 0;
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

  addProection(textBoxList, mouseUpItem) {
    if (
      mouseUpItem &&
      mouseUpItem.classList.contains("textBox") &&
      !mouseUpItem.classList.contains("proectionAdded")
    ) {
      this.removeProection();
      this.mouseUpItem = mouseUpItem;
      const proection = document.createElement("div");
      proection.className = "proection";
      proection.style.width = "458px";
      proection.style.height = mouseUpItem.offsetHeight + "px";
      textBoxList.insertBefore(proection, mouseUpItem);
      mouseUpItem.classList.add("proectionAdded");
    }
  }

  removeProection() {
    const proection = document.querySelectorAll(".proection");
    const mouseUpItems = document.querySelectorAll(".textBox");

    proection.forEach((el) => el.remove());
    mouseUpItems.forEach((el) => el.classList.remove("proectionAdded"));
  }

  addListner() {
    this.textBox.forEach((element) =>
      element.addEventListener("mouseover", (element) => {
        const parent = element.target.closest(".textBox");
        parent.querySelector(".deleteButton").style.display = "block";
      }),
    );

    let actualElement;

    const onMouseMove = (e) => {
      const { pageX, pageY } = e;

      actualElement.style.left = pageX - this.shiftX + "px";
      actualElement.style.top = pageY - this.shiftY + "px";
      actualElement.style.pointerEvents = "none";

      const textBoxList = e.target.closest(".textBoxList");
      const mouseUpItem = e.target.closest(".textBox");
      this.addProection(textBoxList, mouseUpItem);
    };

    const onMouseUp = (e) => {
      const proection = e.target.closest(".proection");
      const mouseUpItems = document.querySelectorAll(".textBox");

      if (proection) {
        proection.replaceWith(actualElement);
        this.proection = 1;
        this.removeProection();
        mouseUpItems.forEach((el) => el.classList.remove("proectionAdded"));
      }

      actualElement.classList.remove("dragged");
      actualElement.style.pointerEvents = "auto";
      actualElement.style = "default";

      actualElement = undefined;

      document.documentElement.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mousemove", onMouseMove);
    };

    this.cards.forEach((element) =>
      element.addEventListener("mousedown", (element) => {
        element.preventDefault();
        actualElement = element.target.closest(".textBox");
        actualElement.classList.add("dragged");
        actualElement.style.cursor = "grab";

        const target = element.target;

        if (target.classList.contains("newCard")) {
          this.shiftX = element.offsetX;
          this.shiftY = element.offsetY;
        }

        document.documentElement.addEventListener("mouseup", onMouseUp);
        document.documentElement.addEventListener("mousemove", onMouseMove);
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
