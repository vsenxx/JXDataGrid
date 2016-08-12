jx.DataGrid_Pagination = jx.Base.extend({
	_size:null,
	_page:null,
	_total:null,
	_selfElement:null,
	init:function(options){
		var __self = this;
		this._size =  options.size || 20;
		this._page =  options.page || 1;
		this._selfElement = $('<div class="jx-datagrid-pagination"></div>');
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

	},
	clear:function(){
		this._selfElement.empty();
		
		
		
	}
	
	
	
	
	
	
	
	
});
