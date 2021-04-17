const router = require("express").Router();

//SHOW LOCATIONS
router.get("/denver", (req, res)=>{
    res.render("city.ejs");
  });

router.get("/austin", (req, res)=>{
    res.render("city.ejs");
});

router.get("/newyork", (req, res)=>{
    res.render("city.ejs");
});
  
//NEW LOCATION
router.get("/denver/new", (req, res)=>{
    res.render("new.ejs");
});

router.get("/austin/new", (req, res)=>{
    res.render("new.ejs");
});

router.get("/newyork/new", (req, res)=>{
    res.render("new.ejs");
});


//DELETE A LOCATION
router.delete("/denver/:id", (req, res)=>{
    res.redirect("city.ejs")
});

router.delete("/austin/:id", (req, res)=>{
    res.redirect("city.ejs")
});

router.delete("/newyork/:id", (req, res)=>{
    res.redirect("city.ejs")
});

//EDIT A LOCATION
router.get("/denver/:id", (req, res)=>{
    res.render("new.ejs")
});

router.get("/austin/:id", (req, res)=>{
    res.render("new.ejs")
});

router.get("/newyork/:id", (req, res)=>{
    res.render("new.ejs")
});

module.exports = router;