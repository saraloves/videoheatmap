$(function(){
  $.ajax({
    url: '/video',
    method: 'GET',
    success: function(data){
      appendInfo(data);
    }
  });

  var appendInfo = function(data){
    var userVideos = $('.user-videos');
    var listItem = _.template( $('#listVideoTemplate').html() );
    for (var i = 0; i < data.length; i++) {
      userVideos.append(listItem( data[i] ));
    }
  };

});