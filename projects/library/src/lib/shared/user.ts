import { Validators as NgValidators } from '@angular/forms';

import { Metadata } from './models';
import { Token } from './token';
import { build } from './utils';
import {
  confirmPasswordValidator,
  Validators,
  passwordValidator
} from '../forms/validators';

export class User {
  id = 0;
  email = '';
  firstName = '';
  lastName = '';
}

export class CurrentUser extends User {
  lastActive: Date;
  token: Token = new Token();

  static Build(data: CurrentUser): CurrentUser {
    const token = data && data.token ? build(Token, data.token) : new Token();
    return build(CurrentUser, data, { token });
  }

  get authenticated(): boolean {
    return this.token && this.token.authenticated;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get userRoles(): UserRoles {
    return new UserRoles(this);
  }
}

export class UserRoles {
  constructor(public user: CurrentUser = new CurrentUser()) {}
}

export class Login {
  grant_type = 'password';
  userName = '';
  password = '';
}

export class NewUser {
  email = '';
  password = '';
  confirmPassword = '';
  firstName = '';
  lastName = '';

  get metadata(): Metadata {
    return build(Metadata, {
      ignore: [],
      validators: [confirmPasswordValidator],
      firstName: {
        validators: [NgValidators.required]
      },
      lastName: {
        validators: [NgValidators.required]
      },
      email: {
        validators: [NgValidators.required, Validators.email]
      },
      password: {
        validators: [NgValidators.required, passwordValidator]
      },
      confirmPassword: {
        validators: [NgValidators.required]
      }
    });
  }
}

export class ResetPassword {
  passwordResetCode = '';
  password = '';
  confirmPassword = '';
}
