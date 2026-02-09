const {check, validationResult}=require('express-validator');
const User = require('../models/user');
const bcrypt=require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login',{
    pageTitle:"Login",
    currentPage: "login",
    isLoggedIn:false,
    errors:[],
    oldInput:{email:""},
    user:{},
  });
};

exports.postLogin = async(req, res, next) => {
    const {email,password}=req.body;

    const user=await User.findOne({email:email});
    if(!user){
      return res.status(422).render('auth/login',{
        pageTitle:"Login",
        currentPage: "login",
        isLoggedIn:false,
        errors:["User doesn't exist !! "],
        oldInput:{email},
        user:{},
      });
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(422).render('auth/login',{
        pageTitle:"Login",
        currentPage: "login",
        isLoggedIn:false,
        errors:["Invalid Password !!"],
        oldInput:{email},
        user:{},
    });
  }
  req.session.isLoggedIn=true;
  //req.session.user=user;
  req.session.user = {
  _id: user._id.toString(),
  email: user.email,
  userType: user.userType
};

  console.log("we are going to be logged In with user ,",req.session.isLoggedIn,user);
  await req.session.save();
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    // res.cookie("isLoggedIn",false);
    req.session.destroy(()=>{
      res.redirect('/login');
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup',{
      pageTitle:"Sign Up",
      currentPage: "signup",
      isLoggedIn:false,
      errors: [],
      oldInput: {firstname:"",lastname:"",email:"",password:"",userType:""},
      user:{},
    });
};

exports.postSignup = [
  check('firstname')
  .trim()
  .isLength({min:2})
  .withMessage("First name should be 2 char long..")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("First Name should contain only alphabets..") ,
  
  check('lastname')
  .matches(/^[A-Za-z\s]*$/)
  .withMessage("First Name should contain only alphabets..") ,

  check('email')
  .isEmail()
  .withMessage('please enter a valid email..')
  .normalizeEmail() ,

  check('password')
  .isLength({min:8})
  .withMessage("Password should be atleat 8 characters long")
  .matches(/[a-z]/)
  .withMessage('Password should be atleat one lowercase letter')
  .matches(/[A-Z]/)
  .withMessage('Password should be atleat one uppercase letter')
  .matches(/[0-9]/)
  .withMessage('Password should be atleat one Number')
  .matches(/[!@#$%^&*()_<> ]/)
  .withMessage('Password should be atleat one special character')
  .trim() ,

  check('confirmPassword')
  .trim()
  .custom((value,{req})=>{
    if(value!==req.body.password){
      throw new Error("Password do not match");
    }
    return true;
  }) ,

  check('userType')
  .notEmpty()
  .withMessage("User type is required..")
  .isIn(['guest','host'])
  .withMessage('Invalid User type..'),

  check('terms')
  .notEmpty()
  .withMessage("Please accept the Terms & conditions ..")
  .custom((value,{req})=>{
    if(value !== "on"){
      throw new Error("Please accept the Terms & conditions ..")
    }
    return true;
  }),

  (req, res, next) => {
    const {firstname ,lastname , email , password ,userType } =req.body;
    const errors=validationResult(req);

    if(!errors.isEmpty()){
      return res.status(422).render("auth/signup",{
        pageTitle:"Sign up",
        currentPage: "signup",
        isLoggedIn:false,
        errors: errors.array().map(err=>err.msg),
        oldInput: {firstname,lastname,email,password,userType},
        user:{},
      })
    }
    
    
    bcrypt.hash(password,12).then((hashedOne)=>{
      const user=new User({firstName:firstname,lastName:lastname,email,password:hashedOne,userType});
      return user.save();
    }).then(()=>{
      res.redirect('/login');
    }).catch((err)=>{
      return res.status(422).render("auth/signup",{
        pageTitle:"Sign up",
        currentPage: "signup",
        isLoggedIn:false,
        errors: [err.message],
        oldInput: {firstname,lastname,email,password,userType},
        user:{},
      })
    })
}]
