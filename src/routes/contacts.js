module.exports = function(app) {
  let controller = app.controllers.contacts;

  app.get('/', controller.index);
  app.get('/new', controller.new);
  app.post('/new', controller.newPost);
  app.get('/view/:id', controller.view);
}