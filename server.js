const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

app.use(express.json()); // Middleware for parsing JSON

//FIND ALL musicians

app.get('/musicians', async (request, response) => {
    //const date = new Date();
    let allMusicians = await Musician.findAll();
    //response.send(allMusicians);
    response.json(allMusicians)
})


//************************************************ */
//Code below could be used to catch errors in get request - would need to adapt to musician 
// app.get("/user", async (req, res) => {
//     try {
//       // Cannot accept body
//       const allUsers = await User.findAll();
//       res.status(200).send({ allUsers });
//     } catch (error) {
//       res.status(500).send({ err: error.message });
//     }
//   });






//TARGET by ID
app.get('/musicians/:id', async (req, res) => {
    const musiciansById = await Musician.findByPk(req.params.id)
    res.json(musiciansById);
})


// POST request to create a musician 
app.post("/musicians", async (req, res) => {
    try {
      // const userObj = req.body;
      const createMusician = await Musician.create(req.body);
  
      res.status(200).send({ msg: "Success", createMusician });
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });



// PUT update - using where req.body
app.put("/musicians", async (req, res) => {
    try {
      const updatedMusician = await Musician.update(req.body.update, {
        where: req.body.where,
      });
      if (updatedMusician[0] > 0) {
        res.status(200).send({ msg: "Success" });//  do i need to and updatedMusician to here??/ like abov ein the POST request
      } else {
        throw new Error("No update made");
      }
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });


// DELETE musician by ID using try and catch 
app.delete("/musicians/:id", async (req, res) => {
    try {
      // Cannot accept body
      const deletedMusician = Musician.destroy({ where: { id: req.params.id } });
  
      if (deletedMusician[0] > 0) {
        res.status(200).send({ msg: "Success" });
      } else {
        throw new Error("Not deleted");
      }
    } catch (error) {
      res.status(500).send({ err: error.message });
    }
  });




app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})