$(function(){
  var url = window.location.href;
  var pieces = url.split('/');
  var id = pieces[pieces.length-1];

  $.ajax({
    url: '/video/' + id,
    method: 'GET',
    success: function(data){
      createVideo(data);
    }
  });

  var createVideo = function(data){
    data = data[0];
    var videos = new App.Collections.VideoPlayersList([
     { url: data.url, id: data.id }
    ]);

    var appView = new App.Views.App({
      collection: videos
    });
  };

});
