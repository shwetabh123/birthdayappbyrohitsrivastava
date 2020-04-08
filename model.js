var mongoose =require('mongoose');

module.exports=mongoose.Schema({

    FirstName:String,
        
    LastName:String,
   DOB:Date,
   AnniversayDate:String,
   Address:String,
   Phone:String,
   Email:String

}
    );