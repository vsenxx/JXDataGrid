$('#creation_time').daterangepicker({
								'format':'YYYY-MM-DD',
						    	'singleDatePicker': false,
								'locale': {
											'applyLabel':'确定',
											'cancelLabel':'取消',
											'format' : 'YYYY-MM-DD',
											'daysOfWeek': ['日', '一', '二', '三', '四', '五', '六'],
											'monthNames': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
											'firstDay': 0,
													
										  },
						        'opens':'right',
	}, function(start, end, label){
		$('#creation_time span').text(start.format('YYYY-MM-DD'));
		$('#creation_time input').val(start.format('YYYY-MM-DD'));
	});
	

$('#update_time').daterangepicker({
								'format':'YYYY-MM-DD',
						    	'singleDatePicker': false,
								'locale': {
											'applyLabel':'确定',
											'cancelLabel':'取消',
											'format' : 'YYYY-MM-DD',
											'daysOfWeek': ['日', '一', '二', '三', '四', '五', '六'],
											'monthNames': ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
											'firstDay': 0,
													
										  },
						        'opens':'right',
	}, function(start, end, label){
		$('#creation_time span').text(start.format('YYYY-MM-DD'));
		$('#creation_time input').val(start.format('YYYY-MM-DD'));
	});