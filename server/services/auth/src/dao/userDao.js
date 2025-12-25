import User from "../models/userModel.js";

export const userDao = {
    create: async (userData) => {
        const user = new User(userData);
        return await user.save();
    },
    findByEmail: async (email) => {
        return await User.findOne({ email });
    },
    findById: async (id) => {
        return await User.findById(id);
    },
    updateByEmail: async (email, updateData) => {
        return await User.findOneAndUpdate({ email }, updateData, { new: true });
    }
};