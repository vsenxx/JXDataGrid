// JavaScript Document
//Simple JavaScript Inheritance  可以继承的class 封装方法

var jx = jx||{};
jx.Class = function(){};
(function(){  
  var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;  
  
  // The base Class implementation (does nothing)  
  //this.Class = function(){};  

  // Create a new Class that inherits from this class  
  jx.Class.extend = function(prop) {  
    var _super = this.prototype;  
     
    // Instantiate a base class (but only create the instance,  
    // don't run the init constructor)  
    initializing = true;  
    var prototype = new this();  
    initializing = false;  
     
    // Copy the properties over onto the new prototype  
    for (var name in prop) {  
      // Check if we're overwriting an existing function  
      prototype[name] = typeof prop[name] == "function" &&  
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?  
        (function(name, fn){  
          return function() {  
            var tmp = this._super;  
             
            // Add a new ._super() method that is the same method  
            // but on the super-class  
            this._super = _super[name];  
             
            // The method only need to be bound temporarily, so we  
            // remove it when we're done executing  
            var ret = fn.apply(this, arguments);         
            this._super = tmp;  
             
            return ret;  
          };  
        })(name, prop[name]) :  
        prop[name];  
    }  
     
    // The dummy class constructor  
    function jx_Class() {  
      // All construction is actually done in the init method  
      if ( !initializing && this.init )  
        this.init.apply(this, arguments);  
    }  
     
    // Populate our constructed prototype object  
    jx_Class.prototype = prototype;  
     
    // Enforce the constructor to be what we expect  
    jx_Class.prototype.constructor = jx_Class;  
  
    // And make this class extendable  
    jx_Class.extend = arguments.callee;  
     
    return jx_Class;  
  }
 jx.Base = jx.Class.extend({
		 	isEmpty:function(data){
				 if(data == 'undefined' || data == undefined || data == null){
				 	return true;
				 }else if( $.type(data) == 'string'){
				 	 return !( data && data != '' && data != undefined && data != null && data.length > 0);
				 }else if( $.type(data) == 'array' ){
				 	return !( data &&  data != undefined && data != null && data.length > 0);
				 }else if( $.type(data) == 'object'){
				 	return $.isEmptyObject(data);
				 }else if( $.type(data) == 'function'){
				 	return false;
				 }
				return true;
			}
	});
})();


