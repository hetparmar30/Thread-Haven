require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
var useremail = "";
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const bagSchema = new mongoose.Schema({
    image_url: String,
    brand: String,
    para: String,
    price: String,
    rs: Number,
    strikedoffprice: String,
    offer: String,
    atc: String,
    atw: String,
    category: String
})

const abagSchema = new mongoose.Schema({
    username: String,
    bagitems: [bagSchema]
})
const awishSchema = new mongoose.Schema({
    username: String,
    bagitems: [bagSchema]
})

userSchema.plugin(passportLocalMongoose)


const User = mongoose.model("User", userSchema);
const Bag = mongoose.model("Bag", bagSchema);
const Abag = mongoose.model("Abag", abagSchema);
const Awish = mongoose.model("Awish", awishSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("index", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/index.html")
    }
})
app.get("/login1", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/")
    }
    else {
        res.sendFile(__dirname + "/html/login1.html")
    }
})
app.get("/signup", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/")
    }
    else {
        res.sendFile(__dirname + "/html/signup.html")
    }
})
app.get("/men", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("men", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/men.html")
    }
})
app.get("/menin", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("menin", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/menin.html")
    }
})
app.get("/women", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("women", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/women.html")
    }
})
app.get("/womenin", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("womenin", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/womenin.html")
    }
})
app.get("/home", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("home", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/home.html")
    }
})
app.get("/homein", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("homein", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/homein.html")
    }
})
app.get("/bagin", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("bag", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/login1.html")
    }
})
app.get("/wishin", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("wishlist", { useremail: useremail })
    }
    else {
        res.sendFile(__dirname + "/html/login1.html")
    }
})
app.get("/auth", function (req, res) {
    if (req.isAuthenticated()) {
        var data = "1";
        res.send(data);
    }
    else {
        res.sendFile(__dirname + "/html/login1.html")
    }
})
app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})
app.post("/register", function (req, res) {
    useremail = req.body.username;
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            })
        }
    })
})

app.post("/login", function (req, res) {
    useremail = req.body.username;
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            })
        }
    })
})

app.post("/addToBag", function (req, res) {
    const bag = new Bag({
        image_url: req.body.image_url,
        brand: req.body.brand,
        para: req.body.para,
        price: req.body.price,
        rs: req.body.rs,
        strikedoffprice: req.body.strikedoffprice,
        offer: req.body.offer,
        atc: req.body.atc,
        atw: req.body.atw,
        category: req.body.category
    })
    Abag.findOne({ username: useremail }).then((foundUser) => {
        if (foundUser) {
            foundUser.bagitems.push(bag);
            foundUser.save();

        }
        else {
            const abag = new Abag({
                username: useremail,
                bagitems: bag
            })
            abag.save();
        }
    })
    // bag.save();
})
app.post("/addToWish", function (req, res) {
    const bag = new Bag({
        image_url: req.body.image_url,
        brand: req.body.brand,
        para: req.body.para,
        price: req.body.price,
        rs: req.body.rs,
        strikedoffprice: req.body.strikedoffprice,
        offer: req.body.offer,
        atc: req.body.atc,
        atw: req.body.atw,
        category: req.body.category
    })
    Awish.findOne({ username: useremail }).then((foundUser) => {
        if (foundUser) {
            foundUser.bagitems.push(bag);
            foundUser.save();

        }
        else {
            const abag = new Awish({
                username: useremail,
                bagitems: bag
            })
            abag.save();
        }
    })
    // bag.save();
})
app.post("/removeBag", function (req, res) {
    // console.log(req.body);
    Abag.findOneAndUpdate(
        { username: useremail },
        {
            $pull: {
                bagitems: {
                    _id: req.body._id
                }
            }

        }
    )
        .then(foundUser => {
            console.log("Successfully deleted");
        })
        .catch(err => {
            console.log(err);
        })

})
app.post("/removeWish", function (req, res) {

    Awish.findOneAndUpdate({ username: useremail }, {
        $pull: {
            bagitems: {
                _id: req.body._id
            }
        }
    }).then((foundUser) => {
        console.log("Successfully deleted");
    }).catch((err) => {
        console.log(err);
    })
})

app.get("/bag", (req, res) => {
    var data = [];
    Abag.findOne({ username: useremail }).then((foundUser) => {
        if (foundUser) {
            for (let i = 0; i < foundUser.bagitems.length; i++) {
                data.push(foundUser.bagitems[i])
            }
            // console.log(data);
            res.send(JSON.stringify(data));
        }

    }).catch((err) => {
        console.log(err);
    })


});
app.get("/wishlist", (req, res) => {
    var data = [];
    Awish.findOne({ username: useremail }).then((foundUser) => {
        if (foundUser) {
            for (let i = 0; i < foundUser.bagitems.length; i++) {
                data.push(foundUser.bagitems[i])
            }

            res.send(JSON.stringify(data));
        }

    }).catch((err) => {
        console.log(err);
    })


});



app.listen(3000, function () {
    console.log("Server running on port 3000");
})
