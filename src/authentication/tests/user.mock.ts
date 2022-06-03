import User from '../../users/entities/user.entity';

const mockedUser: User = {
    id: 1,
    email: 'user@email.com',
    name: 'John',
    password: 'hash',
    address: {
        id: 1,
        street: 'streetName',
        city: 'cityName',
        country: 'countryName'
    },
    isTwoFactorAuthenticationEnabled: false,
    isEmailConfirmed: false,
    created_at: null,
    updated_at: null
}

export default mockedUser;