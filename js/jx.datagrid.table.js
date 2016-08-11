jx.DataGrid_Table = jx.Base.extend({
	_thead:null,
	_tbody:null,
	_custompanel:null,
	init:function(options){
		
		this._selfElement = $('<table class="table table-bordered table-hover"></table>');
		this._custompanel = options.custompanel || null;
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
			var filter = new jx.DataGrid_Table_Thead_Filter( { key:data.key , data : data.filter } );
			this._thead.theads.push({'element':td,'filter':filter});
		}


	},
	initTbody:function(options){
		this._tbody = {
			Element: $('<tbody></tbody>'),
			datas:options.cellData || null ,
		};
	
	},
	renderThead:function(){
		
		for(var x in this._thead.theads ){
			if(this._thead.theads[x].filter){
				this._thead.theads[x].element.find(">.form-group").eq(0).append(this._thead.theads[x].filter.render());
			}
			this._thead.Element.find('tr').eq(0).append(this._thead.theads[x].element);
		}
		this._selfElement.append( this._thead.Element  );
		
	},
	renderTbody:function(){

		if(this.isEmpty( this._tbody.datas ) || this.isEmpty( this._thead.datas )){return false;}	
		for(var i = 0; i < this._tbody.datas.length; i++ ){
			var data = this._tbody.datas[i];
			var tr = $('<tr><td>'+(i+1)+'</td></tr>');
			if( !this.isEmpty(this._custompanel) && $.type(this._custompanel) == 'function'){
				tr.append($('<td><i class="glyphicon glyphicon-triangle-right custompanel-launcher"></i></td>'));
			}
			for(var x in this._thead.datas ){
				var key = this._thead.datas[x].key;
				var td = $('<td>' + data[ key ] + '</td>' );
				if(this._thead.datas[x].primary === true || this._thead.datas[x].primary == "true"){
					td.attr( 'primary', true );
				}
				tr.append( td );
			}
			this._tbody.Element.append(tr);
					
			if( !this.isEmpty(this._custompanel) && $.type(this._custompanel) == 'function'){
				var customTr = $("<tr style='display: none;' class='custompanel'></tr>");
				customTr.append(this._custompanel( this._thead.datas , data ));
				this._tbody.Element.append(customTr);
			}
		}
		this._selfElement.append( this._tbody.Element  );
		this.bindEvent();
	},
	render:function(parentNode){
		this.clear();
		//this._selfElement.append( this._thead.render() );
		this.renderThead();
		this.renderTbody();
	
		
		if(!this.isEmpty(parentNode) ){
			$(parentNode).append( this._selfElement );
		}else{
			return this._selfElement ;
		}
	},
	bindEvent:function(){
		var __self = this;
		this._tbody.Element.find('.custompanel-launcher').on('click',function(){
			__self._tbody.Element.find('.custompanel:visible').hide();
			__self._tbody.Element.find('.custompanel-launcher').
			removeClass("glyphicon-triangle-bottom").addClass('glyphicon-triangle-right');
		
			$(this).removeClass("glyphicon-triangle-right").addClass('glyphicon-triangle-bottom');
			$(this).closest('tr').next().show(1000);
		});
	},
	clear:function(){
		
		
		
		
	},
	renderAfter:function(){
		for(var x in this._thead.theads ){
				if(this._thead.theads[x].filter){
					this._thead.theads[x].filter.renderAfter();
				}
		}
	}
	
	
	
	
	
	
	
	
	
});
