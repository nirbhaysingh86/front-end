import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the lazy loaded ModalWindowsAddChargeCodeComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-add-charge-code',
  templateUrl: 'modal-windows-add-charge-code.component.html',
  styleUrls: ['modal-windows-add-charge-code.component.scss']
})
export class ModalWindowsAddChargeCodeComponent {
  @Input() modalData = {
    name: ''
  };
  @Input() chargeCode = [] as string[];

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
