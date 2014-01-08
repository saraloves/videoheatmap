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
      $('.user-videos').append('<li><a href='+ data[i].url + '>' + data[i].video_id +'</a></li>');
    }
  }

});