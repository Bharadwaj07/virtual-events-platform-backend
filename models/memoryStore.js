const { v4: uuidv4 } = require('uuid');

const memoryDB = {
  users: [],
  events: [],
  eventRegistrations: []
};



const generateId = () => uuidv4();


const getMemoryDBStats = () => {
  return {
    users: memoryDB.users.length,
    events: memoryDB.events.length,
    registrations: memoryDB.eventRegistrations.length,

  };
};

// Clear all data (useful for testing)
const clearMemoryDB = () => {
  memoryDB.users = [];
  memoryDB.events = [];
  memoryDB.eventRegistrations = [];
};

// Export the memory store and utilities
module.exports = {
  memoryDB,
  generateId,
  getMemoryDBStats,
  clearMemoryDB
};