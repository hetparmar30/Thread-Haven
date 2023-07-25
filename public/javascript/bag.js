var productData = []
window.addEventListener('load', function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        productData = Array.from(data);
        displayPage(productData)
    }
    };
    
    xhttp.open("GET", "http://localhost:3000/bag", true);
    xhttp.send();
    
})

var wishListData = JSON.parse(localStorage.getItem("wishListObj")) || []

var bagData = JSON.parse(localStorage.getItem("BagListObj")) || []



// document.getElementById('nameSort').addEventListener('change', sortNames);


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



        


        var atc = document.createElement("p")
        atc.setAttribute("class", "addToBagp")
        atc.textContent = "Remove from Bag";
        atc.style.cursor = "pointer"


        atc.addEventListener("click", function () {
            addToBag(elem)
            
        })

        contentBox.append(brand, productname, mix, atc)

        box.append(img, contentBox)

        document.querySelector("#container").append(box);



    });

}

function addToBag(element) {
    // console.log(element._id);
    // var f;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = (this.responseText);
        // f = data
        if(data == "1"){
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/removeBag");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                // do something to response
                console.log(element);
            };
            xhr.send(JSON.stringify(element));
            window.location.href = "bagin"
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