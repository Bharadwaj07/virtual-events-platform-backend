const User = require('../models/UserModel');
const {hashPassword} = require('../utils/password');




const createUser = async (userData) => {
    const hashedPassword = await hashPassword(userData.password);
    return await User.create({
        ...userData,
        password: hashedPassword
    });
}

const getUserByEmail = async (email) => {
    return await User.findOne({email});
}


const updateUser = async (email, userData) => {
    return await User.findOneAndUpdate({email}, {...userData});
}

const deleteUser = async (email) =>{
    return await User.findOneAndDelete({email});
};


module.exports = {
    createUser,
    getUserByEmail,
    updateUser,
    deleteUser
}



