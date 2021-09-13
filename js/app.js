// load product from the api
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // const url = `../json/productsDb.json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showProducts(data);
    });
};

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
        <img class="product-image" src="${image}"></img>
      </div>
      <h4 class = "cut-title-text">${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p>Rating: ${product.rating.rate}(${product.rating.count}) </p>
      <h4 class = "text-warning">Price: $ ${product.price}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick = "displayProductDetails(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// update cart property value
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  console.log(grandTotal);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// display product details

const displayProductDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("display-product-details").innerHTML = `
      <div class="card">
        <div class="card-body d-flex">
        <div>
          <img class="product-image pr-3" src="${data.image}">
        </div>
          <div>
            <p class ="m-0">Description: </p>
            <h5 class="card-title"> ${data.title}</h5>
            <p class="card-text">${data.description.slice(0, 150)}</p>
            <p class = "text-warning">Rating: ${data.rating.rate} (${
        data.rating.count
      } people rate this product)</p>
          </div>
        </div>
      </div>
      `;
      console.log(data);
    });
};

// call the function for load product
loadProducts();
