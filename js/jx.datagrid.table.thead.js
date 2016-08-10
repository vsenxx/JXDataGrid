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
				
				var filter = new jx.DataGrid_Table_Thead_Filter({key:this._theadDatas[x].key , data:this._theadDatas[x].filter} );
				head.find(">.form-group").eq(0).append(filter.render());
				
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
