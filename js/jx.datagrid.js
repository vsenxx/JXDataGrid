
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
