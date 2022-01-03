import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {

  @Input() title = 'title is missing';

  constructor() { }

  ngOnInit() {}

}
