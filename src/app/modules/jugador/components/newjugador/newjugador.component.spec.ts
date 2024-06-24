import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjugadorComponent } from './newjugador.component';

describe('NewjugadorComponent', () => {
  let component: NewjugadorComponent;
  let fixture: ComponentFixture<NewjugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewjugadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewjugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
