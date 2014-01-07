exports.index = function(req, res){
  res.render('index', { title: 'Heat Vote' });
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Heat Vote - Admin Panel' });
};