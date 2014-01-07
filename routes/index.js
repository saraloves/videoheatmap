exports.index = function(req, res){
  res.render('index', { title: 'Heat Vote', user: req.user });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Heat Vote - Admin Panel', user: req.user });
}