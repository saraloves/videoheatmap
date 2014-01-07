var videos = new App.Collections.VideoPlayersList([
  { url: 'http://video-js.zencoder.com/oceans-clip', id: 'aaaa' }
]);

var appView = new App.Views.App({
  collection: videos
});

$(function(){
  // if($('span')[0].attr('class')){
  //   console.log('hi');
  // }
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