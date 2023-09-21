// =======================================================================================================================
// ALLL DOM ELEMENTS
// =======================================================================================================================

const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const menuIcon = document.getElementById("menu-icon");
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const cartCloseButton = document.getElementById("cart-close-button");
const readButton = document.getElementById("read-button");
const dots = document.getElementById("dots");
const readOption = document.getElementById("read-option");
const allLinkElements = navLinks.querySelectorAll("a");
const allProductsContainer = document.getElementById("all-products-container");
const allCartProductsContainer = document.getElementById(
  "cart-items-container"
);
const totalBill = document.getElementById("total-bill");
const notification = document.getElementById("notification");
const checkoutbtn = document.getElementById("checkout");
const search = document.getElementById("search");

// =======================================================================================================================
// ALL DATA AND VARIABLES
// =======================================================================================================================

const Products = [
  {
    title: "Pink Lipstick",
    category: "Makeup",
    price: "78",
    thumbnail: "./assets/images/Product-01.jpg",
  },
  {
    title: "Matte Lipstick",
    category: "Makeup",
    price: "50",
    thumbnail: "./assets/images/Product-02.jpg",
  },
  {
    title: "Compact Powder",
    category: "Makeup",
    price: "100",
    thumbnail: "./assets/images/Product-03.jpg",
  },
  {
    title: "Brushes",
    category: "Makeup",
    price: "200",
    thumbnail: "./assets/images/Product-04.jpg",
  },
  {
    title: "Rings",
    category: "Accessories",
    price: "100",
    thumbnail: "./assets/images/Product-05.jpg",
  },
  {
    title: "Bracelet",
    category: "Accessories",
    price: "150",
    thumbnail: "./assets/images/Product-06.jpg",
  },
  {
    title: "Earings",
    category: "Accessories",
    price: "300",
    thumbnail: "./assets/images/Product-07.jpg",
  },
  {
    title: "Ring",
    category: "Accessories",
    price: "150",
    thumbnail: "./assets/images/Product-08.jpg",
  },
  {
    title: "Sneakers",
    category: "Footwear",
    price: "100",
    thumbnail: "./assets/images/Product-09.jpg",
  },
  {
    title: "Sneakers",
    category: "Footwear",
    price: "400",
    thumbnail: "./assets/images/Product-10.jpg",
  },
  {
    title: "Shoes",
    category: "Footwear",
    price: "350",
    thumbnail: "./assets/images/Product-11.jpg",
  },
  {
    title: "Court Shoes",
    category: "Footwear",
    price: "500",
    thumbnail: "./assets/images/Product-12.jpg",
  },
];

let filteredProducts = [];
let cartProduct = [];

// =======================================================================================================================
//ALL FUNCTIONS
// =======================================================================================================================

// 01-Function - To update all the products in the DOM
const updateAllProductsDom = () => {
  if (Products.length === 0) {
    allProductsContainer.innerHTML = `<p class="center" >No Products found</p>`;
    return;
  }

  allProductsContainer.innerHTML = ` ${filteredProducts.map((product, index) => {
    return `
     <div class="product-card" >
      <img src="${product.thumbnail}" alt="${index}" />
      <div class="details">
        <h3>${product.title}</h3>
        <small>${product.category}</small>
        <p>Price:$ ${product.price}</p>
        <button data-index = "product -${index}" class="add-to-cart">Add to Cart</button>
      </div>
    </div>
    `;
  }).join("")}`;

  const allAddtoCartButtons = document.getElementsByClassName("add-to-cart");
  Array.from(allAddtoCartButtons).forEach((button) => {
    button.addEventListener("click", addToCart);
  });
};

// 02 Function - Get the target button of clicked product

const addToCart = (e) => {
  cartProduct.push(
    filteredProducts[parseInt(e.target.getAttribute("data-index").split("-")[1])]
  );
  updateCartProductCard();
};

// 03- Function Update the cart-product-card DOM

