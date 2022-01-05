import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
// primeira parte - criar uma propriedade para ser a colecao iteravel de dados
  listEmployees: any = []

// segunda parte - a referencia de instancia da REST API
  constructor(
    public restApi: RestApiService
  ) { }

// terceira parte - priorizando a chamada da funcao loadEmployees para gerar uma lista no component
  ngOnInit(): void {
    this.loadEmployees()
  }

// quarta parte - criar a funcao para acessar a REST API e carregar todos os dados no component
  loadEmployees(){
    return this.restApi.getEmployees().subscribe((data:{}) => {
      this.listEmployees = data
    })
  }

  // quinta parte - funcao para acessar a REST API -> excluir um registro
  deleteEmployee(id:any){
    if(window.confirm('Do you really want to delete the record?')){
      this.restApi.deleteEmployee(id).subscribe(data => {
        this.loadEmployees()})
    }
  }

}