var productData = [{
    image_url: "images/k1 (1).webp",
    brand: "ANNI DESIGNER",
    para: "Women's Cotton Blend Kurta",
    price: "Rs. 419",
    rs: 419,
    strikedoffprice: "Rs 2599",
    offer: "(84% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Kurta",
}, {
    image_url: "images/k2 (1).webp",
    brand: "ANNI DESIGNER",
    para: "Women's Cotton Blend Printed Straight Kurta",
    price: "Rs. 659",
    rs: 659,
    strikedoffprice: "Rs 2599",
    offer: "(75% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Kurta",
}, {
    image_url: "images/k3 (1).webp",
    brand: "WNESY",
    para: "Women's Rayon Printed Kurta",
    price: "Rs. 999",
    rs: 999,
    strikedoffprice: "Rs 2299",
    offer: "(57% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Kurta",
}, {
    image_url: "images/k4 (1).webp",
    brand: "GOSIRIKI",
    para: "Women's Cotton Blend Straight Kurta",
    price: "Rs. 699",
    rs: 699,
    strikedoffprice: "Rs 2599",
    offer: "(73% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Kurta",
}, {
    image_url: "images/d1 (1).webp",
    brand: "SHEETAL ASSOCIATES",
    para: "Women's Puff Sleeve Dress",
    price: "Rs. 379 ",
    rs: 379,
    strikedoffprice: "Rs 1999 ",
    offer: "(81% OFF) ",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Dress"
}, {
    image_url: "images/d2 (1).webp",
    brand: "KERI PERRY",
    para: "Women's Chiffon Western Dress",
    price: "Rs. 599 ",
    rs: 599,
    strikedoffprice: "Rs 1899 ",
    offer: "(68% OFF) ",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Dress"
}, {
    image_url: "images/d3 (1).webp",
    brand: "LYMIO",
    para: "Dress for Women",
    price: "Rs. 499 ",
    rs: 499,
    strikedoffprice: "Rs 1499 ",
    offer: "(67% OFF) ",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Dress"
}, {
    image_url: "images/d4 (1).webp",
    brand: "TOPLOT",
    para: "Dress for Women",
    price: "Rs. 599 ",
    rs: 599,
    strikedoffprice: "Rs 2599 ",
    offer: "(77% OFF) ",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Dress"
}, {
    image_url: "images/s1 (1) (1).webp",
    brand: "NEEAH",
    para: "Women's Banarasi Saree",
    price: "Rs. 899 ",
    rs: 899,
    strikedoffprice: "Rs 4999 ",
    offer: "(82% OFF) ",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Saree"
}, {
    image_url: "images/s2 (1) (1).webp",
    brand: "GLORY SAREES",
    para: "Women's Kanchipuram Saree",
    price: "Rs. 559 ",
    rs: 559,
    strikedoffprice: "Rs 3999 ",
    offer: "(86% OFF) ",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Saree"
}, {
    image_url: "images/s3 (1) (1).webp",
    brand: "PANASH TRENDS",
    para: "Women's Rangoli Silk Embroidered Saree",
    price: "Rs. 1308 ",
    rs: 1308,
    strikedoffprice: "Rs 3899 ",
    offer: "(66% OFF) ",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Saree"
}, {
    image_url: "images/s4 (1) (1).webp",
    brand: "SHIV TEXTILES",
    para: "Women's Banarasi Saree",
    price: "Rs. 999 ",
    rs: 999,
    strikedoffprice: "Rs 4599 ",
    offer: "(78% OFF) ",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "Saree"
}];

var wishListData = JSON.parse(localStorage.getItem("wishListObj")) || []

var bagData = JSON.parse(localStorage.getItem("BagListObj")) || []

window.addEventListener('load', function () {
    displayPage(productData)
})

document.getElementById('nameSort').addEventListener('change', sortNames);


function displayPage(productData) {

    document.getElementById("container").innerHTML = "";

    productData.map(function (elem) {
        var box = document.createElement("div")
        box.style.cursor = "pointer"

        var img = document.createElement("img")
        img.src = elem.image_url

        var contentBox = document.createElement('div');
        contentBox.setAttribute('class', 'contentBox')

        var brand = document.createElement("h4")
        brand.textContent = elem.brand

        var productname = document.createElement("p")
        productname.textContent = elem.para


        var mix = document.createElement("div")
        mix.setAttribute("class", "mixbox")


        var price = document.createElement("p")
        price.textContent = elem.price

        var strprice = document.createElement("p")
        strprice.textContent = elem.strikedoffprice
        strprice.setAttribute("class", "strikep")


        var offer = document.createElement("p")
        offer.textContent = elem.offer
        offer.setAttribute("class", "offerp")

        mix.append(price, strprice, offer)



        var atw = document.createElement("p")
        atw.setAttribute("class", "wishListp")
        atw.textContent = elem.atw;
        atw.style.cursor = "pointer"

        atw.addEventListener("click", function () {
            addToWishlist(elem)
            
        })



        var atc = document.createElement("p")
        atc.setAttribute("class", "addToBagp")
        atc.textContent = elem.atc;
        atc.style.cursor = "pointer"


        atc.addEventListener("click", function () {
            addToBag(elem)
            
        })

        contentBox.append(brand, productname, mix, atw, atc)

        box.append(img, contentBox)

        document.querySelector("#container").append(box);



    });

}

function addToWishlist(element) {
    // var f;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = (this.responseText);
        // f = data
        if(data == "1"){
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/addToWish");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                // do something to response
                console.log(element);
            };
            xhr.send(JSON.stringify(element));
            alert("ADDED TO WISHLIST");
        }
        else{
            window.location.href = "login1"
        }
    }
    };
    
    xhttp.open("GET", "http://localhost:3000/auth", true);
    xhttp.send();

    
    // console.log(f);
}

function addToBag(element) {
    // var f;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = (this.responseText);
        // f = data
        if(data == "1"){
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/addToBag");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                // do something to response
                console.log(element);
            };
            xhr.send(JSON.stringify(element));
            alert("ADDED TO BAG");
        }
        else{
            window.location.href = "login1"
        }
    }
    };
    
    xhttp.open("GET", "http://localhost:3000/auth", true);
    xhttp.send();

    
    // console.log(f);
}

