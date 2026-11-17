
const country = document.querySelector("#country");
const currency = document.querySelector("#currency");
const saveButton = document.querySelector("#save-region");
const message = document.querySelector("#region-message");

const countryCurrencies = {
  NG: "NGN",
  US: "USD",
  GB: "GBP",
  EU: "EUR",
  GH: "GHS",
  ZA: "ZAR",
  CA: "CAD",
  AU: "AUD",
  ROW: "USD"
};

const savedRegion = localStorage.getItem("gj-region");
const savedCurrency = localStorage.getItem("gj-currency");

if (savedRegion && country.querySelector(
  `option[value="${savedRegion}"]`
)) {
  country.value = savedRegion;
}

if (savedCurrency && currency.querySelector(
  `option[value="${savedCurrency}"]`
)) {
  currency.value = savedCurrency;
} else {
  currency.value = countryCurrencies[country.value];
}

country.addEventListener("change", () => {
  currency.value = countryCurrencies[country.value];
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("gj-region", country.value);
  localStorage.setItem("gj-currency", currency.value);

  message.textContent = "Your shopping preferences have been saved.";

  window.setTimeout(() => {
    window.location.href = "index.html";
  }, 700);
});
