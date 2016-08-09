(function($){
jx.DataGrid = jx.Class.extend({
	title:"",
	_element:null,
	toolBarItems:null,
	init:function(options){
		this._element = {};
		this.title  = options.title || '';
		this.toolBarItems =  options.toolBar || null;
		this._element.parent = options.parent || null;
		this._element.parent.append(  this.renderBox() );
	},
	renderBox:function(){
		this._element.box = $('<div class="panel panel-default jx-DataGrid-box"><div class="panel-heading"></div><div class="panel-body"></div></div>');
		
		this.renderTitle();
		this.renderToolBar();
		
		
		return this._element.box;
	},
	renderTitle:function(){
		this._element.box.find(">.panel-heading").eq(0).text(this.title);
	},
	renderToolBar:function(){
		var __self = this;
		if(!this.toolBarItems || $.type(this.toolBarItems) != 'array' ){return false;}
		var body = this._element.box.find('>.panel-body').eq(0);
		this._element.toolBar = $("<div class='jx-DataGrid-tollbar'><div class='jx-DataGrid-tollbar-station'></div></div>");
		var station = this._element.toolBar.find('.jx-DataGrid-tollbar-station');
		for(var x in this.toolBarItems){
			var itemData = this.toolBarItems[x];
			var item = $("<div class='btn-group'></div>");
			if(itemData.element){
				
				
			}else{
				var btn = $("<button class='btn btn-success'></button>").text(itemData.title).attr({'url':itemData.url,"message":itemData.message,"target":itemData.target});
				item.append( btn );
				if(itemData.callback && $.type(itemData.callback ) == 'function'){
					btn.on('click',itemData.callback );
				}else{
					btn.on('click',function(){
						var url = $(this).attr('url');
						if( __self.isEmpty(url) ){return false;}
						var message = $(this).attr('message');
						var target = $(this).attr('target');
						if(!__self.isEmpty(message)){
							if( confirm("是否" + message)){
								if( target == "_blank" ){
									window.open(url);
								}else{
									window.location.href = url;
								}
							}
						}else{
							if( target == "_blank" ){
									window.open(url);
								}else{
									window.location.href = url;
							}
						}

						
					});
				}
			}

			
//			console.log();
			station.append(item);
		}
		body.append(this._element.toolBar);

	},
	renderHeaders:function(){
		
		
		
	},
	isEmpty:function(data){
		 if(data == 'undefined' || data == undefined || data == null){
		 	return true;
		 }else if( $.type(data) == 'string'){
		 	 return !( data && data != '' && data != undefined && data != null && data.length > 0);
		 }else if( $.type(data) == 'array' ){
		 	return !( data &&  data != undefined && data != null && data.length > 0);
		 }else if( $.type(data) == 'object'){
		 	
		 }
		
		return true;
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
	
	
})( window.jQuery );