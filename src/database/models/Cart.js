module.exports = (sequelize, dataTypes) => {
    let alias = "carts";
    let cols ={

    id: {
    autoIncrement: true,
    primaryKey: true, 
    type:dataTypes.INTEGER
    },

    email: {
        type: dataTypes.STRING(100),
        allowNull: false
        },
    
    users_id: {
        type: dataTypes.STRING(100),
        allowNull: false
    },

    products_id: {
        type: dataTypes.STRING(100),
        allowNull: false
        },


        created_at:{
            type: dataTypes.DATE,
        },
    
        updated_at:{
            type: dataTypes.DATE,
        },
    
        available:{
            type: dataTypes.TINYINT,
        },
    };

    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const carts = sequelize.define(alias, cols, config);
    return carts;
}