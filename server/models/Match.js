const FirestoreModel = require('../utils/firebase');

class Match extends FirestoreModel {
  constructor() {
    super('matches');
  }
}

module.exports = new Match();
