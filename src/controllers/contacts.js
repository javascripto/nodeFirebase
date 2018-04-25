module.exports = function(app) {
  let service = require('../services/contacts')(app);

  return {
    index: (req, res) => res.render('index'),
    new: (req, res) => res.render('new'),
    newPost: (req, res) => {
      let newContact = service.push();
      newContact.set({
        name: req.body.name,
        email: req.body.email
      });
      // res.send('Formulário recebido: ' + JSON.stringify(req.body))
      res.redirect('/');
    }
  }
}