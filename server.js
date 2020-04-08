var express=require('express');

const multer=require('multer');

const path=require('path');


var mongoose =require('mongoose');

var con =require('./connection');

var model =require('./model');


var uploadModel =require('./upload');


var bodyparser =require('body-parser');

// const dotenv=require("dotenv");

var Add =mongoose.model ('add',model,'address');

// dotenv.config();

// mongoose.connect(con.connectionString,()=> console.log("connected to db"));

// mongodb+srv://test:<password>@address-kvpmm.mongodb.net/test?retryWrites=true&w=majority


// mongoose.connect(process.env.DB_CONNECT,
// {useUnifiedTopology:true, useNewUrlParser :true },()=> console.log("connected to db"));



 
 mongoose.connect("mongodb+srv://test:test@address-kvpmm.mongodb.net/test?retryWrites=true&w=majority",
 {useUnifiedTopology:true, useNewUrlParser :true },()=> console.log("connected to db"));


var app =express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs')

var router = express.Router();

router.use(express.static(__dirname+'/public'));




app.use(express.static(__dirname+'/public'));


app.use(bodyparser.json());

app.use(express.static(__dirname+'/public'));

app.use('/node_modules',express.static(__dirname+'/node_modules'));








if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

  var Storage= multer.diskStorage({
    destination:"./public/uploads",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  
  var upload = multer({
    storage:Storage
  }).single('file');
  





/* GET home page. */
router.post('/upload', upload,function(req, res, next) {
    var imageFile=req.file.filename;

   var success =req.file.filename+ " uploaded successfully";
  
   var imageDetails= new uploadModel({
    imagename:imageFile
   });
   imageDetails.save(function(err,doc){
  if(err) throw err;
  
  imageData.exec(function(err,data){
  if(err) throw err;
  res.render('upload-file', { title: 'Upload File', records:data,   success:success });
  });
  
   });
  
    });






    router.get('/upload',function(req, res, next) {

        
        imageData.exec(function(err,data){
          if(err) throw err;
      res.render('upload-file', { title: 'Upload File', records:data, success:'' });
        });
      });















app.get('/getAddress',function(req,res ){

    Add.find(function(err,docs){

        if(err)

        {

            console.log(err);
        }

        res.json(docs);  

    })


});

app.get('/getOne/:id',function(req,res){

    var id=req.params.id;

    console.log(req.params.id);

    Add.findOne({ '_id':mongoose.Types.ObjectId(id)  },function(err,docs){

        if(err)

    
       return console.error(err);
        

        res.json(docs);  

    });
});






















app.put('/updateAddress/:id',function(req,res){

    var id=req.params.id;
    console.log(req.params.id);

  var conditions={ '_id':mongoose.Types.ObjectId(id)  };

  var update={'$set' : req.body };
  var options={'new':true};

    Add.findOneAndUpdate(conditions,update,options,function(err,docs){

        if(err)
      return console.error(err);
    
        res.json(docs);  

    });
});













app.delete('/getAddress/:id',function(req,res)
{
    var id=req.params.id;
    console.log(req.params.id);

    Add.remove({'_id':mongoose.Types.ObjectId  (id)},   function(err,docs){
        if(err)

        {

            console.log(err);
        }

        res.json(docs);  
    })
});






app.post('/getAddress',function(req,res ){

console.log(req.body);

    var addAddress = new Add(
       
        req.body
    );
    addAddress.save(function(err){
        if(err)

        {

            console.log(err);
        }

        res.json(addAddress);  

    });


});



//ON HEROKU

  const PORT = process.env.PORT || config.httpPort;

   app.listen(PORT, function(){


      console.log('server running on port:'+PORT);

  });




//  //ON LOCALHOST
//  var port=8094;
//   app.listen(port,function(){


//       console.log('server running on port:'+port);

//  });



//  var port=8094;

//  app.listen(process.env.PORT || 5000,function(){


//      console.log('server running on port:'+port);

//  });

//  app.listen(process.env.PORT || 3000, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });