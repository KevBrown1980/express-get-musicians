const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//FIND ALL musicians
app.get('/musicians', async (request, response) => {
    //const date = new Date();
    let allMusicians = await Musician.findAll();
    //response.send(allMusicians);
    response.json(allMusicians)
})


//TARGET by ID
app.get('/musicians/:id', async (req, res) => {
    const musiciansById = await Musician.findByPk(req.params.id)
    res.json(musiciansById);
})




app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})