const {Repository} = require('./Repository');

class AuthRepository extends Repository{
    constructor() {
        super();
    }
}

exports.AuthRepository = AuthRepository;