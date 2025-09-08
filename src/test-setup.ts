import { NgZone, ɵNoopNgZone, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export function setupZonelessTestEnvironment() {
  TestBed.configureTestingModule({
    providers: [{ provide: NgZone, useClass: ɵNoopNgZone }, provideZonelessChangeDetection()],
  });
}
