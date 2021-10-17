import { Component, Output, EventEmitter } from '@angular/core';
import { LoginFormModel } from '../../model/loginForm.model';

/**
 * This class represents the lazy loaded LoginFormComponent.
 */
@Component({
  selector: 'app-sd-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.scss']
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<LoginFormModel>();

  formData: LoginFormModel = {
    username: '',
    password: '',
    serverName: '',
    databaseName: ''
  };

  showError = false;

  constructor() {}

  // is Form Valid
  isFormValid(): boolean {
    return (
      this.formData.username !== '' &&
      this.formData.password !== '' &&
      this.formData.serverName !== '' &&
      this.formData.databaseName !== ''
    );
  }

  // click Login
  clickLogin(): void {
    this.login.emit(this.formData);
  }
}
