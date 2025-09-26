// Elements
const productNameInput = document.getElementById('productName');
const productCategoryInput = document.getElementById('productCategory');
const productPriceInput = document.getElementById('productPrice');
const productDesInput = document.getElementById('productDes');
const productImgInput = document.getElementById('productImage');

const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const demo = document.getElementById('demo');

let productBox = JSON.parse(localStorage.getItem('allProducts')) || [];
let editIndex = null;

// Utils
function saveProducts() {
  localStorage.setItem('allProducts', JSON.stringify(productBox));
}

function clearInputs() {
  productNameInput.value = "";
  productCategoryInput.value = "";
  productPriceInput.value = "";
  productDesInput.value = "";
  productImgInput.value = "";
}

// Rendering
function renderProduct(product, index) {
  return `
    <div class="col-md-4">
      <div class="card shadow-sm">
        <img src="${product.imgUrl}" class="w-100" alt="">
        <div class="p-2">
          <h4>${product.name}</h4>
          <h5>${product.category}</h5>
          <span>Price: ${product.price} EGP</span>
          <p>${product.desc}</p>
          <button onclick="updateItem(${index})" class="btn btn-outline-success btn-sm">Update</button>
          <button onclick="deleteItem(${index})" class="btn btn-outline-danger btn-sm">Delete</button>
        </div>
      </div>
    </div>
  `;
}

function display(products = productBox) {
  demo.innerHTML = products.map(renderProduct).join('');
}

// CRUD
function addProduct() {
  if (!productNameInput.value || !productPriceInput.value) {
    alert("Please fill in product name and price.");
    return;
  }

  const product = {
    name: productNameInput.value,
    category: productCategoryInput.value,
    price: productPriceInput.value,
    desc: productDesInput.value,
    imgUrl: productImgInput.files[0] ? "images/imgs/" + productImgInput.files[0].name : "images/imgs/blog-1.jpg"
  };

  productBox.unshift(product);
  saveProducts();
  display();
  clearInputs();
}

function deleteItem(index) {
  productBox.splice(index, 1);
  saveProducts();
  display();
}

function updateItem(index) {
  editIndex = index;
  const product = productBox[index];

  productNameInput.value = product.name;
  productCategoryInput.value = product.category;
  productPriceInput.value = product.price;
  productDesInput.value = product.desc;

  addBtn.style.display = 'none';
  updateBtn.style.display = 'block';
}

function updateProduct() {
  const product = productBox[editIndex];

  product.name = productNameInput.value;
  product.category = productCategoryInput.value;
  product.price = productPriceInput.value;
  product.desc = productDesInput.value;

  saveProducts();
  display();
  clearInputs();

  addBtn.style.display = 'block';
  updateBtn.style.display = 'none';
}

// Search
function searchProduct(inputValue) {
  const filtered = productBox.filter(p =>
    p.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  display(filtered);
}

// Init
display();
