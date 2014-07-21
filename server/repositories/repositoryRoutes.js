var repositoryController = require('./repositoryController.js');


module.exports = function (app) {
  // app === repositoryRouter injected from middlware.js

  console.log('Repository routes should be exported');
  app.post('/create', repositoryController.create);
  // app.post('/signup', userController.signup);
  // app.get('/signedin', userController.checkAuth);
};
