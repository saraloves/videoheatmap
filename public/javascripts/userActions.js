$(function(){
  var url = window.location.href;
  var pieces = url.split('/');
  var id = pieces[pieces.length-1];

  $.ajax({
    url: '/video/' + id,
    method: 'GET',
    success: function(data){
      createVideo(data);
      if ($('body').hasClass('uservideo')) {
        getTitle(data);
      }
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

  var getTitle = function(data) {
    console.log('ae');
    data = data[0];
    var title = data.video_title;
    $('.video-title').append(title);
  };

  var loginBtn = $('.login-button');
  var registerBtn = $('.register-button');
  var form = $('form');

  var toggleBtn = function (triggerElement) {
    loginBtn.addClass('hidden');
    registerBtn.addClass('hidden');
    triggerElement.removeClass('hidden');
  };

  loginBtn.on('click', function(){
    toggleBtn($('.login'));
  });

  registerBtn.on('click', function(){
    toggleBtn($('.register'));
  });

  form.on('submit', function(){
    form.addClass('hidden');
  });
});
