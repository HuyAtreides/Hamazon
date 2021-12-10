import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Login page. */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../auth.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
