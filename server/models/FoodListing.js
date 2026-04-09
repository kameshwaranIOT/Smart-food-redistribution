const FirestoreModel = require('../utils/firebase');

class FoodListing extends FirestoreModel {
  constructor() {
    super('foodListings');
  }
}

module.exports = new FoodListing();
