jx.DataGrid_Filter = jx.Base.extend({
	_filterData:null,
	_key:null,
	_selfElement:null,
	init:function(options){
		var __self = this;
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
		}else if(this._filterData instanceof HTMLElement ){
				this._selfElement = this._filterData ;
		}else if($.type( this._filterData ) == "object" && $.isPlainObject(this._filterData ) ){
			if(this._filterData.filtername == 'select'){
				this._selfElement = $('<select class="form-control" >').attr("name", this._key  );
				for(var x in this._filterData.options){
					this._selfElement.append($('<option></option>').text( this._filterData.options[x].text ).val(this._filterData.options[x].value));				
				}
			}else if(this._filterData.filtername == 'daterangepicker' || this._filterData.filtername == 'datepicker' ){
				this._selfElement = $('<input class="form-control" >').attr("name", this._key  );
				if(!$.fn.daterangepicker){return this;}
				var optionSet2 = {
						opens: 'left',
						format: 'YYYY-MM-DD',
						singleDatePicker: this._filterData.filtername == 'datepicker' ? true : false,
						locale :{
							"applyLabel": "确定",
							"cancelLabel": "取消",
							"fromLabel": "起始时间",
							"toLabel": "结束时间'",
							"weekLabel": "W",
							"daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
							"monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
							"firstDay": 1
						}
				};
				$(this._selfElement).daterangepicker(optionSet2);
			}else if(this._filterData.filtername == 'searchselect'){
			
					this._selfElement = $('<select class="form-control" style="width:100%;"></select>').attr("name", this._key  );
					
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
	renderAfter:function(){
		if( !this.isEmpty(this._filterData.filtername) ){
			if( this._filterData.filtername == 'searchselect' ){
				if(!$.fn.select2){return this;}
				    this._selfElement.select2({
						ajax:{
							url:this._filterData.url,
							type:this._filterData.method||"post",
							cache: true,
							dataType:"json",
//							data: function (params) {
//						          return {
//						            name: params.term, // search term
//						            page: params.page
//						          };
//				        	},
//				        	processResults: function (data) {
//				        		console.log(data);
//				        		 return {
//							        results: data
//							      };
//				        	},
				        	delay: 200
						}});
			}
			
			
		}
	},
	clear:function(){
		
		
		
		
	}
	
	
	
	
	
	
	
	
});
