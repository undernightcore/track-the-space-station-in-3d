import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCanvasComponent } from './three-canvas.component';

describe('ThreeCanvasComponent', () => {
  let component: ThreeCanvasComponent;
  let fixture: ComponentFixture<ThreeCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
