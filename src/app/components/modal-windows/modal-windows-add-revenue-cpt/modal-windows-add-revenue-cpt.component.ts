import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the lazy loaded ModalWindowsAddRevenueCptComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-add-revenue-cpt',
  templateUrl: 'modal-windows-add-revenue-cpt.component.html',
  styleUrls: ['modal-windows-add-revenue-cpt.component.scss']
})
export class ModalWindowsAddRevenueCptComponent {
  @Input() modalData = {
    name: ''
  };
  @Input() revenueCPTCode = [] as string[];

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  formData = {
    name: ''
  };

  isTyping = false;

  // is Shown Option
  isShownOption(name: string): boolean {
    return name.toLowerCase().indexOf(this.formData.name.toLowerCase()) > -1;
  }

  // is Form Valid
  isFormValid(): boolean {
    return this.formData.name !== '';
  }

  /**
   * close Modal
   */
  closeModal(isSave: boolean): void {
    this.closeModalWindow.emit(isSave);
  }
}
