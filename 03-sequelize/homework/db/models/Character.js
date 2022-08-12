const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code:{
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
      validate:{
        validadorcode(value){
          if(value.toLowerCase() === "henry")
          throw new Error('este es un error')
        }
      }
    },
    name:{
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
      validate:{
        notIn: [["Henry","SoyHenry","Soy Henry"]],
      }
    },
    age:{
      type: DataTypes.INTEGER,
      get(){
        let value = this.getDataValue("age")
        if(!value) return value
        return value + " years old"
      }
    },
    race:{
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue:'Other'
    },
    hp:{
      type: DataTypes.FLOAT,
      allownull: false
    },
    mana:{
      type: DataTypes.FLOAT,
      allownull: false
    },
    date_added:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
  },{
    timestamps: false // evitamos crear los CreatedAT y updateAt
  })
};

