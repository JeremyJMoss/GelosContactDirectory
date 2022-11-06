const express = require("express");
const cors = require("cors");
const server = express();
const contactRoutes = require("./routes/postContact");


server.use(cors());
server.use(express.json());

server.use("/contacts", contactRoutes);

server.listen(5000, () => {
    console.log("server listening on http://localhost:5000");
})