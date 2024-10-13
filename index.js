let cartProducts = [];

const openOrderedItems = () => {
  document.querySelector(".nav_bottom").classList.toggle("nav_bottom_active");
};

const term = document.querySelector("input");
const searchProduct = () => {
  getProducts(term.value);
};

const main = document.querySelector("main");
const getProducts = (term) => {
  if (term.trim() !== "") {
    main.innerHTML = ``;
    for (let i = 0; i < products.length; i++) {
      if (products[i].name.toLowerCase().includes(term.toLowerCase())) {
        if (cartProducts.some((itm) => itm.id == products[i].id)) {
          main.innerHTML += `<div class="prod_card"><h4>${
            products[i].name
          }</h4><p>${products[i].des}</p><p>${
            products[i].price
          } TK</p><div class="btn_div${products[i].id}"><button class="btn${
            products[i].id
          }" onclick="addToCart('${products[i].id}', '${products[i].name}', '${
            products[i].des
          }', '${products[i].price}')">Added x${
            cartProducts.filter((itm) => itm.id == products[i].id).length
          }<button class="red_btn" onclick="removeItem('${products[i].id}', '${
            products[i].name
          }', '${products[i].des}', '${
            products[i].price
          }')">Remove</button></button></div></div>`;
        } else {
          main.innerHTML += `<div class="prod_card"><h4>${products[i].name}</h4><p>${products[i].des}</p><p>${products[i].price} TK</p><div class="btn_div${products[i].id}"><button class="btn${products[i].id}" onclick="addToCart('${products[i].id}', '${products[i].name}', '${products[i].des}', '${products[i].price}')">Add to cart</button></div></div>`;
        }
      }
    }
  } else {
    main.innerHTML = ``;
    for (let i = 0; i < products.length; i++) {
      if (cartProducts.some((itm) => itm.id == products[i].id)) {
        main.innerHTML += `<div class="prod_card"><h4>${
          products[i].name
        }</h4><p>${products[i].des}</p><p>${
          products[i].price
        } TK</p><div class="btn_div${products[i].id}"><button class="btn${
          products[i].id
        }" onclick="addToCart('${products[i].id}', '${products[i].name}', '${
          products[i].des
        }', '${products[i].price}')">Added x${
          cartProducts.filter((itm) => itm.id == products[i].id).length
        }<button class="red_btn" onclick="removeItem('${products[i].id}', '${
          products[i].name
        }', '${products[i].des}', '${
          products[i].price
        }')">Remove</button></button></div></div>`;
      } else {
        main.innerHTML += `<div class="prod_card"><h4>${products[i].name}</h4><p>${products[i].des}</p><p>${products[i].price} TK</p><div class="btn_div${products[i].id}"><button class="btn${products[i].id}" onclick="addToCart('${products[i].id}', '${products[i].name}', '${products[i].des}', '${products[i].price}')">Add to cart</button></div></div>`;
      }
    }
  }
};

getProducts(term.value);
// getOrederedProducts();

const addToCart = (id, name, des, price) => {
  cartProducts.push({
    id,
    name,
    des,
    price,
  });

  document.querySelector(
    "span"
  ).innerHTML = `(${cartProducts.length})<button class="red_btn" onclick="clearCart()">Clear</button>`;

  document.querySelector(
    `.btn_div${id}`
  ).innerHTML = `<button class="btn${id}" onclick="addToCart('${id}', '${name}', '${des}', '${price}')">Added x${
    cartProducts.filter((itm) => itm.id === id).length
  }<button class="red_btn" onclick="removeItem('${id}', '${name}', '${des}', '${price}')">Remove</button></button>`;

  document.querySelector("h3").innerHTML = `Ordered Items <span>(${
    cartProducts.length
  }), Total Price: ${cartProducts.reduce((accum, itm) => {
    return (accum = Number(accum) + Number(itm.price));
  }, 0)} TK</span>`;

  getOrederedProducts(id, name, des, price, "add");
};

const removeItem = (id, name, des, price) => {
  for (let j = 0; j < cartProducts.length; j++) {
    if (cartProducts[j].id === id) {
      cartProducts.splice(j, 1);

      break;
    }
  }

  if (cartProducts.length > 0) {
    document.querySelector(
      "span"
    ).innerHTML = `(${cartProducts.length})<button class="red_btn" onclick="clearCart()">Clear</button>`;
  } else {
    document.querySelector("span").innerHTML = `(${cartProducts.length})`;
  }

  if (cartProducts.some((itm) => itm.id === id)) {
    document.querySelector(
      `.btn_div${id}`
    ).innerHTML = `<button class="btn${id}" onclick="addToCart('${id}', '${name}', '${des}', '${price}')">Added x${
      cartProducts.filter((itm) => itm.id === id).length
    }<button class="red_btn" onclick="removeItem('${id}', '${name}', '${des}', '${price}')">Remove</button></button>`;
  } else {
    document.querySelector(
      `.btn_div${id}`
    ).innerHTML = `<button class="btn${id}" onclick="addToCart('${id}', '${name}', '${des}', '${price}')">Add to cart</button>`;
  }

  document.querySelector("h3").innerHTML = `Ordered Items <span>(${
    cartProducts.length
  }), Total Price: ${cartProducts.reduce((accum, itm) => {
    return (accum = Number(accum) + Number(itm.price));
  }, 0)} TK</span>`;

  getOrederedProducts(id, name, des, price, "remove");
};

const clearCart = () => {
  main.innerHTML = ``;

  cartProducts = [];
  document.querySelector("span").innerHTML = `(0)`;

  document.querySelector(
    "h3"
  ).innerHTML = `Ordered Items <span>(${0}), Total Price: 0 TK</span>`;

  // getOrederedProducts();
  ordered_items.innerHTML = ``;

  getProducts(term.value);
};

const ordered_items = document.querySelector(".ordered_items");
const getOrederedProducts = (id, name, des, price, type) => {
  if (type !== "remove") {
    ordered_items.innerHTML += `<div class="prod_card ordered_card${id}"><h4>${name}</h4><p>${des}</p><p>${price} TK</p><button class="btn${id}">x${
      cartProducts.filter((itm) => itm.id === id).length
    }</button></div>`;

    if (cartProducts.filter((itm) => itm.id === id).length > 1) {
      document.querySelector(`.ordered_card${id}`).remove();
    }
  } else {
    document.querySelector(`.btn${id}`).innerHTML = `x${
      cartProducts.filter((itm) => itm.id === id).length
    }`;
    if (cartProducts.filter((itm) => itm.id === id).length < 1) {
      document.querySelector(`.ordered_card${id}`).remove();
    }
  }
};
