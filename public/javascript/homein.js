var productData = [{
    image_url: "images/b1 (1).webp",
    brand: "Huesland by Ahmedabad",
    para: "Cotton 144 TC Bedsheet for King Size Bed with 2 Pillow Covers",
    price: "Rs. 999",
    rs: 999,
    strikedoffprice: "Rs 1999",
    offer: "(50% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "BedSheet",
}, {
    image_url: "images/b2 (1).webp",
    brand: "Haus & Kinder",
    para: "Floral Grace Bedsheet for King Size Bed with 2 Pillow Covers",
    price: "Rs. 999",
    rs: 999,
    strikedoffprice: "Rs 1999",
    offer: "(50% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "BedSheet",
}, {
    image_url: "images/b3 (1).webp",
    brand: "Aeroheaven",
    para: "Cotton 210 TC Bedsheet for King Size Bed with 2 Pillow Covers",
    price: "Rs. 599",
    rs: 599,
    strikedoffprice: "Rs 1199",
    offer: "(50% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "BedSheet",
}, {
    image_url: "images/b4 (1).webp",
    brand: "Trance Home",
    para: "Linen 200 TC Bedsheet for King Size Bed with 2 Pillow Covers",
    price: "Rs. 1233",
    rs: 1233,
    strikedoffprice: "Rs 2599",
    offer: "(53% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "BedSheet",
}, {
    image_url: "images/a1 (1).webp",
    brand: "Kumar Industries",
    para: "Metal Wall Decor/Hanging Wall Art",
    price: "Rs. 2499",
    rs: 2499,
    strikedoffprice: "Rs 2649",
    offer: "(6% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "BedSheet",
}, {
    image_url: "images/a2 (1).webp",
    brand: "La Decorica",
    para: " Morden Stylish Metal Wall Decor/Hanging Wall Art",
    price: "Rs. 2450",
    rs: 2450,
    strikedoffprice: "Rs 4999",
    offer: "(51% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "BedSheet",
}, {
    image_url: "images/a3 (1).webp",
    brand: "DSH",
    para: "Abstract Metal Wall Decor/Hanging Wall Art",
    price: "Rs. 2880",
    rs: 2880,
    strikedoffprice: "Rs 7999",
    offer: "(64% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "BedSheet",
}, {
    image_url: "images/a4 (1).webp",
    brand: "Huesland by Ahmedabad",
    para: "Beautiful Leaf Wall Decor/Hanging Wall Art",
    price: "Rs. 1999",
    rs: 1999,
    strikedoffprice: "Rs 3999",
    offer: "(50% OFF)",
    atc: "Add to Bag",
    atw: "Add to Whishlist",
    category: "BedSheet",
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

