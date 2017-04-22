'use strict'

var Storage = function(){

};
Storage.prototype.add = function(){
    console.log("add");
}

module.exports={
    Storage: Storage
}