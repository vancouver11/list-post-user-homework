$(document).ready(function () {

	$('.btnSearch').on('click', function () {
		var newId = $('.valueId').val();
		$.ajax({
			url:`https://jsonplaceholder.typicode.com/todos?userId=${newId}`,    
			dataType : "json",                     
			complete: complete,
			success: success, 
			error: function(){console.log('error done!')},
			beforeSend: beforeSend
		
		});
		
	});

});

//////////////////////
function success(data){
	$("#listPosts").html("");
	data.forEach(element => {
		var newPost = [
			'<div class="post">',
			`<div class="id">Post №${element.id}</div>`,
			`<div class="title"><span>Title:</span> ${element.title}</div>`,
			`<div class="completed"><span>Completed:</span> ${element.completed}</div>`,
			'</div>'
		].join('');
		
		$('#listPosts').append(newPost);
	});
	 
}
////////////////////////////


function beforeSend(){
	$('#dataLoading').css('display','block'); 
	$('#dataLoading').animate({
		'top': '0', 'opacity': '1'	
		}, 400)
	
}
//////////////////////////////////

	function complete(data, textStatus){
		console.log();
		console.log(textStatus);
		$('#dataLoading').animate({
			'opacity':'0'	
			}, 2500, function(){
				$('#dataLoading').css('top','-1000px'); 
				if(textStatus === "success"){
					if(data.responseJSON.length === 0) $('#infoRequest .textLoad').text("Увы. Нет данных. Попрубуй еще.");
					else $('#infoRequest .textLoad').text("Успешно загружено");
				} 
				else{
					$('#infoRequest .textLoad').text("Увы. Ошибка. Попрубуй еще.");
				}
				
				 $('#infoRequest').show();
				 $('#infoRequest').animate({'opacity':'0'}, 4000, function(){
					$(this).css('display', 'none');
					$(this).css('opacity', '1');
				 })
				
		
			})

	
	}
		

