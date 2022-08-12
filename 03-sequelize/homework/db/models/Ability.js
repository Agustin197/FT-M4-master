const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: "compositeIndex" // al utilizar dos "unique" los une 
    },
    description:{
      type: DataTypes.TEXT
    },
    mana_cost:{
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: "compositeIndex",
      validate:{
        min: 10,
        max: 250
      }
    },
    summary:{
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${this.mana_cost} points of mana) - Description: ${this.description}` 
      }
    }
  })
}

//