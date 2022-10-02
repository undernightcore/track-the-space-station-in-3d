import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainUiComponent } from './main-ui.component';

describe('MainUiComponent', () => {
  let component: MainUiComponent;
  let fixture: ComponentFixture<MainUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
