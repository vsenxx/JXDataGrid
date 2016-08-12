jx.DataGrid_Table = jx.Base.extend({
	_thead:null,
	_tbody:null,
	_custompanel:null,
	_actions:null,
	_url:null,
	_params:null,
	_method:null,
	init:function(options){
		this._url = options.url || null,
		this._params = options.params || null,
		this._method = options.method || null,
		this._selfElement = $('<table class="table table-bordered table-hover"></table>');
		this._custompanel = options.custompanel || null;
		this._actions = options.actions || null;
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
			var filter = new jx.DataGrid_Filter( { key:data.key , data : data.filter } );
			this._thead.theads.push({'element':td,'filter':filter});
		}
		if(!this.isEmpty(this._actions)){
			this._thead.theads.push({'element':$('<td><div class="form-group"><label for="">操作</label></div></td>')});
		}


	},
	initTbody:function(options){
		this._tbody = {
			Element: $('<tbody></tbody>'),
			datas:options.datas || null ,
		};
	
	},
	renderThead:function(){
		
		for(var x in this._thead.theads ){
			if(this._thead.theads[x].filter){
				this._thead.theads[x].element.find(">.form-group").eq(0).append(this._thead.theads[x].filter.render());
			}
			this._thead.Element.find('tr').eq(0).append(this._thead.theads[x].element);
		}
	
	},
	search:function(){
		var __self = this;
		this.clearTbody();
		var params = {};
		
		for(var x in  this._thead.theads){
			var item = this._thead.theads[x].element.find(">.form-group>input,>.form-group>select").eq(0);
			if(item.length <=0){
				continue;
			}
			if( this.isEmpty( item.val() )){
				continue;
			}
			params[item.attr('name')] = item.val();
		}
		console.log(params);
		
		
			$.ajax({
				type:__self._method || "post",
		        url: __self._url ,  
		        dataType:'json',
//		        async: false,
		        data:__self.params||{},
		        xhrFields: {
			      withCredentials: true
			    },
//		        jsonp:'callback',
		        success:function(result){
					__self._tbody.datas = result;
					setTimeout(function(){
						__self.renderTbody();
					},100);
		        }
			});
	},
	renderTbody:function(){
		var __self = this;
		if(this.isEmpty( this._tbody.datas ) && this.isEmpty( this._thead.datas )){return false;}
		if(this.isEmpty( this._tbody.datas) && this.isEmpty( this._url ) ){ return false; }

		if(this.isEmpty( this._tbody.datas)){ this.search(); return false;}
		
		for(var i = 0; i < this._tbody.datas.length; i++ ){
			var data = this._tbody.datas[i];
			var tr = $('<tr><td>'+(i+1)+'</td></tr>');
			if( !this.isEmpty(this._custompanel) && $.type(this._custompanel) == 'function'){
				tr.append($('<td><i class="glyphicon glyphicon-triangle-right custompanel-launcher"></i></td>'));
			}
			var primary = {};
			for(var x in this._thead.datas ){
				var key = this._thead.datas[x].key;
				var td = $('<td>' + data[ key ] + '</td>' );
				td.attr("key",key);
				if(this._thead.datas[x].primary === true || this._thead.datas[x].primary == "true"){
					primary[key] = data[ key ];
					td.attr( 'primary', true );
				}
				tr.append( td );
			}
			if(!this.isEmpty(this._actions)){
				var actionTd = $('<td></td>');	
				for(var x in this._actions){
					this._actions[x].params = $.extend(true, this._actions[x].params|| {} , primary);
					var item = new jx.DataGrid_Item( {data:this._actions[x]} );
					actionTd.append(item.render());
					item.bindEvent();
				}
				tr.append(actionTd);
			}
			
			
			
			this._tbody.Element.append(tr);
					
			if( !this.isEmpty(this._custompanel) && $.type(this._custompanel) == 'function'){
				var customTr = $("<tr style='display: none;' class='custompanel'></tr>");
				customTr.append(this._custompanel( this._thead.datas , data ));
				this._tbody.Element.append(customTr);
			}
		}
		this.bindEvent();
	},
	render:function(parentNode){
		this.clear();
		
		this.renderThead();
		this._selfElement.append( this._thead.Element  );
		this.renderTbody();
		this._selfElement.append( this._tbody.Element  );
		
		if(!this.isEmpty(parentNode) ){
			$(parentNode).append( this._selfElement );
		}else{
			return this._selfElement ;
		}
	},
	bindEvent:function(){
		var __self = this;
		this._tbody.Element.find('.custompanel-launcher').on('click',function(){
			//点击展开
			if($(this).hasClass('glyphicon-triangle-right')){
				__self._tbody.Element.find('.custompanel:visible').hide();
				__self._tbody.Element.find('.custompanel-launcher').
				removeClass("glyphicon-triangle-bottom").addClass('glyphicon-triangle-right');
				$(this).removeClass("glyphicon-triangle-right").addClass('glyphicon-triangle-bottom');
				$(this).closest('tr').next().show(500);
			}else{
				__self._tbody.Element.find('.custompanel:visible').hide();
				__self._tbody.Element.find('.custompanel-launcher').
				removeClass("glyphicon-triangle-bottom").addClass('glyphicon-triangle-right');
				
			}



		});
	},
	clear:function(){
		this.clearTbody();	
	},
	clearTbody:function(){
		this._tbody.Element.empty(); 
	},
	renderAfter:function(){
		for(var x in this._thead.theads ){
				if(this._thead.theads[x].filter){
					this._thead.theads[x].filter.renderAfter();
				}
		}
	}
	
	
	
	
	
	
	
	
	
});
