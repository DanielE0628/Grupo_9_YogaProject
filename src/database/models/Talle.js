module.exports = (sequelize, dataTypes) => {
    let alias = "talles";
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

    const Talle = sequelize.define(alias, cols, config);
         //las asociaciones
    Talle.associate = (models)=>{
            Talle.hasMany(models.products, {
                as: "products",
                foreingKey: "talle_id"
            });
        };
    return Talle;
}