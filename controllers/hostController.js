const fs=require('fs');
const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing:false,
    isLoggedIn:req.isLoggedIn,
    user:req.session.user,
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes)=>{
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn:req.isLoggedIn,
      user:req.session.user,
    })
  });
};

exports.postAddHome = (req, res, next) => {
  if(!req.file){
    return res.status(400).send('No valid image provided !!');
  }
  
  const { houseName, price, location, rating, description } = req.body;

  //console.log( houseName, price, location, rating, photo , description );
  console.log(req.file);
  const photo=req.file.path;

  const home = new Home({houseName, price, location, rating, photo,description});
  home.save().then(()=>{
    console.log("Home saved sucessfully !!");
    res.render("host/home-added", {
      pageTitle: "Home Added Successfully",
      currentPage: "homeAdded",
      isLoggedIn:req.isLoggedIn,
      user:req.session.user,
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId=req.params.homeId;
  const editing=req.query.editing==='true';

  Home.findById(homeId).then(Home=>{
    if(!Home){
      console.log("Home not found");
      res.redirect('/host/host-home-list');
    }
    else{
      console.log("i will edit home",homeId,editing,Home);
      res.render("host/edit-home", {
      editing:editing,
      home:Home,
      pageTitle: "Edit Home",
      currentPage: "host-homes",
      isLoggedIn:req.isLoggedIn,
      user:req.session.user,
    });
    }
  });
};

exports.postUpdateHome = (req, res, next) => {
  const HomeId=req.body.homeId;
  const {houseName, price, location, rating ,description} = req.body;
  
  Home.findById(HomeId).then((home)=>{
    if(!home){
      console.log("error while post update home..");
      res.redirect("/host/host-home-list");
    }
    home.houseName=houseName;
    home.price=price;
    home.location=location;
    home.rating=rating;
    home.description=description;
    if(req.file){
      fs.unlink(home.photo,err=>{
        if(err){
          console.log("error while edit the photo - delete in upload..",err);
        }
      });
      home.photo=req.file.path;
    }

    home.save().then(result=>{
      console.log(result);
    }).catch(err=>{
      console.log("error after save in update home..",err);
    });
    res.redirect('/homes');
  }).catch(err=>{
    console.log("error while finding a home..",err);
  });
};

exports.getDeleteHome = (req, res, next) => {
  const HomeId=req.params.homeId;
  Home.findByIdAndDelete(HomeId).then(()=>{
    res.redirect('/homes');
  }).catch(err=>{
    if(err) console.log("while delete the home .." ,err);
  });
};
