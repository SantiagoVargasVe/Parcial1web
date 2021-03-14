let data
const retrieveJson = async() =>{
    await fetch('https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce')
    .then(response => response.json())
    .then(json => {
        data = json
    })
    
}
const createFavorites = async()=>{
    await retrieveJson()
    data = data.items
    let local= localStorage.getItem('favorites').split(',')
    let favorites= data.filter(element => {
        return local.includes(element.id)
    })
    console.log(local)
    let list_products= document.getElementById('list-products')
    favorites.forEach(record =>{
        let product_container = document.createElement('div')
        let check = document.createElement('input')
        check.className ='check'
        check.id = record.id
        check.type = 'checkbox'
        product_container.appendChild(check)

        let img_phone = document.createElement('div')
        img_phone.className = 'img-phone'
        let pictureURL = record.picture
        img_phone.style.backgroundImage = `url('${pictureURL}')`
        product_container.appendChild(img_phone)

        let price_name = document.createElement('div')
        price_name.className = 'price-name'
        let price_delivery = document.createElement('div')
        price_delivery.className= 'price-delivery'
        product_container.className= 'product-container'
        list_products.appendChild(product_container)
    })

    
}

createFavorites()