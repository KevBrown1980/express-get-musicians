const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO
app.get('/musicians', async (request, response) => {
    //const date = new Date();
    let allMusicians = await Musician.findAll();
    //response.send(allMusicians);
    response.json(allMusicians)
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})