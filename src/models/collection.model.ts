import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {

    const Collection = sequelize.define('collection', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        authorId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        theme: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull:false,
        },
        image: {
            type: DataTypes.STRING(150)
        }
    }, {
        timestamps: false,
    });

    return Collection;
};