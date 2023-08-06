'use strict'
const {
    Model
} = require('sequelize')
const { hashPassword } = require('../../utils/common')

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Users.belongsToMany(models.Solutions, {
                through: models.UserSolutions,
                foreignKey: 'responsibleId'
            })
            Users.belongsToMany(models.Quizzes, {
                through: models.UserQuizzes,
                foreignKey: 'userId'
            })
            Users.belongsTo(models.Roles, {
                foreignKey: 'roleId'
            })
            Users.belongsTo(models.Companies, {
                foreignKey: 'companyId'
            })
        }
    }
    Users.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4
        },
        companyId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'companies',
                key: 'id'
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                msg: 'This username is already taken'
            },
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: 'This email is already taken'
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'Users',
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeCreate: async function (user) {
                const newPass = await hashPassword(10, user.password)
                user.password = newPass
            },
            beforeUpdate: async function (user) {
                if(user.changed('password')){
                    const newPass = await hashPassword(10, user.password)
                    user.password = newPass  
                }
            }
        }
    })
    return Users
}