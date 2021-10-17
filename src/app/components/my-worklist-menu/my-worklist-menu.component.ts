import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GetViewsResponseModel } from '../../model/responses/getViewsResponse.model';
import { CreateViewResponseModel } from '../../model/responses/createViewResponse.model';
import { GetLayoutsResponseModel, LayoutResponse } from '../../model/responses/getLayoutsResponse.model';
import { AuthService } from '../../shared/services/auth.service';

/**
 * This class represents the lazy loaded MyWorklistMenuComponent.
 */
@Component({
  selector: 'app-sd-my-worklist-menu',
  templateUrl: 'my-worklist-menu.component.html',
  styleUrls: ['my-worklist-menu.component.scss']
})
export class MyWorklistMenuComponent {
  @Input() menuCollapsed = false;
  @Input() hasSelectedAccounts = false;
  @Input() isShownResearch = false;
  @Input() viewOptions: GetViewsResponseModel = [];
  @Input() selectedView?: CreateViewResponseModel;
  @Input() layoutOptions: GetLayoutsResponseModel = [];
  @Input() selectedLayout?: LayoutResponse;
  @Output() selectedLayoutChange: EventEmitter<LayoutResponse> = new EventEmitter();
  @Output() selectedViewChange: EventEmitter<CreateViewResponseModel> = new EventEmitter();
  @Output() clickMenu: EventEmitter<any> = new EventEmitter();
  @Output() toggleResearch: EventEmitter<any> = new EventEmitter();
  @Output() clickMenuOptions: EventEmitter<string> = new EventEmitter();
  @Output() clickLogout: EventEmitter<void> = new EventEmitter();
  @Output() createLayout: EventEmitter<void> = new EventEmitter();
  @Output() editLayout: EventEmitter<void> = new EventEmitter();
  @Output() setDefaultLayout: EventEmitter<void> = new EventEmitter();
  @Output() deleteLayout: EventEmitter<void> = new EventEmitter();

  isOpenedModify = false;
  isOpenedAction = false;
  isOpenedSearch = false;
  isOpenedHelp = false;

  searchType = 'Patient Number';
  searchText = '';

  typeDropdown = 'Default';

  typeOptions = ['Summary', 'Detail'];

  constructor(private authService: AuthService) {}

  // click Modify
  clickModify(): void {
    this.isOpenedModify = !this.isOpenedModify;
  }

  // click Action
  clickAction(): void {
    this.isOpenedAction = !this.isOpenedAction;
  }

  // click Search
  clickSearch(): void {
    this.isOpenedSearch = !this.isOpenedSearch;
  }

  // click Help
  clickHelp(): void {
    this.isOpenedHelp = !this.isOpenedHelp;
  }

  /**
   * check if layout belongs to current user
   * @returns check result
   */
  layoutBelongsToUser(): boolean {
    if (this.selectedLayout && this.authService.user) {
      return this.authService.user.UserId === this.selectedLayout.userId?.toString();
    }
    return false;
  }

  /**
   * check if set as default button should be enabled
   * @returns check result
   */
  defaultLayoutEnabled(): boolean {
    if (this.selectedLayout) {
      return this.layoutBelongsToUser() && !this.selectedLayout.isDefault;
    }
    return false;
  }
}
