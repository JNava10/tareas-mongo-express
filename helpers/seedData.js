const users = [
    {
        name: 'Johnnas Doe',
        firstLastName: false,
        secondLastName: false,
        email: 'email@any.com',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const roles = [
    {
        name: 'admin'
    },

    {
        name: 'programador'
    }
];

const difficulties = [
    {
        name: 'xs'
    },

    {
        name: 's'
    },

    {
        name: 'm'
    },

    {
        name: 'l'
    },

    {
        name: 'xl'
    },
];

module.exports = {
    roles,
    difficulties
}