const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

module.exports = router;

router.post("/", async function(req, res){
const {code,name,age,race,hp,mana,data_added} = req.body;
if(!code || !name || !hp || !mana) return res.status(404).send("Falta enviar datos obligatorios");

try {
  const data = {code,name,age,race,hp,mana,data_added};
  const newCharacter = await Character.create(data);
  return res.status(201).send(newCharacter)
} catch (error) {
  return res.status(404).send("Error en alguno de los datos provistos")
}
})

router.get("/", async function(req,res){
  const {race} = req.query;
  if(!race) {
    const personaje = await Character.findAll()
  return res.status(200).send(personaje)
  }
  else{
    const personaje = await Character.findAll({where:{race}})
    return res.status(200).send(personaje)
  }
})

router.get("/:code", async function (req,res){
  const {code} = req.params
  const data = await Character.findByPk(code)
  if (!data) {
   return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
  }
  else {
    return res.status(200).send(data)
  }
})



