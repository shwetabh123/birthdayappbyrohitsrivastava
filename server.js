var express=require('express');

const multer=require('multer');

const path=require('path');

const fs=require('fs');

var mongoose =require('mongoose');

var mongodb=require('mongodb');



var con1 =require('./connection');

var model =require('./model');

const PORT = process.env.PORT || config.httpPort;

   

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



//app.use(express.static(__dirname+'/public'));


app.use(bodyparser.json());

//app.use(express.static(__dirname+'/uploads'));

app.use(express.static(__dirname));

app.use('/node_modules',express.static(__dirname+'/node_modules'));






app.use(bodyparser.urlencoded({extended:true}))


var storage = multer.diskStorage({
destination:function(req,file,cb){

  //  cb(null,'./uploads/')

    cb(null,'uploads')


    cb(null,'D:/ProtractorTypescriptCucumberworkspace/MeanStack/build/uploads');


//   cb(null, path.join(__dirname+'/uploads/'));

 //cb(null, __dirname);

 //cb(null, path.join(__dirname, '../uploads/'))

},
filename:function(req,file,cb){


   //cb(null,file.fieldname + '-'+ Date.now()+  path.extname(file.originalname));

   // cb(null, Date.now() + file.originalname);

  //  cb(null, new Date().toISOString() + file.originalname);

  cb(null, Date.now() + file.originalname)
    
  //cb(null,file.originalname);
    
}


})




var upload=multer({

    storage:storage
})

//configuring mongodb
const MongoClient=mongodb.MongoClient;
const con='mongodb+srv://test:test@image-kvpmm.mongodb.net/test/image';



MongoClient.connect(con,{
    useUnifiedTopology:true, useNewUrlParser :true


},(err,client)=>{

    if(err) return console.log(err);

    db=client.db('test');
    
    app.listen(PORT, function(){


        console.log('server running on port:'+PORT);
  
    })


})



app.get('/',(req,res )=>{

//res.sendFile(__dirname+ '/public/index.html');


res.sendFile(__dirname+ '/index.html');

})







app.post("/uploadphoto",  upload.single('myImage'),  (req,res)=>{

const file =req.file;


//var img=fs.readFileSync(req.file.path);

console.log(req.file);

//const absolutePath = path.join('./uploads/', req.file.path);

// const absolutePath = path.join( req.file.path);


// const img = fs.readFileSync(absolutePath, "utf-8");

var img=fs.readFileSync(req.file.path);

var encode_image=img.toString('base64');

var finalImg={

    contentType:req.file.mimetype,
    path:req.file.path,
    image:new Buffer(encode_image,'base64')

};

//insert image to database
db.collection('image').insertone(finalImg,(err,result)=>{

    console.log(result);
    if(err)
  return console.log(err);
  console.log("saved to db");

  res.contentType(finalImg.contentType);


  res.send(finalImg.image);


})

})










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

  // const PORT = process.env.PORT || config.httpPort;

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