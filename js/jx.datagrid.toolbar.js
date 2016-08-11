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
		
	},
	renderAfter:function(){
		for(var x in this._toolItems){
			this._selfElement.find('.jx-DataGrid-tollbar-station').append( this._toolItems[x].renderAfter() );
		}
	}
	
});