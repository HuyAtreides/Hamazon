import { Component, ChangeDetectionStrategy } from '@angular/core';

/** Layout wrapper contains navbar header with navigation links. */
@Component({
  selector: 'app-navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarHeaderComponent {}
