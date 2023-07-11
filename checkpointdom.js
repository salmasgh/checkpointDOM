//add new element button
let newItem = document.getElementById("add-item");
let cancel = document.getElementById("Cancel");
let ok = document.getElementById("ok");
let windowNewItem = document.getElementById("new-item-window");
function hideWindow() {
  windowNewItem.classList.add("hidden");
  windowNewItem.classList.remove("show");
}
function showWindow() {
  windowNewItem.classList.add("show");
  windowNewItem.classList.remove("hidden");
  cleaningService();
}

newItem.addEventListener("click", showWindow);
ok.addEventListener("click", hideWindow);
cancel.addEventListener("click", hideWindow);

//clear the thing where you put the name to add a flower
function cleaningService() {
  let nameInput = document.getElementById("name");
  nameInput.value = "";
  let categoryInput = document.getElementById("category");
  categoryInput.value = "";
  let imageInput = document.getElementById("img");
  imageInput.value = "";
  let priceInput = document.getElementById("price");
  priceInput.value = "";
}

//show shopping cart
let shoppingCart = document.querySelector(".shopping-cart");
let shoppingButton = document.getElementById("shopping-cart-btn");
function showShoppingCart() {
  shoppingCart.classList.add("show");
  shoppingCart.classList.remove("hidden");
}
function hideShoppingCart() {
  shoppingCart.classList.add("hidden");
  shoppingCart.classList.remove("show");
}
function hideshow() {
  if (shoppingCart.className == "shopping-cart hidden") {
    showShoppingCart();
  } else {
    hideShoppingCart();
  }
}
shoppingButton.addEventListener("click", hideshow);

//add new item
let cardsContainer = document.querySelector(".item-container");
let items = [
  {
    image: "images/orchid.jpg",
    name: "orchid",
    category: "flowers",
    price: "20",
    quantity: 0,
  },
  {
    image: "images/alstromeria.jpg",
    name: "alstromeria",
    category: "flowers",
    quantity: 0,
    price: "59",
  },
  {
    image: "images/daisy.jpg",
    name: "daisy",
    category: "flowers",
    quantity: 0,
    price: "79",
  },
];

ok.addEventListener("click", addNewItem);
function addNewItem() {
  let itemName = document.getElementById("name").value;
  let itemCategory = document.getElementById("category").value;
  let itemImage = document.getElementById("img").value;
  let itemPrice = document.getElementById("price").value;

  let cards = document.createElement("div");
  cards.classList.add("card");
  cardsContainer.appendChild(cards);
  cards.innerHTML = `
      <img src="${itemImage}" alt="" id="item-img" />
      <p class="subtitle">${itemCategory}</p>
      <h1 class="item-title">${itemName}</h1>
      <h1 class="price">${itemPrice}dt</h1>
      <img src="images/icon.png" id="icon">
      <img src="images/delete.png" id="delete">`;
  let deleteButtons = cards.querySelectorAll("#delete");
  deleteButtons.forEach((deleteButton) => {
    attachDeleteButtonListener(deleteButton);
  });
  let addButtons = cards.querySelectorAll("#icon");
  addButtons.forEach((addButton) => {
    attachAddButtonListener(addButton);
  });
  let newItem = {
    image: itemImage,
    name: itemName,
    category: itemCategory,
    price: itemPrice,
    quantity: 0,
  };
  items.push(newItem);
  console.table(items);
}

items.forEach((entry) => {
  let cards = document.createElement("div");
  cards.classList.add("card");
  cardsContainer.appendChild(cards);
  cards.innerHTML = `
      <img src="${entry.image}" alt="" id="item-img" />
      <p class="subtitle">${entry.category}</p>
      <h1 class="item-title">${entry.name}</h1>
      <h1 class="price">${entry.price}dt</h1>
      <img src="images/icon.png" id="icon">
      <img src="images/delete.png" id="delete">`;
  let deleteButtons = cards.querySelectorAll("#delete");
  deleteButtons.forEach((deleteButton) => {
    attachDeleteButtonListener(deleteButton);
  });
  let addButtons = cards.querySelectorAll("#icon");
  addButtons.forEach((addButton) => {
    attachAddButtonListener(addButton);
  });
});

