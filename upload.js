const mongoose = require('mongoose');


//mongoose.connect('mongodb://localhost:27017/employee', {useNewUrlParser: true});


mongoose.connect("mongodb+srv://test:test@address-kvpmm.mongodb.net/test?retryWrites=true&w=majority",
{useUnifiedTopology:true, useNewUrlParser :true },()=> console.log("connected to db"));

var conn =mongoose.Collection;

var uploadSchema =new mongoose.Schema({
	imagename: String,

});

var uploadModel = mongoose.model('uploadimage', uploadSchema);
module.exports=uploadModel;