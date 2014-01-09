exports.index = function(req, res){
  res.render('index', { title: 'Heat Vote', user: req.user });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Heat Vote - Admin Panel', user: req.user });
}

exports.uservideo = function(req, res){
  res.render('uservideo', { title: 'Heat Vote - View Video', user: req.user, video_id: req.params.vid_id });
}

exports.usershare = function(req, res){
  res.render('usershare', { title: 'Heat Vote - View Video', user: req.user, video_id: req.params.vid_id });
}