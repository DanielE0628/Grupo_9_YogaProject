module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {

        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart: {
            type: dataTypes.STRING(),
        },

        avatar: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        Email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        password: {
            type: dataTypes.STRING(60),
            allowNull: false
        },

        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },

        birthdate: {
            type: dataTypes.STRING(10),
            allowNull: false
        },

        created_at: {
            type: dataTypes.DATE,
        },

        updated_at: {
            type: dataTypes.DATE,
        },

        logicDelete: {
            type: dataTypes.TINYINT,
        }

    };

    let config = {
        tableName: "users",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const User = sequelize.define(alias, cols, config);
    //  las asociaciones

    User.associate = (models) => {
        User.belongsTo(models.Carts, {
            as: "carts",
            foreignKey: "user_id"
        });
    }

    return User;
}