module.exports = function(app) {
  let service = require('../services/contacts')(app);

  return {
    index: (req, res) => {
      service.on('value', snapshot => {
        res.render('index', {contacts: snapshot.val() || []});
      });
    },
    new: (req, res) => res.render('new'),
    newPost: (req, res) => {
      let newContact = service.push();
      newContact.set({
        name: req.body.name,
        email: req.body.email
      });
      // res.send('Formulário recebido: ' + JSON.stringify(req.body))
      res.redirect('/');
    },
    view: (req, res) => {
      let child = service.child(req.params.id);
      child.on('value', snapshot => {
        res.render('view', {
          id: req.params.id,
          contact: snapshot.val() || {}
        });
      });
    }
  }
}