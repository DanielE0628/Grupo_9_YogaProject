module.exports = (sequelize, dataTypes) => {
    let alias = "marcas";
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

    category_id: {
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

    const marcas = sequelize.define(alias, cols, config);
    return marcas;
}