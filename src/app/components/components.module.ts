import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxMaskModule } from 'ngx-mask';

// bootstrap module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Sortablejs Module
import { SortablejsModule } from 'ngx-sortablejs';

import { DataListService } from '../shared/services/data-list.service';
import { DataListMyWorklistResearchService } from '../shared/services/data-list-my-worklist-research.service';

import { PositiveNumberOnlyDirective } from '../shared/directive/positiveNumber.directive';
import { PositiveNumberPriceOnlyDirective } from '../shared/directive/positiveNumberPrice.directive';

import { NgbDateConversion } from '../shared/dateConversion';

// reusable components
import { LoginFormComponent } from './login-form/login-form.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ViewAdministrationMenuComponent } from './view-administration-menu/view-administration-menu.component';
import { ViewAdministrationDefaultComponent } from './view-administration-default/view-administration-default.component';
import { MyWorklistMenuComponent } from './my-worklist-menu/my-worklist-menu.component';
import { MyWorklistMenuSecondaryComponent } from './my-worklist-menu-secondary/my-worklist-menu-secondary.component';
import { MyWorklistResearchComponent } from './my-worklist-research/my-worklist-research.component';

import { TabClaimsHistoryComponent } from './my-worklist-research-tabs/tab-claims-history/tab-claims-history.component';
import { TabEorComponent } from './my-worklist-research-tabs/tab-eor/tab-eor.component';
import { TabDetailReimbComponent } from './my-worklist-research-tabs/tab-detail-reimb/tab-detail-reimb.component';
import { TabtabAditStatusHistoryComponent } from './my-worklist-research-tabs/tab-audit-status-history/tab-audit-status-history.component';


import { DraggableLineComponent } from './draggable-line/draggable-line.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalWindowsFilterAdministrationWizardComponent } from './modal-windows/modal-windows-filter-administration-wizard/modal-windows-filter-administration-wizard.component';
import { ModalWindowsNewViewComponent } from './modal-windows/modal-windows-new-view/modal-windows-new-view.component';
import { ModalWindowsAddChargeCodeComponent } from './modal-windows/modal-windows-add-charge-code/modal-windows-add-charge-code.component';
import { ModalWindowsAddPatientAccountComponent } from './modal-windows/modal-windows-add-patient-account/modal-windows-add-patient-account.component';
import { ModalWindowsAddRevenueCptComponent } from './modal-windows/modal-windows-add-revenue-cpt/modal-windows-add-revenue-cpt.component';
import { ModalWindowsChargeCodeDetailsComponent } from './modal-windows/modal-windows-charge-code-details/modal-windows-charge-code-details.component';
import { ModalWindowsCombinedRevCptCodeDetailsComponent } from './modal-windows/modal-windows-combined-rev-cpt-code-details/modal-windows-combined-rev-cpt-code-details.component';
import { ModalWindowsContactInfoDetailsComponent } from './modal-windows/modal-windows-contact-info-details/modal-windows-contact-info-details.component';

import { ModalWindowsConfirmComponent } from './modal-windows/modal-windows-confirm/modal-windows-confirm.component';
import { ModalWindowsContactInformationComponent } from './modal-windows/modal-windows-contact-information/modal-windows-contact-information.component';
import { ModalWindowsCreateSimulatorDatasetComponent } from './modal-windows/modal-windows-create-simulator-dataset/modal-windows-create-simulator-dataset.component';
import { ModalWindowsIcdCodeDetailsComponent } from './modal-windows/modal-windows-icd-code-details/modal-windows-icd-code-details.component';
import { ModalWindowsOtherPayerTransactionsComponent } from './modal-windows/modal-windows-other-payer-transactions/modal-windows-other-payer-transactions.component';
import { ModalWindowsPaymentDetailComponent } from './modal-windows/modal-windows-payment-detail/modal-windows-payment-detail.component';
import { ModalWindowsEditLayoutComponent } from './modal-windows/modal-windows-edit-layout/modal-windows-edit-layout.component';
import { CommonTableComponent } from './common-table/common-table.component';
import { CommonTableExpandableComponent } from './common-table-expandable/common-table-expandable.component';
import { BaseDropdownComponent } from './form-base/base-dropdown/base-dropdown.component';
import { SpinnerComponent } from './spinner/spinner.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
const components = [
  LoginFormComponent,
  LeftSidebarComponent,
  ViewAdministrationMenuComponent,
  ViewAdministrationDefaultComponent,
  MyWorklistMenuComponent,
  MyWorklistMenuSecondaryComponent,
  MyWorklistResearchComponent,
  TabClaimsHistoryComponent,
  TabEorComponent,
  TabDetailReimbComponent,
  TabtabAditStatusHistoryComponent,
  DraggableLineComponent,
  PaginationComponent,
  ModalWindowsFilterAdministrationWizardComponent,
  ModalWindowsNewViewComponent,
  ModalWindowsAddChargeCodeComponent,
  ModalWindowsAddPatientAccountComponent,
  ModalWindowsAddRevenueCptComponent,
  ModalWindowsChargeCodeDetailsComponent,
  ModalWindowsCombinedRevCptCodeDetailsComponent,
  ModalWindowsContactInfoDetailsComponent,
  ModalWindowsConfirmComponent,
  ModalWindowsContactInformationComponent,
  ModalWindowsCreateSimulatorDatasetComponent,
  ModalWindowsIcdCodeDetailsComponent,
  ModalWindowsOtherPayerTransactionsComponent,
  ModalWindowsPaymentDetailComponent,
  ModalWindowsEditLayoutComponent,
  CommonTableComponent,
  CommonTableExpandableComponent,
  BaseDropdownComponent,
  SpinnerComponent,
  PositiveNumberOnlyDirective,
  PositiveNumberPriceOnlyDirective
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ClickOutsideModule,
    NgbModule,
    SortablejsModule,
    NgxMaskModule.forChild()
  ],
  declarations: [...components, SpinnerComponent],
  providers: [DataListService, DataListMyWorklistResearchService, NgbDateConversion],
  exports: [...components]
})
export class ComponentsModule {}
