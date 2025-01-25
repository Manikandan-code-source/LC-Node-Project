const User = require('../Model/userModel');
const bcrypt = require('bcrypt');

const getCustomer = async (req, res) => {
    try {
        const user = await User.find();
        if (user) {
            return res.status(200).json({ user, message: "List of Customers" });
        } else {
            return res.status(404).json({ message: "Customer not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const postCustomer = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Required Details are Missing" });
    } else {
        if (role === "admin") {
            const adminExists = await User.findOne({ role: "admin" });
            if (adminExists) {
                return res.status(400).json({ message: "Admin already exists!" })
            } else {
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword,
                    role
                });
                await newUser.save();
                res.status(200).json({
                    user: { name: newUser.name, email: newUser.email, role: newUser.role },
                    message: "New Admin has been saved Successfully",
                });
            }
        } else {
            try {
                const exsistingUser = await User.findOne({ email });
                if (exsistingUser) {
                    return res.status(400).json({
                        message: "Customer Already Exsist"
                    });
                } else {
                    const hashedPassword = await bcrypt.hash(password, 12);
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        role
                    });
                    await newUser.save();
                    res.status(200).json({
                        user: { name: newUser.name, email: newUser.email, role: newUser.role },
                        message: "New Customer has been saved Successfully",
                    });
                }
            } catch (error) {
                res.status(500).json({
                    message: "Something went wrong"
                });
            }
        }
    }
}

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const { user, ...creds } = updates;
        const updatedCustomer = await User.findByIdAndUpdate(id, creds, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }
        res.status(200).json({ message: 'Customer updated successfully.', customer: updatedCustomer });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};


const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await User.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }
        res.status(200).json({ message: 'Customer Deleted successfully.'});
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
}

module.exports = {
    getCustomer,
    postCustomer,
    updateCustomer,
    deleteCustomer
}