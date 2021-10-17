import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoginFormModel } from '../../model/loginForm.model';
import { SpinnerService } from '../../shared/services/spinner.service';

/**
 * This class represents the lazy loaded LoginPageComponent.
 */
@Component({
  selector: 'app-sd-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss']
})
export class LoginPageComponent {
  isShownTermsConditions = false;
  redirectTo = '';

  /**
   * Creates an instance of the LoginPageComponent with the injected
   * DataListService.
   */
  constructor(private authService: AuthService, private router: Router, public spinnerService: SpinnerService) {
    this.redirectTo = this.router.getCurrentNavigation()?.extras.state?.redirectTo;
  }

  /**
   * user login
   * @param form form data
   */
  login(form: LoginFormModel): void {
    this.authService.login(form.username, form.password, form.serverName, form.databaseName).subscribe(() => {
      this.router.navigate([this.redirectTo ? this.redirectTo : '/view-administration-page']);
    });
  }
}
