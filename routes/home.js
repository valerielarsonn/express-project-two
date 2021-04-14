///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Input");

//CUSTOM MIDDLEWARE FUNCTIONS

// Middleware to check if userId is in sessions and create req.user
const addUserToRequest = async (req, res, next) => {
    if (req.session.userId) {
        req.user = await User.findById(req.session.userId)
        next()
    } else {
        next()
    };
};

// Authorization middleware function to check if user is authorized for route
const isAuthorized = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect("/auth/login")
    }
};

///////////////////////////////
// Router Specific Middleware
////////////////////////////////
router.use(addUserToRequest);

///////////////////////////////
// Router Routes
////////////////////////////////
router.get("/", (req, res) => {
    res.render("home")
});

// Authentication Routes

//SIGNUP ROUTES
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
  });
  
router.post("/auth/signup", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log(req.body)
        await User.create(req.body);
        res.redirect("/auth/login");
    } catch (error) {
        res.json(error)
    }
});
  
//Login ROUTES
router.get("/auth/login", (req, res) => {
    res.render("auth/login")
});

router.post("/auth/login", async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username})
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                req.session.userId = user._id
                res.redirect("/afterlogin")
            } else {
                res.json({ error: "PASSWORDS DON'T MATCH"})
            }
        } else {
            res.json({ error: "USER DOESN'T EXIST"})
        }
    } catch (error) {
        res.json(error)
    }
});
  
//Logout Route
router.get("/auth/logout", (req, res) => {
    req.session.userId = null;
    res.redirect("/")
});

//Route render afterlogin view
router.get("/afterlogin", isAuthorized, async (req, res) => {
    const user= await User.findOne({ username: req.user.username});
    res.render("afterlogin")
});

// // Images create route when form is submitted
// router.post("/images", isAuthorized, async (req, res) => {
//     const user = await User.findOne({ username: req.user.username })
//     user.images.push(req.body)
//     await user.save()
//     res.redirect("/images")
// });



///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router