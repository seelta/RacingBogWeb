import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensualidadComponent } from './mensualidad-jugador.component';

describe('MensualidadComponent', () => {
  let component: MensualidadComponent;
  let fixture: ComponentFixture<MensualidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MensualidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensualidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
