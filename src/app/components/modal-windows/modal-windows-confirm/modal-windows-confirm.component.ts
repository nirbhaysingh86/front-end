import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * This class represents the lazy loaded ModalWindowsConfirmComponent.
 */
@Component({
  selector: 'app-sd-modal-windows-confirm',
  templateUrl: 'modal-windows-confirm.component.html',
  styleUrls: ['modal-windows-confirm.component.scss']
})
export class ModalWindowsConfirmComponent {
  @Input() modalData = {
    name: ''
  };
  @Input() confirmModalData = {
    title: '',
    description: '',
    sourceModal: ''
  };

  @Output() closeModalWindow: EventEmitter<boolean> = new EventEmitter();

  // is Form Valid
  isFormValid(): boolean {
    return true;
  }

  /**
   * close Modal
   */
  closeModal(isSave: boolean): void {
    this.closeModalWindow.emit(isSave);
  }
}
