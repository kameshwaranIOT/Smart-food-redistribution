const admin = require('firebase-admin');
const db = admin.firestore();

class FirestoreModel {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
    this.collectionName = collectionName;
  }

  async findById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  async findOne(query) {
    const key = Object.keys(query)[0];
    const value = Object.values(query)[0];
    const snapshot = await this.collection.where(key, '==', value).limit(1).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async find(query) {
    let queryRef = this.collection;
    for (const [key, value] of Object.entries(query)) {
      queryRef = queryRef.where(key, '==', value);
    }
    const snapshot = await queryRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async create(data) {
    const docRef = await this.collection.add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }

  async update(id, data) {
    await this.collection.doc(id).update({
      ...data,
      updatedAt: new Date()
    });
    return await this.findById(id);
  }

  async delete(id) {
    await this.collection.doc(id).delete();
    return true;
  }

  async findArray(query) {
    let queryRef = this.collection;
    const conditions = Object.entries(query);
    
    for (const [key, value] of conditions) {
      if (Array.isArray(value)) {
        queryRef = queryRef.where(key, 'in', value);
      } else {
        queryRef = queryRef.where(key, '==', value);
      }
    }
    
    const snapshot = await queryRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

module.exports = FirestoreModel;
