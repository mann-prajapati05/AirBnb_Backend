const Home=require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes)=>{
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb Home",
      currentPage: "index",
      isLoggedIn:req.isLoggedIn,
      user:req.session.user,
    })
  })
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes)=>{
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
      isLoggedIn:req.isLoggedIn,
      user:req.session.user,
    })
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn:req.isLoggedIn,
    user:req.session.user,
  })
};

exports.getFavouriteList = async (req, res, next) => {
  const userId=req.session.user._id;
  const user=await User.findById(userId);
  user.populate('favourites')
  .then(()=>{
    res.render("store/favourite-list", {
         favourites: user.favourites,
         pageTitle: "My Favourites",
         currentPage: "favourites",
         isLoggedIn:req.isLoggedIn,
         user:req.session.user,
       });
  });
};

exports.getHomesDetails=(req,res,next)=>{
  const homeId=req.params.homeId;
  Home.findById(homeId).then((myHome)=>{
    if(!myHome){
      console.log("Home Not Found with id",homeId);
      res.redirect('/homes');
    }
    else{
      console.log(myHome);
      res.render("store/home-detail",{
        home:myHome,
        pageTitle: "Home Details",
        currentPage: "Home",
        isLoggedIn:req.isLoggedIn,
        user:req.session.user,
      });
    }
  });
};

exports.postAddToFavourite=async (req,res,next)=>{
  const homeId=req.body.homeId;
  const userId=req.session.user._id;
  const user=await User.findById(userId);
  
  if(!user.favourites.includes(homeId)){
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect('/favourites');
};

exports.postDeleteFavourite=async(req,res,next)=>{
  const favId=req.params.favId;
  const userId=req.session.user._id;
  const user=await User.findById(userId);

  if(user.favourites.includes(favId)){
    user.favourites=user.favourites.filter(fav=> fav!=favId);
    await user.save();
  }
  res.redirect('/favourites');
};