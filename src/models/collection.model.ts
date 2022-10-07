import { Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {

    const Collection = sequelize.define('collection', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
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
            type: DataTypes.STRING,
            allowNull:false,
        },
        image: {
            type: DataTypes.STRING(2048)
        }
    }, {
        timestamps: false,
    });

    return Collection;
};