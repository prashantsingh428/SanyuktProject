const Contact = require("../models/Contact");

// ================= SEND MESSAGE =================
exports.sendMessage = async (req, res) => {
    try {
        const { name, phone, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ message: "Name and Message required" });
        }

        const contact = new Contact({
            name,
            phone,
            message,
        });

        await contact.save();

        res.status(201).json({ message: "Message Sent Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ================= GET ALL MESSAGES (Admin) =================
exports.getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};