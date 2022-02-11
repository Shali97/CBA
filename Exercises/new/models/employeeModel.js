module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("employee", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address:{
        type:DataTypes.STRING
      },
      dob: {
        type: DataTypes.DATE
      },
      contact_no: {
        type: DataTypes.STRING(15)
      },
      email: {
        type: DataTypes.STRING(40)
      }
    });
  
    return Employee;
  };

  

  