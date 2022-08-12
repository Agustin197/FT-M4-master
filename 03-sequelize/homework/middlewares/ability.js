const { Router } = require('express');
const { Ability, Character} = require('../db');
const router = Router();


router.post("/",(req,res) => {
const {name, description, mana_cost} = req.body
if(!name || !mana_cost ) return res.status(404).send('Falta enviar datos obligatorios')
Ability.create({name,description,mana_cost})
.then(respuesta => res.status(201).send(respuesta))
.catch(error => res.status(404).send(error))
})

router.put("/setCharacter",async(req,res) => {
    const {idAbility,codeCharacter} = req.body
try {
    let ability = await Ability.findByPk(idAbility)
    if(ability){
        await ability.setCharacter(codeCharacter)
        res.send(ability)
    } else res.status(404).send("ability no encontrada")
} catch (error) {
    res.status(404).send(error)
}
})


module.exports = router;