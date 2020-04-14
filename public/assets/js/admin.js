$(document).ready(function(){

		// Hide alerts
		$('.alert:not(".alert-dismissible")').each(function(){
			$(this).delay(3000).fadeOut(200);
		});
		
		// Delete post
		$('.delete-post').on('click', function(evt){
			evt.preventDefault();
			const postId = $(this).data('id');
			const $tableRow = $('tr[data-id="' + postId +'"]');
			if(confirm('Delete this post?')) {
				$.ajax({
					url: '/dashboard/post/delete/' + postId,
					method: 'DELETE',
					success: function(){
						$tableRow.fadeOut(250, function() {
							$tableRow.removeClass('d-flex')
						});
					}
				});
			}
		});


	// Delete category
	$('.delete-category').on('click', function(evt){
		evt.preventDefault();
		const catId = $(this).data('id');
		const $tableRow = $('tr[data-id="' + catId +'"]');
		if(confirm('Delete category?')) {
			$.ajax({
				url: '/dashboard/category/delete/' + catId,
				method: 'DELETE',
				success: function(){
					$tableRow.fadeOut(250, function() {
						$tableRow.removeClass('d-flex')
					});
				}
			});
		}
	});

});