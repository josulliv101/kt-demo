class User extends Object {}

var viewer = new User();
viewer.id = '1';
viewer.token = null;
viewer.name = 'Anonymous';
viewer.isAnonymous = true;

exports.getViewer = () => viewer;
exports.getUser = (id) => id === viewer.id ? viewer : null;
exports.User = User;