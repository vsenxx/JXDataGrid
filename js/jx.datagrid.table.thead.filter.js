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
