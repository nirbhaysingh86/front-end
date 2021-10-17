import { Component, Input, OnInit } from '@angular/core';

/**
 * This class represents the lazy loaded TabEorComponent.
 */
@Component({
  selector: 'app-sd-tab-eor',
  templateUrl: 'tab-eor.component.html',
  styleUrls: ['tab-eor.component.scss']
})
export class TabEorComponent implements OnInit {
  @Input() dataList: any = {};

  ngOnInit() {
    this.dataList;
  }
}
