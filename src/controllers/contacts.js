module.exports = function(app) {
  return {
    index: (req, res) => res.render('index'),
    new: (req, res) => res.render('new'),
    newPost: (req, res) => res.send('//TODO: Formulário recebido')
  }
}