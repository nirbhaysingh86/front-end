import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  private requestCount = 0;
  public get loading(): boolean {
    return this.requestCount > 0;
  }

  /**
   * ongoing request increase
   */
  increase(): void {
    this.requestCount++;
  }

  /**
   * ongoing request decrease
   */
  decrease(): void {
    this.requestCount--;
  }
}
