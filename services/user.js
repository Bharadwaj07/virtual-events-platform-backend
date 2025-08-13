const prisma = require('../clients/prisma');
const {hashPassword} = require('../utils/password');

const user = prisma.user;


const createUser = async (userData) => {
    const hashedPassword = await hashPassword(userData.password);
    return await user.create({
        data: {...userData, password: hashedPassword}
    });
}

const getUserByEmail = async (email) => {
    return await user.findUnique({
        where: {email: email},
        select: {
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    })
}


const updateUser = async (email, userData) => {
    return await user.update({
        where: {email},
        data: {...userData}
    });
}

const deleteUser = async (email) =>{
    return await user.delete({
        where:{email}
    });
};


module.exports = {
    createUser,
    getUserByEmail,
    updateUser,
    deleteUser
}



