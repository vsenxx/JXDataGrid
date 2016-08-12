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