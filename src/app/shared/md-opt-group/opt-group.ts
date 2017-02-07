import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'md-opt-group, mat-opt-group',
  templateUrl: 'opt-group.html',
  styleUrls: ['opt-group.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MdOptGroup {
  @Input() label: any;
}
