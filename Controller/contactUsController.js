const Contact = require("../Model/contactModel");


const postContact = async(req,res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: "Form submitted successfully", contact });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

module.exports = {postContact};