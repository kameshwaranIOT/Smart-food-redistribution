const FirestoreModel = require('../utils/firebase');

class Analytics extends FirestoreModel {
  constructor() {
    super('analytics');
  }
}

module.exports = new Analytics();
