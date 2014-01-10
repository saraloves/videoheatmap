$(function(){
  $.ajax({
    url: '/video',
    method: 'GET',
    success: function(data){
      appendInfo(data);
    }
  });

  var appendInfo = function(data){
    for (var i = 0; i < data.length; i++) {
      $('.user-videos').append('<li><span class=\'vid-link\'><a href=/link/'+ data[i].user_id + '/' + data[i].id + '>' + data[i].video_title +'</a></span><span>' + 'Share your video: <a href=/link/share/' + data[i].user_id + '/' + data[i].id + '>/link/share/' + data[i].user_id + '/' + data[i].id + '</a></span></li>');
    }
  };

});