///<jscompress sourcefile="jx.Class.js" />
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



///<jscompress sourcefile="jx.datagrid.toolbar.item.js" />
jx.DataGrid_Toolbar_Item = jx.Base.extend({
	_parent:null,
	_itemData:null,
	_selfElement:null,
	init:function(options){
		this._itemData =  options.data || null;
		this._selfElement = $("<div class='btn-group'></div>");
	},
	render:function( parentNode ){
		this.clear();
		if( this.isEmpty(this._itemData.element) ){
			var btn = $("<button class='btn btn-success'></button>").text(this._itemData.title);//.attr({'url':itemData.url,"message":itemData.message,"target":itemData.target});
			this._selfElement.append( btn );
			this.bindEvent();
		}else{
		   this._selfElement.append( this._itemData.element );
		}
		if(!this.isEmpty(parentNode) ){
			$(parentNode).append( this._selfElement );
		}else{
			return this._selfElement ;
		}
		
	},
	clear:function(){
		this._selfElement.empty();
	},
	jump:function(url,target){
		if( target == "_blank" ){
			window.open(url);
		}else{
			window.location.href = url;
		}
	},
	bindEvent:function(){
		var __self = this;
		if( !this.isEmpty(this._itemData.callback) ){
			this._selfElement.find(">button").eq(0).on('click', this._itemData.callback );
		}else{

			this._selfElement.find(">button").eq(0).on('click', function(){
					if( __self.isEmpty( __self._itemData.url ) ){return false;}
	
					if(!__self.isEmpty( __self._itemData.message ) ){
						if( confirm( __self._itemData.message ) ){
								__self.jump(__self._itemData.url,__self._itemData.target);
						}else{
							return false;
						}
					}else{
						__self.jump(__self._itemData.url,__self._itemData.target);
					}
			});
		}
	}
});
///<jscompress sourcefile="jx.datagrid.toolbar.js" />
jx.DataGrid_Toolbar = jx.Base.extend({
	_parent:null,
	_selfElement:null,
	_toolBarItemsDatas:null,
	_toolItems:null,
	init:function(options){
		this._parent =  options.parent || null;
		this._toolBarItemsDatas =  options.ItemsDatas || null;
		this._selfElement = $("<div class='jx-DataGrid-tollbar'><div class='jx-DataGrid-tollbar-station'></div></div>");
		this.initItem();
	},
	initItem:function(){
		if(!this.isEmpty( this._toolBarItemsDatas ) ){
			this._toolItems = [];
			for(var x in this._toolBarItemsDatas){
					var item = new jx.DataGrid_Toolbar_Item( {data:this._toolBarItemsDatas[x]} );
					this._toolItems.push(item);
			}
		}

	},
	render:function(parentNode){
		//如果传了父级节点则添加到节点,否则返回JQ对象
		this.clear();
		for(var x in this._toolItems){
			this._selfElement.find('.jx-DataGrid-tollbar-station').append( this._toolItems[x].render() );
		}
		if(!this.isEmpty( parentNode) ){
			$(parentNode).append(this._selfElement);
		}else{
			return this._selfElement;
		}
	},
	clear:function(){
		this._selfElement.find('.jx-DataGrid-tollbar-station').empty();
		
	}
	
});
///<jscompress sourcefile="jx.datagrid.js" />

jx.DataGrid = jx.Base.extend({
	title:"",
	_selfElement:null,
	_element:null,
	toolBarItems:null,
	_toolBar:null,
	init:function(options){
		this._element = {};
		this.title  = options.title || '';
		this._element.parent = options.parent || null;
		this._selfElement = $('<div class="panel panel-default jx-DataGrid-box"><div class="panel-heading"></div><div class="panel-body"></div></div>');
		this._toolBar = new jx.DataGrid_Toolbar({parent:this,ItemsDatas:options.toolBar});
		this._table = new jx.DataGrid_Table({thead:options.thead});
		this.render();

	},
	render:function(){
		this.clear();
		this._selfElement.find(">.panel-heading").text(this.title);
		this._selfElement.find('>.panel-body').eq(0).append( this._toolBar.render() );
		this._selfElement.find('>.panel-body').eq(0).append( this._table.render() );
		
		
		this._element.parent.append( this._selfElement );
	},
	clear:function(){
		this._selfElement.find(">.panel-heading").empty();
		this._selfElement.find('>.panel-body').empty();
	}

});














