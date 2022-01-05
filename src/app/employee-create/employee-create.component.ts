import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {

  // primeira parte - criando a proppriedade que receberá os dados

  @Input() employeeDetails = {

    name: '',
    email: '',
    phone: ''
  }

  // segunda parte - definindo as referencias da instancia do construtor

  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  // terceira parte - criar um função para acessar o metódo REST API para armazenar um registro


  // uso da Arrow Function (data:{}) =>
  addEmployee(){
    this.restApi.createEmployee(this.employeeDetails).subscribe((data:{}) => {
      this.router.navigate(['/employees-list'])
    })
  }


}
