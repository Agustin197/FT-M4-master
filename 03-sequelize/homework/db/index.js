const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:agustin@localhost:5432/henry_sequelize', {
  logging: false,
});

modelCharacter(db);
modelAbility(db);
modelRole(db);

const { Character, Ability, Role} = db.models;

 Character.hasMany(Ability); // Esta es una relacion de uno muchos
 Ability.belongsTo(Character);

Character.belongsToMany(Role,{through:"Character_Role"}); //esta es una relacion de muchos a muchos
Role.belongsToMany(Character,{through:"Character_Role"}); //siempre que tengamos BelongsToMany, debemos pasarle la tabla intermedia 

module.exports = {
  ...db.models,
  db,
  Op
}
