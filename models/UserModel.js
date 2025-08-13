// models/User.js
const { memoryDB, generateId } = require('./memoryStore');

// User Model Operations for In-Memory Database
class User {
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Object} Created user object
   */
  static async create(userData) {
    try {
      const user = {
        id: generateId(),
        name: userData.name || null,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'ATTENDEE',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      memoryDB.users.push(user);
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Find user by query
   * @param {Object} query - Query object (e.g., { email: 'test@example.com' })
   * @returns {Object|null} Found user or null
   */
  static async findOne(query) {
    try {
      const user = memoryDB.users.find(user => {
        return Object.keys(query).every(key => user[key] === query[key]);
      });
      return user || null;
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  /**
   * Find user by ID
   * @param {string} id - User ID
   * @returns {Object|null} Found user or null
   */
  static async findById(id) {
    try {
      const user = memoryDB.users.find(user => user.id === id);
      return user || null;
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  /**
   * Update user by query
   * @param {Object} query - Query to find user
   * @param {Object} updateData - Data to update
   * @returns {Object|null} Updated user or null
   */
  static async findOneAndUpdate(query, updateData) {
    try {
      const userIndex = memoryDB.users.findIndex(user => {
        return Object.keys(query).every(key => user[key] === query[key]);
      });
      
      if (userIndex === -1) return null;
      
      // Don't allow updating the ID
      const { id, ...safeUpdateData } = updateData;
      
      memoryDB.users[userIndex] = {
        ...memoryDB.users[userIndex],
        ...safeUpdateData,
        updatedAt: new Date()
      };
      
      return memoryDB.users[userIndex];
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  /**
   * Update user by ID
   * @param {string} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Object|null} Updated user or null
   */
  static async findByIdAndUpdate(id, updateData) {
    try {
      return await this.findOneAndUpdate({ id }, updateData);
    } catch (error) {
      throw new Error(`Error updating user by ID: ${error.message}`);
    }
  }

  /**
   * Delete user by query
   * @param {Object} query - Query to find user
   * @returns {Object|null} Deleted user or null
   */
  static async findOneAndDelete(query) {
    try {
      const userIndex = memoryDB.users.findIndex(user => {
        return Object.keys(query).every(key => user[key] === query[key]);
      });
      
      if (userIndex === -1) return null;
      
      const deletedUser = memoryDB.users[userIndex];
      memoryDB.users.splice(userIndex, 1);
      
      // Clean up related data
      // Remove user's event registrations
      memoryDB.eventRegistrations = memoryDB.eventRegistrations.filter(
        reg => reg.userId !== deletedUser.id
      );
      
      // Remove user from event participants lists
      memoryDB.events.forEach(event => {
        if (event.participants && event.participants.includes(deletedUser.id)) {
          event.participants = event.participants.filter(
            participantId => participantId !== deletedUser.id
          );
        }
      });
      
      return deletedUser;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  /**
   * Delete user by ID
   * @param {string} id - User ID
   * @returns {Object|null} Deleted user or null
   */
  static async findByIdAndDelete(id) {
    try {
      return await this.findOneAndDelete({ id });
    } catch (error) {
      throw new Error(`Error deleting user by ID: ${error.message}`);
    }
  }

  /**
   * Find all users
   * @param {Object} query - Optional query filter
   * @returns {Array} Array of users
   */
  static async find(query = {}) {
    try {
      if (Object.keys(query).length === 0) {
        return [...memoryDB.users];
      }
      
      return memoryDB.users.filter(user => {
        return Object.keys(query).every(key => user[key] === query[key]);
      });
    } catch (error) {
      throw new Error(`Error finding users: ${error.message}`);
    }
  }

  /**
   * Count users
   * @param {Object} query - Optional query filter
   * @returns {number} Count of users
   */
  static async countDocuments(query = {}) {
    try {
      const users = await this.find(query);
      return users.length;
    } catch (error) {
      throw new Error(`Error counting users: ${error.message}`);
    }
  }

  /**
   * Check if user exists
   * @param {Object} query - Query to check
   * @returns {boolean} True if user exists
   */
  static async exists(query) {
    try {
      const user = await this.findOne(query);
      return user !== null;
    } catch (error) {
      throw new Error(`Error checking if user exists: ${error.message}`);
    }
  }
}

module.exports = User;
