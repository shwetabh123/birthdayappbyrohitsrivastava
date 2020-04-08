var express=require('express');

const multer=require('multer');

const path=require('path');


var mongoose =require('mongoose');

var con =require('./connection');

var model =require('./model');


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



app.use(express.static(__dirname+'/public'));


app.use(bodyparser.json());

app.use(express.static(__dirname+'/public'));




app.use('/node_modules',express.static(__dirname+'/node_modules'));






app.get('/',(req,res )=>{

res.send(__dirname+ '/index.html');

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