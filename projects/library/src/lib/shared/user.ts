import { Token } from './token';
import { build } from './utils';

export class User {
    email = '';
    firstName = '';
    lastName = '';
    fullName = '';
    password = '';
    confirmPassword = '';
    userName = '';
}

export class CurrentUser extends User {

    token: Token = new Token();

    static Build(data: CurrentUser): CurrentUser {
        const token = data && data.token ? build(Token, data.token) : new Token();
        return build(CurrentUser, data, { token });
    }

    get authenticated(): boolean {
        return this.token && this.token.authenticated;
    }

    get userRoles(): UserRoles {
        return new UserRoles(this);
    }

}

export class UserRoles {

    constructor(public user: CurrentUser = new CurrentUser()) {
    }

}

export class Login {
    grant_type = 'password';
    userName = '';
    password = '';
}

export class ResetPassword {
    passwordResetCode = '';
    password = '';
    confirmPassword = '';
}
