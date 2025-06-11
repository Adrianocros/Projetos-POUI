import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRodapeComponent } from './pagina-rodape.component';

describe('PaginaRodapeComponent', () => {
  let component: PaginaRodapeComponent;
  let fixture: ComponentFixture<PaginaRodapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaRodapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaRodapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
