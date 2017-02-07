import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayState, OverlayRef, TemplatePortal } from '@angular/material';

@Directive({
  selector: '[appOverlay]'
})
export class OverlayDirective implements OnDestroy {
  private _overlayRef: OverlayRef;
  private _templatePortal: TemplatePortal;
  private _open = false;
  private _hasBackdrop = true;
  private _position;

  get hasBackdrop() {
    return this._hasBackdrop;
  }

  @Input()
  get open() {
    return this._open;
  }

  set open(value: boolean) {
    value ? this._attachOverlay() : this._detachOverlay();
    this._open = value;
  }

  constructor(
      private _overlay: Overlay,
      templateRef: TemplateRef<any>,
      viewContainerRef: ViewContainerRef) {
    this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
  }

  get overlayRef(): OverlayRef {
    return this._overlayRef;
  }

  ngOnDestroy() {
    this._destroyOverlay();
  }

  private _createOverlay() {
    this._overlayRef = this._overlay.create(this._buildConfig());
  }

  private _buildConfig(): OverlayState {
    const overlayConfig = new OverlayState();

    overlayConfig.hasBackdrop = this.hasBackdrop;

    this._position = this._createPositionStrategy();
    overlayConfig.positionStrategy = this._position;

    return overlayConfig;
  }

  private _createPositionStrategy() {
    const strategy = this._overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return strategy;
  }

  private _attachOverlay() {
    if (!this._overlayRef) {
      this._createOverlay();
    }

    if (!this._overlayRef.hasAttached()) {
      this._overlayRef.attach(this._templatePortal);
    }
  }

  private _detachOverlay() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

  private _destroyOverlay() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }
}
