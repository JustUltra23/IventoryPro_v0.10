import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanaComponent } from './humana.component';

describe('HumanaComponent', () => {
  let component: HumanaComponent;
  let fixture: ComponentFixture<HumanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HumanaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HumanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
