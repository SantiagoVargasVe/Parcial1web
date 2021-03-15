let data;

const createDetail = async () => {
  await retrieveJson();
  data = data.items;
  let detailProduct = data.filter((element) => {
    return element.id == localStorage.detail;
  })[0];
  let breadcrumb = document.getElementById("breadcrumb");
  breadcrumbFormat = detailProduct.categories.toString().replace(/,/g, ">");
  breadcrumb.innerHTML = breadcrumbFormat;
  let product_img = document.getElementById("product-img");
  product_img.src = detailProduct.picture;
  let sold = document.getElementById("sold");
  let use = detailProduct.condition == "new" ? "Nuevo" : "Usado";
  let amountSold = detailProduct.sold_quantity;
  sold.innerHTML = `${use}| ${amountSold} vendidos`;
  let title = document.getElementById("name");
  let modal_title = document.getElementById("modal-title");
  modal_title.innerHTML = detailProduct.title;
  title.innerHTML = detailProduct.title;
  let price = detailProduct.price.amount;
  price = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);
  price = price.slice(0, -3).replace(/,/g, ".");
  price_html = document.getElementById("price");
  price_html.innerHTML = price;

  let a_lot_of_text = document.getElementById("a-lot-of-text");
  a_lot_of_text.innerHTML = detailProduct.description;

  let buy = document.getElementById("buy");
  buy.onclick = viewModal;

  let close_modal = document.getElementById("close-modal");
  close_modal.onclick = closeModal;

  let favorite = document.getElementById("favorite");
  favorite.onclick = addFavorites;
};

const retrieveJson = async () => {
  await fetch(
    "https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce",
  )
    .then((response) => response.json())
    .then((json) => {
      data = json;
    });
};
const addFavorites = () => {
  let act = localStorage.getItem("detail");
  let favorites = [];
  if (localStorage.getItem("favorites")) {
    favorites = localStorage.getItem("favorites").split(",");
  }
  favorites.push(act);
  localStorage.setItem("favorites", favorites.toString());
};

const closeModal = () => {
  modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
};

const viewModal = () => {
  modal = document.getElementById("modal");
  modal.style.visibility = "visible";
};
createDetail();
