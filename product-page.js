
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products.find(item => item.id === productId) || products[0];

const $ = selector => document.querySelector(selector);

const sizeMessage = $("#size-message");
const sizeContainer = $("#size-options");
const addButton = $("#add-product");
const wishlistButton = $("#save-product");

let selectedSize = "";
let selectedColour = "Onyx";

const sizeSets = {
  Apparel: ["XS", "S", "M", "L", "XL", "XXL"],
  Footwear: ["39", "40", "41", "42", "43", "44"],
  Headwear: ["S/M", "L/XL"],
  Jewellery: ["S", "M", "L"],
  Accessories: ["ONE SIZE"],
  Bags: ["ONE SIZE"],
  Lifestyle: ["ONE SIZE"]
};

const descriptions = {
  Apparel: "An original GODISJIGGY apparel piece, designed around confident expression, everyday movement and unmistakable street identity.",
  Footwear: "Built for movement and made to make an entrance. A GODISJIGGY footwear concept with a distinctive streetwear attitude.",
  Bags: "A functional statement piece for the everyday. Designed to carry your essentials with the GODISJIGGY signature.",
  Headwear: "A finishing touch with its own personality. Wear it your way and make the look unmistakably yours.",
  Jewellery: "A signature detail designed to add character to your everyday expression.",
  Accessories: "The details matter. Complete your look with a piece from the GODISJIGGY accessories collection.",
  Lifestyle: "Bring the GODISJIGGY identity beyond your wardrobe with this lifestyle collection piece."
};

const currencyCodes = {
  NG: "NGN", US: "USD", GB: "GBP", EU: "EUR",
  GH: "GHS", ZA: "ZAR", CA: "CAD", AU: "AUD", ROW: "USD"
};

const currencyRates = {
  USD: 1,
  NGN: 1600,
  GBP: 0.79,
  EUR: 0.92,
  GHS: 15,
  ZAR: 18,
  CAD: 1.37,
  AUD: 1.52
};

const currency = localStorage.getItem("gj-currency") || "USD";

function formatPrice(usd) {
  const amount = usd * (currencyRates[currency] || 1);

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "NGN" ? 0 : 2
  }).format(amount);
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("gj-cart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("gj-cart", JSON.stringify(cart));
}

function loadWishlist() {
  try {
    return JSON.parse(localStorage.getItem("gj-wishlist")) || [];
  } catch {
    return [];
  }
}

function saveWishlist(items) {
  localStorage.setItem("gj-wishlist", JSON.stringify(items));
}

