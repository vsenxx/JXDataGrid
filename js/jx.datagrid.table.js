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
