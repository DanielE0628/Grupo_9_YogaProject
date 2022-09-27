module.exports = (sequelize, dataTypes) => {
    let alias = "categorys";
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

    const Category = sequelize.define(alias, cols, config);
    //  las asociaciones
    // Category.associate = (models)=>{
    //     Category.hasMany(models.products, {
    //         as: "products",
    //         foreingKey: "category_id"
    //     });
    // };
    return Category;
}