function showProductToast(message) {
  const toast = $("#product-toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showProductToast.timer);
  showProductToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
}

function renderProduct() {
  document.title = `${product.name} — GODISJIGGY®`;

  $("#breadcrumb-name").textContent = product.name.toUpperCase();
  $("#product-category").textContent = product.category.toUpperCase();
  $("#product-name").textContent = product.name;
  $("#product-sku").textContent = product.id;
  $("#detail-sku").textContent = product.id;
  $("#large-product-mark").textContent = product.mark;
  $("#product-description").textContent =
    descriptions[product.category] || descriptions.Lifestyle;

  $("#product-price").textContent = formatPrice(product.price);
  $("#button-price").textContent = formatPrice(product.price);

  const sizes = sizeSets[product.category] || ["ONE SIZE"];

  sizeContainer.innerHTML = sizes.map(size => `
    <button class="size-option" type="button" data-size="${size}">
      ${size}
    </button>
  `).join("");

  sizeContainer.addEventListener("click", event => {
    const button = event.target.closest("[data-size]");
    if (!button) return;

    selectedSize = button.dataset.size;
    sizeMessage.textContent = "";

    sizeContainer.querySelectorAll(".size-option").forEach(item => {
      item.classList.toggle("selected", item === button);
    });
  });

  renderRelatedProducts();
  updateWishlistButton();
}

function renderRelatedProducts() {
  const related = products
    .filter(item => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const fallback = products
    .filter(item => item.id !== product.id && !related.includes(item))
    .slice(0, 4 - related.length);

  $("#related-grid").innerHTML = [...related, ...fallback].map(item => `
    <a class="related-card" href="product.html?id=${encodeURIComponent(item.id)}">
      <div class="related-visual" style="--glow:${item.color}">
        <span>${item.mark}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${formatPrice(item.price)}</p>
    </a>
  `).join("");
}

function updateWishlistButton() {
  const wishlist = loadWishlist();
  const saved = wishlist.includes(product.id);

  wishlistButton.classList.toggle("saved", saved);
  wishlistButton.textContent = saved
    ? "♥ SAVED TO WISHLIST"
    : "♡ ADD TO WISHLIST";
}

function addProductToCart() {
  if (!selectedSize && sizeSets[product.category]?.length > 1) {
    sizeMessage.textContent = "Please select a size before continuing.";
    return;
  }

  const size = selectedSize || "ONE SIZE";
  const cart = loadCart();

  const existing = cart.find(item =>
    item.id === product.id &&
    item.size === size &&
    item.colour === selectedColour
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      size,
      colour: selectedColour,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartDrawer();
  showProductToast(`${product.name} added to your bag.`);
}

function toggleWishlist() {
  let wishlist = loadWishlist();

  if (wishlist.includes(product.id)) {
    wishlist = wishlist.filter(id => id !== product.id);
    showProductToast("Removed from your wishlist.");
  } else {
    wishlist.push(product.id);
    showProductToast("Saved to your wishlist.");
  }

  saveWishlist(wishlist);
  updateWishlistButton();
}

function updateCartDrawer() {
  const cart = loadCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  $("#product-cart-count").textContent = count;
  $("#drawer-item-count").textContent = count;
  $("#product-cart-total").textContent = formatPrice(total);

  $("#product-cart-items").innerHTML = cart.length
    ? cart.map(item => `
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong><br>
          <span>${item.size || "ONE SIZE"} · ${item.colour || "Onyx"}</span><br>
          <span>${item.quantity} × ${formatPrice(item.price)}</span>
        </div>
        <button data-remove="${item.id}" data-size="${item.size || "ONE SIZE"}" data-colour="${item.colour || "Onyx"}">REMOVE</button>
      </div>
    `).join("")
    : '<p class="empty-cart">Your bag is waiting for something JIGGY.</p>';
}

function openProductCart() {
  $("#product-cart-drawer").classList.add("open");
  $("#product-cart-backdrop").classList.add("show");
}

function closeProductCart() {
  $("#product-cart-drawer").classList.remove("open");
  $("#product-cart-backdrop").classList.remove("show");
}

addButton.addEventListener("click", addProductToCart);
wishlistButton.addEventListener("click", toggleWishlist);

$("#colour-options").addEventListener("click", event => {
  const button = event.target.closest("[data-colour]");
  if (!button) return;

  selectedColour = button.dataset.colour;

  $("#colour-options").querySelectorAll(".colour-chip").forEach(chip => {
    chip.classList.toggle("selected", chip === button);
  });

  $("#selected-colour").textContent = selectedColour.toUpperCase();
});

document.querySelectorAll(".gallery-thumb").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".gallery-thumb").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    const index = button.dataset.view;
    $(".image-index").textContent = `${index} / 04`;

    const image = $("#main-product-image");
    image.style.background = index === "01"
      ? "radial-gradient(ellipse at center,#444,#1a1a1a 55%,#090909)"
      : index === "02"
      ? "radial-gradient(ellipse at 35% 40%,#555,#1a1a1a 60%,#090909)"
      : index === "03"
      ? "radial-gradient(ellipse at 65% 55%,#333,#222 45%,#090909)"
      : "radial-gradient(ellipse at center,#292929,#080808 75%)";
  });
});

$("#product-cart-toggle").addEventListener("click", openProductCart);
$("#close-product-cart").addEventListener("click", closeProductCart);
$("#product-cart-backdrop").addEventListener("click", closeProductCart);

$("#product-cart-items").addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  const cart = loadCart().filter(item =>
    !(item.id === button.dataset.remove &&
      (item.size || "ONE SIZE") === button.dataset.size &&
      (item.colour || "Onyx") === button.dataset.colour)
  );

  saveCart(cart);
  updateCartDrawer();
});

renderProduct();
updateCartDrawer();
