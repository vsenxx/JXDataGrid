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



///<jscompress sourcefile="jx.datagrid.item.js" />
jx.DataGrid_Item = jx.Base.extend({
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
			var btn = $("<button class='btn '></button>").text(this._itemData.title);
			if( this.isEmpty(this._itemData.classname)){
				btn.addClass('btn-default');
			}else{
				btn.addClass(this._itemData.classname);
			}
			this._selfElement.append( btn );
			
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
	jump:function(){
		var __self = this;
		var curUrl = __self._itemData.url;
		if( curUrl.indexOf("?") < 0 ){
			curUrl+='?';
		}
		curUrl+= $.param(__self._itemData.params || {});
		if( __self._itemData.target == "_blank" ){
			window.open( curUrl );
		}else{
			window.location.href = curUrl;
		}
	},
	sendData:function(){
		var __self = this;
		$.ajax({
				type:__self._itemData.ajax.method || "post",
		        url: __self._itemData.url ,  
		        dataType:'json',
		        data:__self._itemData.params||{},
		        xhrFields: {
			      withCredentials: true
			    },
//		        jsonp:'callback',
		        success:function(result){
		        	if(__self._itemData.ajax.callback){
		        		__self._itemData.ajax.callback.apply( __self._selfElement.find(">button")[0] ,  [result]);
		        	}
		        }
		});	
		
	},
	renderAfter:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var __self = this;
		if( !this.isEmpty(this._itemData.element) ){return ;}
		if( !this.isEmpty(this._itemData.callback) ){
			this._selfElement.find(">button").eq(0).on('click', this._itemData.callback );
		}else{

			this._selfElement.find(">button").eq(0).on('click', function(){
				
						if( __self.isEmpty( __self._itemData.url ) ){return false;}
		
						if(__self.isEmpty( __self._itemData.message ) ){
							 __self.isEmpty( __self._itemData.ajax ) ? __self.jump() :  __self.sendData() ;
						}else{
							if( confirm( __self._itemData.message ) ){
								__self.isEmpty( __self._itemData.ajax ) ? __self.jump() :  __self.sendData() ;
							}else{
								return false;
							}
						}
					return false;
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
					var item = new jx.DataGrid_Item( {data:this._toolBarItemsDatas[x]} );
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
		
	},
	renderAfter:function(){
		for(var x in this._toolItems){
			this._selfElement.find('.jx-DataGrid-tollbar-station').append( this._toolItems[x].renderAfter() );
		}
	}
	
});
///<jscompress sourcefile="jx.datagrid.js" />

jx.DataGrid = jx.Base.extend({
	_title:"",
	_selfElement:null,
	_element:null,
	_toolBar:null,
	init:function(options){
		this._element = {};
		this._title  = options.title || '';
		this._element.parent = options.parent || null;
		this._selfElement = $('<div class="panel panel-default jx-DataGrid-box"><div class="panel-heading"></div><div class="panel-body"></div></div>');
		this._toolBar = new jx.DataGrid_Toolbar({parent:this,ItemsDatas:options.toolBar});
		this._table = new jx.DataGrid_Table( options );
		this.render();

	},
	render:function(){
		this.clear();
		this._selfElement.find(">.panel-heading").text(this._title);
		this._selfElement.find('>.panel-body').eq(0).append( this._toolBar.render() );
		this._selfElement.find('>.panel-body').eq(0).append( this._table.render() );
		this._element.parent.append( this._selfElement );
		this.renderAfter();
	},
	search:function(){
		this._table.search();
	},
	clear:function(){
		this._selfElement.find(">.panel-heading").empty();
		this._selfElement.find('>.panel-body').empty();
	},
	renderAfter:function(){
		this._toolBar.renderAfter();
		this._table.renderAfter();
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

///<jscompress sourcefile="jx.datagrid.filter.js" />
jx.DataGrid_Filter = jx.Base.extend({
	_filterData:null,
	_key:null,
	_selfElement:null,
	init:function(options){
		var __self = this;
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
		}else if(this._filterData instanceof HTMLElement ){
				this._selfElement = this._filterData ;
		}else if($.type( this._filterData ) == "object" && $.isPlainObject(this._filterData ) ){
			if(this._filterData.filtername == 'select'){
				this._selfElement = $('<select class="form-control" >').attr("name", this._key  );
				for(var x in this._filterData.options){
					this._selfElement.append($('<option></option>').text( this._filterData.options[x].text ).val(this._filterData.options[x].value));				
				}
			}else if(this._filterData.filtername == 'daterangepicker' || this._filterData.filtername == 'datepicker' ){
				this._selfElement = $('<input class="form-control" >').attr("name", this._key  );
				if(!$.fn.daterangepicker){return this;}
				var optionSet2 = {
						opens: 'left',
						format: 'YYYY-MM-DD',
						singleDatePicker: this._filterData.filtername == 'datepicker' ? true : false,
						locale :{
							"applyLabel": "确定",
							"cancelLabel": "取消",
							"fromLabel": "起始时间",
							"toLabel": "结束时间'",
							"weekLabel": "W",
							"daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
							"monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
							"firstDay": 1
						}
				};
				$(this._selfElement).daterangepicker(optionSet2);
			}else if(this._filterData.filtername == 'searchselect'){
			
					this._selfElement = $('<select class="form-control" style="width:100%;"></select>').attr("name", this._key  );
					
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
	renderAfter:function(){
		if( !this.isEmpty(this._filterData.filtername) ){
			if( this._filterData.filtername == 'searchselect' ){
				if(!$.fn.select2){return this;}
				    this._selfElement.select2({
						ajax:{
							url:this._filterData.url,
							type:this._filterData.method||"post",
							cache: true,
							dataType:"json",
//							data: function (params) {
//						          return {
//						            name: params.term, // search term
//						            page: params.page
//						          };
//				        	},
//				        	processResults: function (data) {
//				        		console.log(data);
//				        		 return {
//							        results: data
//							      };
//				        	},
				        	delay: 200
						}});
			}
			
			
		}
	},
	clear:function(){
		
		
		
		
	}
	
	
	
	
	
	
	
	
});

///<jscompress sourcefile="jx.datagrid.table.js" />
jx.DataGrid_Table = jx.Base.extend({
	_thead:null,
	_tbody:null,
	_custompanel:null,
	_actions:null,
	_url:null,
	_params:null,
	_method:null,
	init:function(options){
		this._url = options.url || null,
		this._params = options.params || null,
		this._method = options.method || null,
		this._selfElement = $('<table class="table table-bordered table-hover"></table>');
		this._custompanel = options.custompanel || null;
		this._actions = options.actions || null;
		this.initThead(options);
		this.initTbody(options);

	
	},
	initThead:function(options){
		this._thead = {
			Element:$('<thead><tr></tr></thead>'),
			datas:options.thead || null ,
			theads:[],
		};
		if( this.isEmpty( this._thead.datas ) ){return false;}

		this._thead.theads.push({element:$('<td style="width:2%">#</td>')});
		if( !this.isEmpty(this._custompanel) && $.type(this._custompanel) == 'function'){
			this._thead.theads.push({element:$('<td style="width:2%"><i class="glyphicon glyphicon-triangle-right custompanel-launcher"></i></td>')});
		}
		for(var x in this._thead.datas ){
			var data = this._thead.datas[x];
			var td = $('<td><div class="form-group"><label for="">标题</label></div></td>');
			td.attr( 'key', data.key);
			if(data.primary === true || data.primary =="true"){
				td.attr( 'primary', true );
			}
			if( !this.isEmpty( data.width) ){ td.css({width:data.width}); }
			td.find("label").text( data.title );
			var filter = new jx.DataGrid_Filter( { key:data.key , data : data.filter } );
			this._thead.theads.push({'element':td,'filter':filter});
		}
		if(!this.isEmpty(this._actions)){
			this._thead.theads.push({'element':$('<td><div class="form-group"><label for="">操作</label></div></td>')});
		}


	},
	initTbody:function(options){
		this._tbody = {
			Element: $('<tbody></tbody>'),
			datas:options.datas || null ,
		};
	
	},
	renderThead:function(){
		
		for(var x in this._thead.theads ){
			if(this._thead.theads[x].filter){
				this._thead.theads[x].element.find(">.form-group").eq(0).append(this._thead.theads[x].filter.render());
			}
			this._thead.Element.find('tr').eq(0).append(this._thead.theads[x].element);
		}
	
	},
	search:function(){
		var __self = this;
		this.clearTbody();
		var params = {};
		
		for(var x in  this._thead.theads){
			var item = this._thead.theads[x].element.find(">.form-group>input,>.form-group>select").eq(0);
			if(item.length <=0){
				continue;
			}
			if( this.isEmpty( item.val() )){
				continue;
			}
			params[item.attr('name')] = item.val();
		}
		console.log(params);
		
		
			$.ajax({
				type:__self._method || "post",
		        url: __self._url ,  
		        dataType:'json',
//		        async: false,
		        data:__self.params||{},
		        xhrFields: {
			      withCredentials: true
			    },
//		        jsonp:'callback',
		        success:function(result){
					__self._tbody.datas = result;
					setTimeout(function(){
						__self.renderTbody();
					},100);
		        }
			});
	},
	renderTbody:function(){
		var __self = this;
		if(this.isEmpty( this._tbody.datas ) && this.isEmpty( this._thead.datas )){return false;}
		if(this.isEmpty( this._tbody.datas) && this.isEmpty( this._url ) ){ return false; }

		if(this.isEmpty( this._tbody.datas)){ this.search(); return false;}
		
		for(var i = 0; i < this._tbody.datas.length; i++ ){
			var data = this._tbody.datas[i];
			var tr = $('<tr><td>'+(i+1)+'</td></tr>');
			if( !this.isEmpty(this._custompanel) && $.type(this._custompanel) == 'function'){
				tr.append($('<td><i class="glyphicon glyphicon-triangle-right custompanel-launcher"></i></td>'));
			}
			var primary = {};
			for(var x in this._thead.datas ){
				var key = this._thead.datas[x].key;
				var td = $('<td>' + data[ key ] + '</td>' );
				td.attr("key",key);
				if(this._thead.datas[x].primary === true || this._thead.datas[x].primary == "true"){
					primary[key] = data[ key ];
					td.attr( 'primary', true );
				}
				tr.append( td );
			}
			if(!this.isEmpty(this._actions)){
				var actionTd = $('<td></td>');	
				for(var x in this._actions){
					this._actions[x].params = $.extend(true, this._actions[x].params|| {} , primary);
					var item = new jx.DataGrid_Item( {data:this._actions[x]} );
					actionTd.append(item.render());
					item.bindEvent();
				}
				tr.append(actionTd);
			}
			
			
			
			this._tbody.Element.append(tr);
					
			if( !this.isEmpty(this._custompanel) && $.type(this._custompanel) == 'function'){
				var customTr = $("<tr style='display: none;' class='custompanel'></tr>");
				customTr.append(this._custompanel( this._thead.datas , data ));
				this._tbody.Element.append(customTr);
			}
		}
		this.bindEvent();
	},
	render:function(parentNode){
		this.clear();
		
		this.renderThead();
		this._selfElement.append( this._thead.Element  );
		this.renderTbody();
		this._selfElement.append( this._tbody.Element  );
		
		if(!this.isEmpty(parentNode) ){
			$(parentNode).append( this._selfElement );
		}else{
			return this._selfElement ;
		}
	},
	bindEvent:function(){
		var __self = this;
		this._tbody.Element.find('.custompanel-launcher').on('click',function(){
			//点击展开
			if($(this).hasClass('glyphicon-triangle-right')){
				__self._tbody.Element.find('.custompanel:visible').hide();
				__self._tbody.Element.find('.custompanel-launcher').
				removeClass("glyphicon-triangle-bottom").addClass('glyphicon-triangle-right');
				$(this).removeClass("glyphicon-triangle-right").addClass('glyphicon-triangle-bottom');
				$(this).closest('tr').next().show(500);
			}else{
				__self._tbody.Element.find('.custompanel:visible').hide();
				__self._tbody.Element.find('.custompanel-launcher').
				removeClass("glyphicon-triangle-bottom").addClass('glyphicon-triangle-right');
				
			}



		});
	},
	clear:function(){
		this.clearTbody();	
	},
	clearTbody:function(){
		this._tbody.Element.empty(); 
	},
	renderAfter:function(){
		for(var x in this._thead.theads ){
				if(this._thead.theads[x].filter){
					this._thead.theads[x].filter.renderAfter();
				}
		}
	}
	
	
	
	
	
	
	
	
	
});

