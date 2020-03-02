$(document).ready(function(){
  $('.delete-post').on('click', function(evt){
    evt.preventDefault();
    let postId = $(this).data('id');
    if(confirm('Delete this post?')) {
      $.ajax({
        url: '/dashboard/post/delete/' + postId,
        method: 'DELETE',
        success: function(){
          $('tr[data-id="' + postId +'"]').fadeOut('250');
        }
      });
    }
  });
});