const updateCartProductCard = () => {
  if (cartProduct.length === 0) {
    allCartProductsContainer.innerHTML = `<p class="center">No Product selected</p>`;
    totalBill.innerHTML = 0;
    if (notification.classList.contains("show"))
      notification.classList.remove("show");
    return;
  }

  allCartProductsContainer.innerHTML = ` ${cartProduct
    .map((cartProduct, index) => {
      return `
     <div class="cart-product-card">
     <img src="${cartProduct.thumbnail}" alt="${index}">
     <div class="details">
       <h4>${cartProduct.title}</h4>
       <p>${cartProduct.category}</p>
       <h4>Price: $${cartProduct.price}</h4>
     </div>
     <button  class="cart-product-card-delete-button" >
      <i data-index="cartItem-${index}" class="fa-solid fa-xmark"></i></button>
   </div>
   
    `;
    })
    .join("")}`;

  // ADD EVENT LISTENER
  const cartProductdeletebtn = document.getElementsByClassName(
    "cart-product-card-delete-button"
  );
  Array.from(cartProductdeletebtn).forEach((button) =>
    button.addEventListener("click", removeFromCart)
  );

  // ADD FUNCTION TO CALCULATE TOTAL BILL
  let amount = 0;
  cartProduct.forEach((cartItem) => {
    amount = amount + parseInt(cartItem.price);
  });
  totalBill.innerHTML = `${amount}`;

  // Notification
  notification.innerHTML = `${cartProduct.length}`;
  if (!notification.classList.contains("show")) {
    notification.classList.add("show");
  }
};

// 04 - Function Remove product item from the cart

const removeFromCart = (e) => {
  const dataIndex = e.target.getAttribute("data-index");

  const indexToRemove = parseInt(dataIndex.split("-")[1]);

  // Use the filter method to create a new array without the item to remove
  cartProduct = cartProduct.filter((product, index) => index !== indexToRemove);

  updateCartProductCard();
};

// 05 - Function - Search Products by title or category

const searchProductByText  = (text = "") =>{
  
  let searchText = text.toLowerCase();

  filteredProducts = Products.filter((product) => {
    if (
      product.title.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    ) {

      return product;
    }
  });

  updateAllProductsDom();
}

// =======================================================================================================================
// ALL EVENT LISTENERS
// =======================================================================================================================

// 1 - Event Listener - click on the menu icon to toggle the nav-links.

menuButton.addEventListener("click", (e) => {
  if (!navLinks.classList.contains("show")) {
    navLinks.classList.add("show");
    menuIcon.classList.replace("fa-bars", "fa-xmark");
  } else {
    navLinks.classList.remove("show");
    menuIcon.classList.replace("fa-xmark", "fa-bars");
  }
});

// 2 - Event Listener - click on the cart icon to toggle the cart UI.

cartIcon.addEventListener("click", (e) => {
  if (!cart.classList.contains("show")) {
    cart.classList.add("show");
  } else {
    cart.classList.remove("show");
  }
});

// 3 - Event Listener - click on the cart close button to clsoe the cart UI.

cartCloseButton.addEventListener("click", (e) => {
  cart.classList.remove("show");
});

// 04 - Event Listener - click on read button option to raed complete text and vice versa.

readButton.addEventListener("click", (e) => {
  if (!readOption.classList.contains("show")) {
    readOption.classList.add("show");
    readButton.innerHTML = "Read less";
  } else {
    readOption.classList.remove("show");
    readButton.innerHTML = "Read more";
  }
});

// 05 - Event Listener - Hide Navbar automatically after clicking navbar links.

allLinkElements.forEach((link) => {
  navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("show");
    menuIcon.classList.replace("fa-xmark", "fa-bars");
  });
});

// 06- Event Listener - Remove all elements From Cart after cliclikng checkout button

checkoutbtn.addEventListener("click", (e) => {
  cartProduct = [];
  updateCartProductCard();
});

// 07 - Event Listener - Search

search.addEventListener('input', (e) => searchProductByText(e.target.value));

// =======================================================================================================================
//Init Functions
// =======================================================================================================================
searchProductByText();
updateAllProductsDom();
updateCartProductCard();