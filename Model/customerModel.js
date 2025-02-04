const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"] },
    status: {type : String}
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer
