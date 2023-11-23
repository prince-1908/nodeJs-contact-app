const express = require("express");
const app = express();

const path = require("path");

const router = express.Router();

const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;

const { PrismaClient } = require("@prisma/client");
const { create } = require("domain");
const prisma = new PrismaClient();

const { createContact, getAllContacts } = require("./controller/contactController");

app.use(express.json());
app.use(createContact);
// app.use(getAllContacts);

// app.get("/", (req, res) => {
//     res.send("hello world");
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.post('/createContact', createContact);

app.get("/fetchData", async (req, res) => {
    try {
        const data = await prisma.contacts.findMany();

        console.log(data);

        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`);
});