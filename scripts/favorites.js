let data;
const retrieveJson = async () => {
  await fetch(
    "https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce",
  )
    .then((response) => response.json())
    .then((json) => {
      data = json;
    });
};
const createFavorites = async () => {
  await retrieveJson();
  data = data.items;
  let local = localStorage.getItem("favorites").split(",");
  let favorites = data.filter((element) => {
    return local.includes(element.id);
  });
  let list_products = document.getElementById("list-products");
  favorites.forEach((record) => {
    let product_container = document.createElement("div");
    product_container.id = record.id;
    let check = document.createElement("input");
    check.className = "check";
    check.type = "checkbox";
    check.id = record.id + "?";
    check.name = "check";
    product_container.appendChild(check);
    let prueba = document.createElement("div");
    prueba.className = "img-container";
    let img_phone = document.createElement("div");
    img_phone.className = "img-phone";
    let pictureURL = record.picture;
    img_phone.style.backgroundImage = `url('${pictureURL}')`;
    prueba.appendChild(img_phone);
    product_container.appendChild(prueba);

    let price_name = document.createElement("div");
    price_name.className = "price-name";
    let price_delivery = document.createElement("div");
    price_delivery.className = "price-delivery";

    let priceP = document.createElement("p");
    priceP.className = "price";

    let price = record.price.amount;
    price = new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "USD",
    }).format(price);
    price = price.slice(0, -3).replace(/,/g, ".");
    priceP.innerHTML = price;
    let delivery = document.createElement("img");
    if (record.free_shipping) {
      delivery.src = "/assets/delivery.png";
    } else {
      delivery.src = "/assets/white.png";
    }
    delivery.className = "delivery";

    price_delivery.appendChild(priceP);
    price_delivery.appendChild(delivery);
    price_name.appendChild(price_delivery);

    let name = document.createElement("div");
    name.className = "name";
    name.innerHTML = record.title;
    price_name.appendChild(name);
    product_container.appendChild(price_name);

    let button = document.createElement("button");
    button.className = "view-product";
    button.innerHTML = "Ver artículo";
    button.id = record.id + ":";
    button.onclick = function (button) {
      let contid = this.id.replace(":", "");
      localStorage.setItem("detail", contid);
      window.location.href = "/detail.html";
    };
    product_container.appendChild(button);
    product_container.className = "product-container";
    list_products.appendChild(product_container);

    let delete_button = document.getElementById("delete-button");
    delete_button.onclick = deleteChecks;
  });
};

const deleteChecks = () => {
  let ids = [];
  const checkboxes = document.querySelectorAll('input[name="check"]:checked');
  checkboxes.forEach((element) => {
    actid = element.id.replace("?", "");
    hidden = document.getElementById(actid);
    hidden.style.display = "none";
    ids.push(actid);
  });
  idslocal = localStorage.getItem("favorites").split(",");
  idslocal = idslocal.filter((item) => !ids.includes(item));
  localStorage.setItem("favorites", idslocal.toString());
};

createFavorites();
