// products.js

// Fetch products once and store in localStorage
export const fetchProducts = async () => {
  let products = JSON.parse(localStorage.getItem("products"));
  if (!products) {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    products = data.products;
    localStorage.setItem("products", JSON.stringify(products));
  }
  return products;
};

// Add new product
export const addProduct = (product) => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
};

// Delete product
export const deleteProduct = (index) => {
  const products = JSON.parse(localStorage.getItem("products"));
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
};

// Update product
export const updateProduct = (index, newData) => {
  const products = JSON.parse(localStorage.getItem("products"));
  products[index] = { ...products[index], ...newData };
  localStorage.setItem("products", JSON.stringify(products));
};

// Duplicate product using spread operator
export const duplicateProduct = (product) => {
  const newProduct = { ...product, id: Date.now() };
  addProduct(newProduct);
};
