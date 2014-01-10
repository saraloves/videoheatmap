$(function () {
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