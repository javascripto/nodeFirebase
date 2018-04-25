let contacts = (app) => {
  let firebase = app.firebase;
  return firebase.database().ref('contacts');
}

module.exports = contacts;