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