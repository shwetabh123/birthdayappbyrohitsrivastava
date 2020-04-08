(function(){
"use strict";
angular.module('address',[])

.controller('addressctr', addressBook);


addressBook.$inject =['$http'];

function addressBook($http)
{

    var vm=this;
    vm.Title = "Address book";

    vm.AddressBookInfo = [];
    
    vm.GetAddress = getAddress;
    vm.addAddress=addAddress;
    vm.editAddress=editAddress;

    vm.deleteAddress=deleteAddress;
    
    vm.updateAddress=updateAddress;
    
    getAddress();




    function addAddress()
    {

     $http.post('/getAddress',vm.address).then(

     function(res){
      console.log(res);
      getAddress();
      vm.address='';
     },

     function(err)
     {

        console.log(err);
     });
    }




    function editAddress(id)
    {
    


        $http.get('/getOne/' +id).then
        (
        function(res){
        
            vm.address=res.data;
            getAddress();
        },
        
        function(error){
        
        console.log(err);
        
        }
        

        )
    }




    function deleteAddress(id)
    {
        console.log('deleteAddress');
        console.log(id);

        $http.delete('/getAddress/'+id).then(
            function(res){
                console.log(res);

                getAddress();
                },
           function(err)
     {console.log(err);
     }
       ); 
    }





    function updateAddress(id)
    {
        console.log('updateAddress'+id);

        $http.put('/updateAddress/'+id,  vm.address ).then(
            function(res){
                console.log(res);
                getAddress();

                vm.address='';
                },
           function(err)
     {console.log(err);
     }
       ); 


    }






function getAddress()
{

$http.get('/getAddress').then
(
function(res){

    vm.AddressBookInfo=res.data;
},

function(error){

console.log(err);

}

);

}}
}
)

();