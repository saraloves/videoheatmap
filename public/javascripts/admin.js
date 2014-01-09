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
      console.log(data[i].url);
      $('.user-videos').append('<li><a href=/link/'+ data[i].user_id + '/' + data[i].id + '>' + data[i].video_title +'</a></li><span><a href=/link/share/'+ data[i].user_id + '/' + data[i].id + '> Share your video: /link/share/' + data[i].user_id + '/' + data[i].id + '</a></span>');
      // $('.user-videos').append('<span><a href=/link/share/'+ data[i].user_id + '/' + data[i].id + '> Share your video: /link/share/' + data[i].user_id + '/' + data[i].id + '</a></span>');
    }
  };

});


'<li><a href=/link/'+ data[i].user_id + '/' + data[i].id + '/share>' + data[i].video_title +'</a></li>'