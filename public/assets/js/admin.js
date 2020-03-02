$(document).ready(function(){
  $('.delete-post').on('click', function(evt){
    evt.preventDefault();
    let postId = $(this).data('id');
    if(confirm('Delete this post?')) {
      $.ajax({
        url: '/post/delete/' + postId,
        method: 'DELETE',
        success: function(deleteMsg){
          $('tr[data-id="' + postId +'"]').fadeOut('250');
        }
      });
    }
  });
});