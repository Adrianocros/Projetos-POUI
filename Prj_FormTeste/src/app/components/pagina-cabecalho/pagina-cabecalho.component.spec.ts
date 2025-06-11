import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCabecalhoComponent } from './pagina-cabecalho.component';

describe('PaginaCabecalhoComponent', () => {
  let component: PaginaCabecalhoComponent;
  let fixture: ComponentFixture<PaginaCabecalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCabecalhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
