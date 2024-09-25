import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosFinancierosComponent } from './estados-financieros.component';

describe('EstadosFinancierosComponent', () => {
  let component: EstadosFinancierosComponent;
  let fixture: ComponentFixture<EstadosFinancierosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadosFinancierosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadosFinancierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
