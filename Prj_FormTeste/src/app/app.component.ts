import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginaCabecalhoComponent } from './components/pagina-cabecalho/pagina-cabecalho.component';
import { PaginaFormularioComponent } from './components/pagina-formulario/pagina-formulario.component';
import { PaginaRodapeComponent } from './components/pagina-rodape/pagina-rodape.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http' 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PaginaCabecalhoComponent,PaginaFormularioComponent,PaginaRodapeComponent,FontAwesomeModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Prj_FormTeste';
}
