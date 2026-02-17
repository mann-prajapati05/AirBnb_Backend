// Core Module
require('dotenv').config();
const path = require('path');

// External Module
const express = require('express');
const { default: mongoose } = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const multer=require('multer');


const DBpath=process.env.MONGO_STR;

//Local Module
const authRouter = require("./routes/authRouter");
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const randomString=(length)=>{
  const characters='abcdefghijklmnopqrstuvwxyz';
  let result='';
  for(let i=0; i<length; i++){
    result+=characters.charAt(Math.floor(Math.random()*characters.length));
  }
  return result;
}

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },
  filename:(req,file,cb)=>{
    cb(null,randomString(10)+'-'+file.originalname);
  },
});

const fileFilter=(req,file,cb)=>{
  if(['image/jpeg' ,'image/jpg' ,'image/png'].includes(file.mimetype)){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
};

const multerOptions={
  storage , fileFilter
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')));
app.use('/uploads',express.static(path.join(rootDir, 'uploads')));
app.use('/host/uploads',express.static(path.join(rootDir, 'uploads')));
app.use(multer(multerOptions).single('photo')); 

const store=new MongoStore({
  uri:DBpath,
  collection:'sessions',
})

app.use(session({
  secret:"this is airBnb",
  resave:false,
  saveUninitialized:true,
  store,
}))

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(authRouter);
app.use(storeRouter);

app.use('/host', (req, res, next) => {
  if(!req.isLoggedIn){
    return res.redirect('/login');
  }
  next();
});

app.use("/host", hostRouter);

app.use(errorsController.pageNotFound);

const PORT = 3030;

mongoose.connect(DBpath).then(() => {
  console.log("connected to mongo..");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log("error while connecting mongo..", err);
});
