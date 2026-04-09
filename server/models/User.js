const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');
const realtimeDb = admin.database();

class User {
  static dbRef = realtimeDb.ref('users');

  static async findOne(query) {
    try {
      const key = Object.keys(query)[0];
      const value = Object.values(query)[0];
      
      const snapshot = await this.dbRef.orderByChild(key).equalTo(value).limitToFirst(1).once('value');
      
      if (!snapshot.exists()) {
        return null;
      }
      
      const data = snapshot.val();
      const id = Object.keys(data)[0];
      return { id, ...data[id] };
    } catch (error) {
      console.error('Error in User.findOne:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const snapshot = await this.dbRef.child(id).once('value');
      if (!snapshot.exists()) return null;
      return { id, ...snapshot.val() };
    } catch (error) {
      console.error('Error in User.findById:', error);
      throw error;
    }
  }

  static async create(userData) {
    try {
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const newUserRef = this.dbRef.push();
      await newUserRef.set({
        ...userData,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        rating: 5,
        isVerified: false
      });
      
      const id = newUserRef.key;
      const snapshot = await newUserRef.once('value');
      return { id, ...snapshot.val() };
    } catch (error) {
      console.error('Error in User.create:', error);
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      await this.dbRef.child(id).update({
        ...updates,
        updatedAt: new Date().toISOString()
      });
      const snapshot = await this.dbRef.child(id).once('value');
      return { id, ...snapshot.val() };
    } catch (error) {
      console.error('Error in User.update:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await this.dbRef.child(id).remove();
    } catch (error) {
      console.error('Error in User.delete:', error);
      throw error;
    }
  }

  static async comparePassword(hashedPassword, candidatePassword) {
    try {
      if (!hashedPassword || !candidatePassword) {
        return false;
      }
      return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
      console.error('Error in User.comparePassword:', error);
      throw error;
    }
  }
}

module.exports = User;
