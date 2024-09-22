import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class NotificationComponent {
  visible = false;
  message = 'This is a notification';

  show(message: string, duration: number = 3000) {
    this.message = message;
    this.visible = true;
    setTimeout(() => this.close(), duration);
  }

  close() {
    this.visible = false;
  }
}
