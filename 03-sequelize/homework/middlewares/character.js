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
  const {race, age } = req.query;
  let personaje;
  if(!race) {
    personaje = await Character.findAll()
  }
  else if(!age){
    personaje = await Character.findAll({where:{race}})
  }
  else {
    personaje = await Character.findAll({where:{race,age }})
  }
  return res.status(200).send(personaje)
})

router.get("/young",function(req,res){
  Character.findAll({
    where:{
      age:{[Op.lt]: 25}
    }
  })
  .then(respuesta => res.send(respuesta))
  .catch(e => res.status(404).send(e))
})

router.get("/roles/:code",async(req,res)=>{
const {code} = req.params
try{
  let char = await Character.findOne({
    where:{code},
    include: Role
  })
  res.send(char)
} catch(error){
  res.status(404).send(error)
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
});

router.put("/addAbilities",async(req,res)=>{
const {abilities,codeCharacter} = req.body
try {
  let char = await Character.findByPk(codeCharacter)
  let arraypromesa = abilities.map(elem => char.createAbility(elem))
  await Promise.all(arraypromesa)
  res.send("abilities añadidas")
} catch (error) {
  res.status(404).send(error)
}

})

router.put("/:attribute",async(req,res)=>{
  const {attribute} = req.params
  const {value} = req.query
  try {
    await Character.update({[attribute]:value},{
      where:{
        [attribute] : null
      }
    })
    res.send("Personajes actualizados")
  } catch (error) {
    res.status(404).send(error)
  }
})


