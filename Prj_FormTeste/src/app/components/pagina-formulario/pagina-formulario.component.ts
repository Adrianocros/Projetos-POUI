import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button'

import { ShippingCompany } from '../../ShippingCompany';

import { HttpClient, HttpHeaders } from '@angular/common/http' 
import { Buffer } from 'buffer';

import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatSnackBar} from '@angular/material/snack-bar'




@Component({
  selector: 'app-pagina-formulario',
  imports: [MatInputModule,MatFormFieldModule,MatDividerModule,MatButtonModule,MatSnackBarModule],
  templateUrl: './pagina-formulario.component.html',
  styleUrl: './pagina-formulario.component.css'
})
export class PaginaFormularioComponent implements OnInit{
  
  //Dados da interface
  shippingValues: ShippingCompany = {
    cnpj: "",
    name: "",
    email: "",
  }; 

//Dados de autenticação no Protheus
private user: string = "acrosoletto.as";
private pass: string = "dHYxQDIwMjQ=";
private bearerToken: string = "";
private lastTime: number = new Date().getTime();//Variavel que contem a ultima hora do token 
constructor(
    private http:HttpClient,
    private snackbar : MatSnackBar
  ){}

  ngOnInit(): void {
  this.generateToken();
    }

  //Aciona o REST para gerar o Token
  generateToken():void{
    var passDecode = Buffer.from(this.pass, 'base64').toString('binary');
    var minutestTst  =  1000;//2400000;//2.400.00 millessegundos são 40 minutos
    var currentTime = new Date().getTime();

    //Se o token tiver vazio, ou tiver passaso os 40 minutos 
if((this.bearerToken.length == 0) || (currentTime > this.lastTime + minutestTst)){
  
    //Realiza um post no protheus para gerar o Bearer
    this.http.post<any>('http://172.30.1.82:11001/rest/api/oauth2/v1/token?grant_type=password&password=' + passDecode + '&username=' + this.user, {/*jason*/}).subscribe({
      next:(v)=> {
        this.bearerToken = v.access_token;
        this.lastTime = new Date().getTime();//Atualiza com a ultima hora do token
      },
      error:(e)=>{
       // console.log("Falha ao gerar o Token" + e.status + " - " + e.statusText)
       this.snackbar.open("Falha ao gerar o Token, contate o administrador! ", "Fechar",{duration:5000})
      },
      complete:() =>{
        console.log("Buscando o Berer Token completa")
      }
    })
  }
}

  //Campo CNPJ
  validCNPJImput(): void{
    var cnpjValue = (document.getElementById('cnpj') as HTMLInputElement).value;

    //Adiciona a gerção do Token, cado tenha expirado
    this.generateToken();
  
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("email")as HTMLInputElement).value = ""; 

    var httpOptions = {
      headers:new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer' + this.bearerToken
      })
    };
    //GET no protheus para buscar transportadores
    this.http.get<any>('http://172.30.1.82:11001/rest/zwstransport/get_id?id=' + cnpjValue,httpOptions).subscribe({
      next:(v)=> {
        (document.getElementById("name") as HTMLInputElement).value = v.nome.trim();
        (document.getElementById("email")as HTMLInputElement).value = v.email.trim(); 
      },
      error:(e)=>{
        //console.log("Falha ao buscar transportadora: " + e.status + " _ " + e.statusText)
        this.snackbar.open("Falha ao buscar transportadora, verifique os paramentros !","Fechar",{duration:5000})
      },
      complete:()=>{
        console.log("Busca transportadorea completa")
      }
    })
  }


  //Botao confirmar
  clickeOnConfirm(): void{
    var cnpjValue = (document.getElementById("cnpj") as HTMLInputElement).value;
    var nameValue = (document.getElementById("name") as HTMLInputElement).value;
    var emailValue = (document.getElementById("email")as HTMLInputElement).value; 

    //Adiciona a gerção do Token, cado tenha expirado
    this.generateToken();

    //Define a interface
    this.shippingValues.cnpj = cnpjValue;
    this.shippingValues.name = nameValue;
    this.shippingValues.email = emailValue;

    //alert("Clicou no botao confirmar: \n CNPJ:" + cnpjValue + "\n Nome: " + nameValue + "\n eMail: " + emailValue);
   // alert("Clicou no botao confirmar: \n CNPJ:" + this.shippingValues.cnpj + "\n Nome: " + this.shippingValues.name + "\n eMail: " +     this.shippingValues.email);
   //Monta o header da requisição
   var httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer' + this.bearerToken
    })
   }
   //Monta os paramentos no body com json de envio das informações
   var httpBody = {
    "cgc": this.shippingValues.cnpj,
    "nome": this.shippingValues.name,
    "email": this.shippingValues.email
   }

   //Realiza um post no protheus para atualizr as novas informações na tabela de transpotadoras
   this.http.post<any>('http://172.30.1.82:11001/rest/zwstransport/new', httpBody,httpOptions).subscribe({
    next:(v) =>{
        this.clickeOnClear();
        this.snackbar.open("Transportadora alterada com sucesso !","Fechar",{duration:5000})
    },
    error:(e)=>{
      //console.error("Falha na gravação da Transportadores" + e.status + " - " + e.statusText)
      this.snackbar.open("Falha ao cadastrar transportadora, verifique os paramentros !","Fechar", {duration:5000})
    },
    complete:() =>{
      console.log("Gravação da transportadora completa")
    }
   })

  }

  //Botão Limpar
  clickeOnClear(): void{
    (document.getElementById("cnpj") as HTMLInputElement).value = "";
    (document.getElementById("name") as HTMLInputElement).value = "";
    (document.getElementById("email")as HTMLInputElement).value = ""; 
  }


}