//delete button
function attachDeleteButtonListener(deleteButton) {
  deleteButton.addEventListener("click", function () {
    deleteButton.parentNode.remove();
  });
}

//add to cart button
let numberItems = document.getElementById("number-items");
let a = parseInt(numberItems.textContent);

function attachAddButtonListener(addButton) {
  addButton.addEventListener("click", function () {
    numberItems.textContent = ++a;
  });
}

//adding items to cart
const total = document.querySelector(".total");
total.textContent = "0dt";
var b = 0;
let addedItems = [];
function findItemIndex(item) {
  return addedItems.findIndex(
    (addedItem) =>
      addedItem.name === item.name &&
      addedItem.category === item.category &&
      addedItem.price === item.price &&
      addedItem.image === item.image
  );
}
cardsContainer.addEventListener("click", function (event) {
  //get the element info
  if (event.target.id == "icon") {
    var card = event.target.closest(".card");
    var itemName = card.querySelector(".item-title").textContent;
    var itemCategory = card.querySelector(".subtitle").textContent;
    var itemImage = card.querySelector("#item-img").getAttribute("src");
    var itemPrice = card.querySelector(".price").textContent;
  }
  //find the element in the array items
  items.forEach((item, index) => {
    if (
      item.name === itemName &&
      item.category === itemCategory &&
      item.price + "dt" === itemPrice &&
      item.image === itemImage
    ) {
      item.quantity = ++item.quantity;
      //   console.log(item.quantity);

      if (!addedItems.includes(item)) {
        let purchases = document.createElement("div");
        purchases.classList.add("purchase");
        let shoppingCartDiv = document.querySelector(".purchase-container");
        shoppingCartDiv.appendChild(purchases);
        purchases.innerHTML = `
        <img src="${item.image}" alt="" id="purchase-img" />
        <div class="next">
            <h1 class="title">${item.name}</h1>
            <h1 class="unit-price">unit price : ${item.price}dt</h1>
            <div class="number-of-items">
                <button class="remove1">-</button>
                <p class="number">${item.quantity}</p>
                <button class="add1">+</button>
            </div>
        </div>
        <div>
            <h1 class="price">Total Price</h1>
            <h1 class="price second"> ${item.price * item.quantity}dt</h1>
        </div>`;
        addedItems.push(item);
        b = b + parseInt(item.price);
        let plusButton = purchases.querySelector(".add1");
        addPlusButtonListener(plusButton, item);
        let minusButton = purchases.querySelector(".remove1");
        addMinusButtonListener(minusButton, item);
      } else {
        let numberOfItems =
          document.querySelectorAll(".number")[findItemIndex(item)];
        numberOfItems.textContent = item.quantity;
        let miniTotal =
          document.querySelectorAll(".second")[findItemIndex(item)];
        miniTotal.textContent = item.price * item.quantity + "dt";
        // console.log(item.price);
        b = b + parseInt(item.price);
        total.textContent = "Total :" + b + "dt";
      }
    }
  });
});

// + button
function addPlusButtonListener(button, item) {
  button.addEventListener("click", function () {
    let numberOfItems =
      document.querySelectorAll(".number")[findItemIndex(item)];
    numberOfItems.textContent = ++item.quantity;
    let miniTotal = document.querySelectorAll(".second")[findItemIndex(item)];
    miniTotal.textContent = item.price * item.quantity + "dt";
    b = b + parseInt(item.price);
    total.textContent = "Total: " + b + "dt";
  });
}

// - button
function addMinusButtonListener(button, item) {
  button.addEventListener("click", function () {
    if (item.quantity === 1) {
      // Delete the item
      button.parentNode.parentNode.parentNode.remove();
      addedItems.splice(findItemIndex(item), 1);
      total.textContent = "Total: " + 0 + "dt";
    } else {
      let numberOfItems =
        document.querySelectorAll(".number")[findItemIndex(item)];
      numberOfItems.textContent = --item.quantity;
      let miniTotal = document.querySelectorAll(".second")[findItemIndex(item)];
      miniTotal.textContent = item.price * item.quantity + "dt";
      b = b - parseInt(item.price);
      total.textContent = "Total: " + b + "dt";
    }
  });
}