//	$.fn.extend({
//		uddValidate:function(options){
//			var __self = $(this);
//			if(typeof options == 'object' || !options){
//					var options = options || {};
//					var settings = $.extend({}, defaultSettings , options);
//					options = settings;
//			}
//			var flag = true;
//			__self.each(function(){
//				if($(this).is('form')){
//					var res = ergodicForm.apply(this,[options]);
//					if(flag && false == res){
//						flag = false;
//					}
//				}else if($(this).is('select') || $(this).is('input') || $(this).is('textarea')){
//					var res = ergodicElement.apply(this,[options]);
//					if(flag && false == res){
//						flag = false;
//					}
//				}
//			});
//			return flag ? this : false;
//		},
//		
//	});
//	

///<jscompress sourcefile="jx.datagrid.table.thead.filter.js" />
jx.DataGrid_Table_Thead_Filter = jx.Base.extend({
	_filterData:null,
	_key:null,
	init:function(options){
		this._filterData =  options.data || null;
		this._key =  options.key || null;
//		this._selfElement = $('<thead><tr></tr></thead>');
		if( this.isEmpty( this._filterData  ) ){return this;}
		
		
		if( $.type( this._filterData ) == "string" ){
			if(this._filterData == 'text'){
				this._selfElement = $('<input class="form-control" >').attr("name", this._key  );
			}
		}else if(this._filterData instanceof jQuery){
				this._selfElement = this._filterData ;
		}else if(this._filterData instanceof HTMLElemen){
				this._selfElement = this._filterData ;
		}else if($.type( this._filterData ) == "object" && $.isPlainObject(this._filterData ) ){
			if(this._filterData.classname == 'select'){
				
				
			}else if(this._filterData.classname == 'daterangepicker'){
				
				
			}else if(this._filterData.classname == 'datepicker'){
				
				
			}else if(this._filterData.classname == 'searchselect'){
				
				
				
			}
			
			
		}

		
		
		
		
	},
	render:function(parentNode){
		this.clear();
			
		if(!this.isEmpty(parentNode) ){
			$(parentNode).append( this._selfElement );
		}else{
			return this._selfElement ;
		}
		
		
		
		
		
		
		
		
		
		
		
	},
	clear:function(){
		
		
		
		
	}
	
	
	
	
	
	
	
	
});

///<jscompress sourcefile="jx.datagrid.table.thead.js" />
jx.DataGrid_Table_Thead = jx.Base.extend({
	_theadData:null,
	init:function(options){
		this._theadDatas =  options.data || null;
		this._selfElement = $('<thead><tr></tr></thead>');
	},
	render:function(parentNode){
		this.clear();
		
		this._selfElement.find('tr').eq(0).append('<td style="width:2%">#</td>');
		if( !this.isEmpty(this._theadDatas) ){
			
			for(var x in this._theadDatas){
				var head = $('<td><div class="form-group"><label for="">标题</label></div></td>');
				head.attr('key',this._theadDatas[x].key);
				if( !this.isEmpty(this._theadDatas[x].width) ){
					head.css({width:this._theadDatas[x].width});
				}
				head.find("label").text(this._theadDatas[x].title);
				
				var filter = new DataGrid_Table_Thead_Filter({key:this._theadDatas[x],key , data:this._theadDatas[x].filter} );
				
				
				this._selfElement.find('tr').eq(0).append(head);
			}
		}
		
		
		if(!this.isEmpty(parentNode) ){
			$(parentNode).append( this._selfElement );
		}else{
			return this._selfElement ;
		}
	},
	clear:function(){
		
		
		
		
	}
	
	
	
	
	
	
	
	
});

///<jscompress sourcefile="jx.datagrid.table.js" />
jx.DataGrid_Table = jx.Base.extend({
	_thead:null,
	init:function(options){
		this._itemData =  options.data || null;
		this._selfElement = $('<table class="table table-bordered table-hover"></table>');
		this._thead = new jx.DataGrid_Table_Thead({data:options.thead});
	
	},
	render:function(parentNode){
		this.clear();
		this._selfElement.append( this._thead.render() );
		if(!this.isEmpty(parentNode) ){
			$(parentNode).append( this._selfElement );
		}else{
			return this._selfElement ;
		}
	},
	clear:function(){
		
		
		
		
	}
	
	
	
	
	
	
	
	
});

