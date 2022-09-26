module.exports = (sequelize, dataTypes) => {
    let alias = "products";
    let cols ={

    id: {
    autoIncrement: true,
    primaryKey: true,
    type:dataTypes.INTEGER
    },

    name: {
        type: dataTypes.STRING(100),
        allowNull: false
    },

    category_id:{
        type: dataTypes.INTEGER,
        allowNull: false
    },

    price:{
        type: dataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    description:{
        type: dataTypes.TEXT,
    },

    talle_id:{
        type: dataTypes.INTEGER,
        allowNull: false
    },

    marca_id:{
        type: dataTypes.INTEGER,
        allowNull: false
    },

    stock:{
        type: dataTypes.INTEGER,
    },

    image:{
        type: dataTypes.STRING(500),
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
    }
    };

    let config = {
        tabeName:"products",
        timestamps: false,
   
    }

    const Product = sequelize.define(alias, cols, config);
    //asociaciones
    Product.associate = (models)=>{
        Product.belongsTo(models.categorys, {
            as: "categorys",
            foreingKey: "category_id"
        });
        Product.belongsTo(models.marcas, {
            as: "marcas",
            foreingKey: "marca_id"
        });
        Product.belongsTo(models.talles, {
            as: "talles",
            foreingKey: "marca_id"
        });
    };

    return Product;
}