
/* =========================================================
   GODISJIGGY® — HOMEPAGE ENGINE
   Search / Products / Cart / Slideshow / Navigation
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  /* =========================================
     01. GLOBAL SETTINGS
  ========================================= */

  const STORAGE = {
    cart: "gj-cart",
    region: "gj-region",
    currency: "gj-currency"
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

  const currency = localStorage.getItem(STORAGE.currency) || "USD";

  const products =
    typeof productSeed !== "undefined" && Array.isArray(productSeed)
      ? productSeed
      : [];

  let activeFilter = "All";
  let searchTerm = "";
  let activeSlide = 0;

  let cart = loadCart();

  let slideTimer;


  /* =========================================
     02. HELPER FUNCTIONS
  ========================================= */

  function getElement(id) {
    return document.getElementById(id);
  }

  function loadCart() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE.cart) || "[]"
      );

      return Array.isArray(saved) ? saved : [];

    } catch (error) {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(
      STORAGE.cart,
      JSON.stringify(cart)
    );
  }

  function money(amount) {
    const rate = currencyRates[currency] || 1;

    try {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: currency === "NGN" ? 0 : 2
      }).format(Number(amount || 0) * rate);

    } catch (error) {
      return "$" + Number(amount || 0).toFixed(2);
    }
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return entities[character];
    });
  }

  function showToast(message) {
    const toast = getElement("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }


  /* =========================================
     03. HERO SLIDESHOW
  ========================================= */

  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".hero-dot")];

  const previousButton = getElement("hero-prev");
  const nextButton = getElement("hero-next");
  const counter = document.querySelector(".hero-counter");

  function showSlide(index) {

    if (!slides.length) return;

    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === activeSlide);
      slide.setAttribute(
        "aria-hidden",
        i === activeSlide ? "false" : "true"
      );
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === activeSlide);
    });

    if (counter) {
      counter.textContent =
        String(activeSlide + 1).padStart(2, "0") +
        " — " +
        String(slides.length).padStart(2, "0");
    }
  }

  function stopSlideshow() {
    clearInterval(slideTimer);
  }

  function startSlideshow() {

    stopSlideshow();

    if (slides.length < 2) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    slideTimer = setInterval(() => {
      showSlide(activeSlide + 1);
    }, 6000);
  }

  function changeSlide(index) {
    showSlide(index);
    startSlideshow();
  }

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      changeSlide(activeSlide - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      changeSlide(activeSlide + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      changeSlide(Number(dot.dataset.go));
    });
  });

  const hero = getElement("hero");

  if (hero) {
    hero.addEventListener("mouseenter", stopSlideshow);
    hero.addEventListener("mouseleave", startSlideshow);
    hero.addEventListener("focusin", stopSlideshow);
    hero.addEventListener("focusout", startSlideshow);
  }

  showSlide(0);
  startSlideshow();


  
  /* =========================================
     04. MOBILE NAVIGATION
  ========================================= */

  const menuToggle = getElement("menu-toggle");
  const navigation = document.querySelector(".desktop-nav");

  if (menuToggle && navigation) {

    function closeNavigation() {
      navigation.classList.remove("is-open");

      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    }

    menuToggle.addEventListener("click", () => {

      const isOpen = navigation.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu when a navigation link is selected
    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeNavigation);
    });

    // Close menu automatically when the visitor scrolls
    window.addEventListener("scroll", () => {
      if (
        navigation.classList.contains("is-open") &&
        window.matchMedia("(max-width: 760px)").matches
      ) {
        closeNavigation();
      }
    }, { passive: true });

    // Close menu if the visitor taps outside it
    document.addEventListener("click", event => {
      if (
        navigation.classList.contains("is-open") &&
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeNavigation();
      }
    });

  }



  /* =========================================
     05. SEARCH
  ========================================= */

  const searchToggle = getElement("search-toggle");
  const searchPanel = getElement("search-panel");
  const searchInput = getElement("search-input");
  const searchClose = getElement("search-close");

  function openSearch() {

    if (!searchPanel) return;

    searchPanel.classList.add("is-open");

    if (searchInput) {
      searchInput.focus();
    }

  }

  function closeSearch() {

    if (!searchPanel) return;

    searchPanel.classList.remove("is-open");

    if (searchInput) {
      searchInput.value = "";
      searchTerm = "";
      renderProducts();
    }

  }

  if (searchToggle) {
    searchToggle.addEventListener("click", openSearch);
  }

  if (searchClose) {
    searchClose.addEventListener("click", closeSearch);
  }

  if (searchInput) {

    searchInput.addEventListener("input", event => {

      searchTerm = event.target.value
        .trim()
        .toLowerCase();

      renderProducts();

    });

    searchInput.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeSearch();
      }

    });

  }


  /* =========================================
     06. PRODUCT CATALOGUE
  ========================================= */

  const productGrid = getElement("product-grid");
  const resultCount = getElement("result-count");
  const sortSelect = getElement("sort-select");

  function getVisibleProducts() {

    let visible = [...products];

    if (activeFilter !== "All") {

      visible = visible.filter(product =>
        String(product.category).toLowerCase() ===
        activeFilter.toLowerCase()
      );

    }

    if (searchTerm) {

      visible = visible.filter(product => {

        const searchable = [
          product.name,
          product.category,
          product.id,
          product.label,
          product.mark
        ].join(" ").toLowerCase();

        return searchable.includes(searchTerm);

      });

    }

    const sortValue = sortSelect
      ? sortSelect.value
      : "featured";

    if (sortValue === "low") {
      visible.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
      visible.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "name") {
      visible.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return visible;
  }


  function renderProducts() {

    if (!productGrid) return;

    const visibleProducts = getVisibleProducts();

    productGrid.innerHTML = "";

    if (resultCount) {
      resultCount.textContent =
        visibleProducts.length +
        (visibleProducts.length === 1
          ? " SIGNATURE PIECE"
          : " SIGNATURE PIECES");
    }

    if (!products.length) {

      productGrid.innerHTML = `
        <div class="catalogue-empty">
          <p class="eyebrow">THE COLLECTION IS LOADING</p>
          <p>Our signature pieces will appear here shortly.</p>
        </div>
      `;

      return;
    }

    if (!visibleProducts.length) {

      productGrid.innerHTML = `
        <div class="catalogue-empty">
          <p class="eyebrow">NO MATCHES FOUND</p>
          <p>Try another search or explore all pieces.</p>
        </div>
      `;

      return;
    }

    visibleProducts.forEach(product => {

      const card = document.createElement("article");

      card.className = "product-card";

      const productName = escapeHTML(product.name);
      const productId = encodeURIComponent(product.id);
      const productCategory = escapeHTML(product.category);
      const productMark = escapeHTML(product.mark || "GJ");
      const productLabel = escapeHTML(product.label || "");

      const badge = product.label
        ? `<span class="product-badge">${productLabel}</span>`
        : "";

      card.innerHTML = `
        <div class="product-art">

          ${badge}

          <a
            href="product.html?id=${productId}"
            class="product-art-link"
            aria-label="View ${productName}"
          >
            <span class="product-art-mark">${productMark}</span>
          </a>

          <button
            class="product-add"
            data-add="${escapeHTML(product.id)}"
            aria-label="Add ${productName} to bag"
          >+</button>

        </div>

        <div class="product-info">

          <p>${productCategory}</p>

          <h3>
            <a href="product.html?id=${productId}">
              ${productName}
            </a>
          </h3>

          <div class="product-price">
            ${money(product.price)}
          </div>

        </div>
      `;

      productGrid.appendChild(card);

    });

  }


  /* =========================================
     07. CATEGORY FILTERS
  ========================================= */

  const filterButtons = [
    ...document.querySelectorAll("[data-filter]")
  ];

  function setFilter(category) {

    activeFilter = category;

    filterButtons.forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );

    });

    renderProducts();

  }

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {
      setFilter(button.dataset.filter);
    });

  });


  const categoryCards = [
    ...document.querySelectorAll(
      "#category-grid [data-category]"
    )
  ];

  categoryCards.forEach(card => {

    card.addEventListener("click", () => {

      const category = card.dataset.category;

      setFilter(category);

      const shop = getElement("shop");

      if (shop) {
        shop.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

  });


  if (sortSelect) {
    sortSelect.addEventListener("change", renderProducts);
  }


  /* =========================================
     08. SHOPPING BAG
  ========================================= */

  const cartDrawer = getElement("cart-drawer");
  const cartToggle = getElement("cart-toggle");
  const cartClose = getElement("cart-close");
  const cartBackdrop = getElement("drawer-backdrop");

  const cartItemsContainer = getElement("cart-items");
  const cartCount = getElement("cart-count");
  const drawerCount = getElement("drawer-count");
  const cartTotal = getElement("cart-total");


  function openCart() {

    if (!cartDrawer) return;

    cartDrawer.classList.add("is-open");

    if (cartBackdrop) {
      cartBackdrop.classList.add("is-visible");
    }

  }

  function closeCart() {

    if (!cartDrawer) return;

    cartDrawer.classList.remove("is-open");

    if (cartBackdrop) {
      cartBackdrop.classList.remove("is-visible");
    }

  }

  if (cartToggle) {
    cartToggle.addEventListener("click", openCart);
  }

  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }

  if (cartBackdrop) {
    cartBackdrop.addEventListener("click", closeCart);
  }


  function getCartQuantity() {

    return cart.reduce((total, item) => {
      return total + Number(item.quantity || 1);
    }, 0);

  }

  function getCartTotal() {

    return cart.reduce((total, item) => {
      return total +
        Number(item.price || 0) *
        Number(item.quantity || 1);
    }, 0);

  }


  function renderCart() {

    const quantity = getCartQuantity();
    const total = getCartTotal();

    if (cartCount) {
      cartCount.textContent = quantity;
    }

    if (drawerCount) {
      drawerCount.textContent = quantity;
    }

    if (cartTotal) {
      cartTotal.textContent = money(total);
    }

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (!cart.length) {

      cartItemsContainer.innerHTML = `
        <p class="empty-cart">
          Your bag is waiting for something JIGGY.
        </p>
      `;

      return;
    }

    cart.forEach((item, index) => {

      const row = document.createElement("div");

      row.className = "cart-item";

      row.innerHTML = `
        <div class="cart-item-details">

          <strong>${escapeHTML(item.name)}</strong>

          <small>
            ${escapeHTML(item.size || "ONE SIZE")}
            ${item.colour ? " / " + escapeHTML(item.colour) : ""}
          </small>

          <span>${money(item.price)}</span>

          <div class="cart-quantity">

            <button
              data-cart-action="decrease"
              data-index="${index}"
              aria-label="Decrease quantity"
            >−</button>

            <span>${Number(item.quantity || 1)}</span>

            <button
              data-cart-action="increase"
              data-index="${index}"
              aria-label="Increase quantity"
            >+</button>

            <button
              class="cart-remove"
              data-cart-action="remove"
              data-index="${index}"
            >REMOVE</button>

          </div>

        </div>
      `;

      cartItemsContainer.appendChild(row);

    });

  }


  function addToCart(productId) {

    const product = products.find(item =>
      String(item.id) === String(productId)
    );

    if (!product) {
      showToast("This item is currently unavailable.");
      return;
    }

    const existing = cart.find(item =>
      String(item.id) === String(product.id) &&
      (item.size || "ONE SIZE") === "ONE SIZE" &&
      (item.colour || "") === ""
    );

    if (existing) {

      existing.quantity =
        Number(existing.quantity || 1) + 1;

    } else {

      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        size: "ONE SIZE",
        colour: "",
        quantity: 1
      });

    }

    saveCart();
    renderCart();

    showToast(product.name + " added to your bag.");

  }


  function updateCartItem(index, action) {

    if (!cart[index]) return;

    if (action === "increase") {
      cart[index].quantity =
        Number(cart[index].quantity || 1) + 1;
    }

    if (action === "decrease") {

      cart[index].quantity =
        Number(cart[index].quantity || 1) - 1;

      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }

    }

    if (action === "remove") {
      cart.splice(index, 1);
    }

    saveCart();
    renderCart();

  }


  if (productGrid) {

    productGrid.addEventListener("click", event => {

      const button = event.target.closest("[data-add]");

      if (!button) return;

      addToCart(button.dataset.add);

    });

  }


  if (cartItemsContainer) {

    cartItemsContainer.addEventListener("click", event => {

      const button = event.target.closest("[data-cart-action]");

      if (!button) return;

      updateCartItem(
        Number(button.dataset.index),
        button.dataset.cartAction
      );

    });

  }


  /* =========================================
     09. NEWSLETTER
  ========================================= */

  const newsletterForm = getElement("newsletter-form");
  const newsletterMessage = getElement("newsletter-message");

  if (newsletterForm) {

    newsletterForm.addEventListener("submit", event => {

      event.preventDefault();

      const emailInput = getElement("email");

      if (!emailInput || !emailInput.value.trim()) return;

      if (newsletterMessage) {
        newsletterMessage.textContent =
          "Thank you for joining the JIGGY movement.";
      }

      newsletterForm.reset();

      showToast("You're on the JIGGY list.");

    });

  }


  /* =========================================
     10. VIDEO PLACEHOLDER INTERACTIONS
  ========================================= */

  document.querySelectorAll("[data-video-slot]").forEach(slot => {

    slot.addEventListener("click", () => {

      showToast("The JIGGY campaign film is coming soon.");

    });

  });


  /* =========================================
     11. INITIALISE THE HOMEPAGE
  ========================================= */

  renderProducts();
  renderCart();


  /* =========================================
     12. REGION SELECTION
  ========================================= */

  if (!localStorage.getItem(STORAGE.region)) {

    window.location.href = "region.html";

  }

});
