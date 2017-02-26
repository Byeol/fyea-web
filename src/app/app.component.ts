import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UCDS';

  navItems = [
    {
      name: '데이터 관리',
      link: 'data'
    },
    {
      name: '설문결과 조회',
      link: 'stats'
    }
  ];
}
