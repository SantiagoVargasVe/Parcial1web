const url = 'https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce'
let data 


const retrieveJson = async() =>{
    await fetch('https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce')
    .then(response => response.json())
    .then(json => {
        data = json
    })
    
}


const createList = async() =>{
    localStorage.setItem('hola','mundo')
    await retrieveJson()
    let product =document.getElementsByClassName('product-container')
    let container = document.getElementById('container')

    data.items.forEach(element =>{

        let title = element.title
        let pictureURL = element.picture
        let free_shipping = element.free_shipping
        let price = element.price.amount
        let id = element.id

        let containerProduct = document.createElement('div')
        let img =   document.createElement('div')
        let price_name= document.createElement('div')
        let price_delivery = document.createElement('div')
        let priceP = document.createElement('p')
        let delivery = document.createElement('img')
        let name= document.createElement('div')
        let city = document.createElement('div')
        containerProduct.className = 'product-container'
        img.className= 'img-phone'
        img.style.backgroundImage=`url('${pictureURL}')`
        img.id=id
        img.role='button'
        img.onclick = function (img){
            localStorage.removeItem('detail')
            localStorage.setItem('detail',this.id)
            window.location.href='/detail.html'
        }
        containerProduct.appendChild(img)

        price_name.className = 'price-name'
        price_delivery.className = 'price-delivery'
        priceP.className = 'price'
        price= new Intl.NumberFormat('en-EN',{
            style:'currency',
            currency: 'USD'
        }).format(price)
        price = price.slice(0,-3).replace(/,/g,'.')
        priceP.innerHTML=price
        delivery.className='delivery'
        if(free_shipping){
            delivery.src='../assets/delivery.png'
        }else{
            delivery.src='../assets/white.png'
        }
        price_delivery.appendChild(priceP)
        price_delivery.appendChild(delivery)
        name.className = 'name'
        name.innerHTML = title
        price_name.appendChild(price_delivery)
        price_name.appendChild(name)
        containerProduct.appendChild(price_name)
        city.className = 'city'
        city.innerHTML = element.location
        containerProduct.appendChild(city)


        container.appendChild(containerProduct)
    })
}

createList()