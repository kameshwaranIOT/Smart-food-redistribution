const FirestoreModel = require('../utils/firebase');

class Message extends FirestoreModel {
  constructor() {
    super('messages');
  }
}

module.exports = new Message();
