import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable()

export class RestApiService {
  // definindo o caminho para a base de dados
  apiURL = 'http://localhost:3000';

  // fazendo a referencia de instancia para modificar a base de dados
  constructor(private http: HttpClient) { }

  autorizacaoAcesso = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /* 
  
  ============================================================
  
                      CONSTRUINDO A API
  
  ============================================================
  
  */

  // aqui, o metodo vai trazer todos os dados contidos na base
  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees')
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }


  // METODO PARA RECUPERAR UM UNICO REGISTRO DA BASE DE DADOS

  getEmployee(id: any): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }


  // metodo para inserir dados na base
  createEmployee(employee: any): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee),
      this.autorizacaoAcesso)
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )

  }

  updateEmployee(id: any, employee: any): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/employees/' + id,
      JSON.stringify(employee), this.autorizacaoAcesso)
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }

  deleteEmployee(id: any) {
    return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.autorizacaoAcesso)
      .pipe(
        retry(1),
        catchError(this.tratarErro)
      )
  }


  // criando uma funcao para tratar erros nas aplicacoes front e back-end

  tratarErro(erro: any) {
    // propriedade para receber um valor textual referente ao erro ocorrido.

    let mensagemErro = ''
    // verificar qual é o local - pedaço da aplicação - onde o erro ocorre
    if (erro.error instanceof ErrorEvent) {
      // tratando o erro - se aqui ocorreu no front-end
      mensagemErro = erro.error.message

    } else {
      // tratando o erro - se aqui ocorreu no back-end

      mensagemErro =
        // simbolo de crase para interpolação dos dados javascript
        `Codigo do erro: ${erro.status}\nMensagem do erro é: ${erro.messsage}`



    }

    // exibindo o erro numa mensagem de alerta
    window.alert(mensagemErro)
    return throwError(mensagemErro)
  }




}