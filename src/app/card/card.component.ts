import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input('my-User') myUser: any = null;
  @Input('login') log: any = null;
  @Input('url') giturl: any = null;
  @Input('user-id') userId: any = null;

  @Output() deleteUser = new EventEmitter();

  removeUser(id: number) {
    this.deleteUser.emit({ id: id });
  }
}
