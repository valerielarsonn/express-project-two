
///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router();
const User = require("../models/Input");


// Authorization middleware function to check if user is authorized for route
const isAuthorized = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect("/auth/login")
    }
};

//Route render afterlogin view
// router.get("/", isAuthorized, async (req, res) => {
//     const user= await User.findOne({ username: req.user.username});
//     res.render("afterlogin")
// });


//INDEX HOME
router.get("/", (req, res) => {
    if(req.session.userId) {
        res.render("afterlogin")
    } else {
        res.render("home")
    }
});


///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router