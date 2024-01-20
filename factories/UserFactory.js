const User = require("../models/user");
const Constants = require("../helpers/constants");
const e = require("express");

class UserFactory {

    static password = Constants.userDefaultPassword;
    static names = ['Badr', 'Jaime', 'Oscar', 'Fran', 'Patricia'];

    // TODO: Faker JS.
    static create = (quantity) => {
        let users = [];

        for (let i = 0; i < quantity; i++) {
            let name = UserFactory.getName();
            let email = UserFactory.getEmail(name);
            let user = User.build({
                name: name,
                firstLastName: 'Apellido',
                secondLastName: 'Apellido',
                email: email,
                password: UserFactory.password
            });

            users.push(user)
        }

        return users;
    }

    static getEmail = (name) => {
        return `${name}@gmail.com`
    }

    static getName = () => {
        let index = Math.floor(Math.random() * UserFactory.names.length)

        return UserFactory.names[index];
    }
}

module.exports = UserFactory;