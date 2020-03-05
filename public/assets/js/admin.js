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
});