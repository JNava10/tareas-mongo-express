class SeedData {
    static users = [
        {
            name: 'Johnnas Doe',
            firstLastName: false,
            secondLastName: false,
            email: 'email@any.com',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    static roles = [
        {
            name: 'admin'
        },

        {
            name: 'programador'
        }
    ];

    static difficulties = [
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
}

module.exports = SeedData