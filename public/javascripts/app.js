var videos = new App.Collections.VideoPlayersList([
  { url: 'http://video-js.zencoder.com/oceans-clip.mp4', id: 'aaaa' }
]);

var appView = new App.Views.App({
  collection: videos
});

$(function(){
  $('.login-button').on('click', function(){
    $('.login-button').addClass('hidden');
    $('.register-button').addClass('hidden');
    $('.login').removeClass('hidden');
  });

  $('.register-button').on('click', function(){
    $('.login-button').addClass('hidden');
    $('.register-button').addClass('hidden');
    $('.register').removeClass('hidden');
  });

  $('form').on('submit', function(){
    $('form').addClass('hidden');
  });
});