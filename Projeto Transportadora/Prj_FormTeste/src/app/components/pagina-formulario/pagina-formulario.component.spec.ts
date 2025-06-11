import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFormularioComponent } from './pagina-formulario.component';

describe('PaginaFormularioComponent', () => {
  let component: PaginaFormularioComponent;
  let fixture: ComponentFixture<PaginaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
