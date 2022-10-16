module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols ={

    id: {
    autoIncrement: true,
    primaryKey: true, 
    type:dataTypes.INTEGER
    },
    
    nombre: {
        type: dataTypes.STRING(100),
        allowNull: false
    },

    created_at:{
        type: dataTypes.DATE,
    },

    updated_at:{
        type: dataTypes.DATE,
    },

    logicDelete:{
        type: dataTypes.TINYINT,
    }

    };

    let config = {
        tableName : "users",
        timestamps: false,
         createdAt: 'created_at',
         updatedAt: 'updated_at',
        deletedAt: false
    }

    const User = sequelize.define(alias, cols, config);
    //  las asociaciones
 
    return User;
}