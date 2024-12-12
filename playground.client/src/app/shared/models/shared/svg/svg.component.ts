import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-svg',
    imports: [CommonModule, MatIconModule],
    templateUrl: './svg.component.html',
    styleUrl: './svg.component.scss'
})
export class SvgComponent {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  constructor() {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../images/logo.svg')
    )
  }
}
