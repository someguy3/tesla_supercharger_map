//my/shirt.js now does setup work
//before returning its module definition.
define([ 'model/Address', 'model/Range'], function () {
    //Do setup work here



    alert("go");
    return {
        color: "black",
        size: "unisize"
    }


});