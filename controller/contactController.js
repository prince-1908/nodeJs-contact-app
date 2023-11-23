const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// const submit = window.document.getElementById('submit');

const createContact = async(req, res) => {
    const data = req.body;
    try{
        const contact = await prisma.contacts.create({
            data: req.body,
        });
        res.status(200).json(contact);
    }
    catch(err){
        res.status(500).send("This error is coming from where we are sending data to database");
    }
}

// const getAllContacts = 


module.exports = {createContact};