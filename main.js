// main.js
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  duplicateProduct,
} from "./products.js";

const renderTable = () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const tbody = document.getElementById("productTable");
  tbody.innerHTML = "";

  products.forEach((p, index) => {
    const tr = document.createElement("tr");
    tr.className = "border-b";
    tr.innerHTML = `
      <td class="py-2 px-4 border">${p.id}</td>
      <td class="py-2 px-4 border">${p.title}</td>
      <td class="py-2 px-4 border">${p.price}</td>
      <td class="py-2 px-4 border space-x-2">
        <button class="bg-green-500 text-white px-2 py-1 rounded update" data-index="${index}">Update</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded delete" data-index="${index}">Delete</button>
        <button class="bg-yellow-500 text-white px-2 py-1 rounded duplicate" data-index="${index}">Duplicate</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach actions
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deleteProduct(e.target.dataset.index);
      renderTable();
    });
  });

  document.querySelectorAll(".update").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const newTitle = prompt("New title:");
      const newPrice = prompt("New price:");
      if (newTitle || newPrice) {
        updateProduct(index, { title: newTitle, price: parseFloat(newPrice) });
        renderTable();
      }
    });
  });

  document.querySelectorAll(".duplicate").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const products = JSON.parse(localStorage.getItem("products"));
      duplicateProduct(products[index]);
      renderTable();
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProducts();
  renderTable();

  document.getElementById("addBtn").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const price = parseFloat(document.getElementById("price").value);
    if (!title || isNaN(price)) return alert("Enter valid title and price");

    addProduct({ id: Date.now(), title, price });
    renderTable();

    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
  });
});
