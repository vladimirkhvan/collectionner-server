import { Sequelize, DataTypes } from 'sequelize';

export default async (sequelize: Sequelize) => {

    const Tag = sequelize.define('tag', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: false,
    });

    return Tag;
};