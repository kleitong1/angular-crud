import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

    // primeira parte - criar uma "cópia (tirar uma foto)" da rota pela qual os dados circularão
    id = this.actRoute.snapshot.params['id']
    dataRecord: any = {}

    // segunda parte - criar as referencias de instancia
    constructor(
        public actRoute: ActivatedRoute,
        public router: Router,
        public restApi: RestApiService
    ) { }

    // terceira parte - priozirando o carregamento do registro e selecionando para edição
    ngOnInit(): void {
        this.restApi.getEmployee(this.id).subscribe((data: any) => {
            this.dataRecord = data
        })
    }

    // quarta parte - criar uma função para acessar a REST API e usar o método para atualizar o registro
    updateRecord() {
        if (window.confirm('Do you really want to edit the record?')) {
            this.restApi.updateEmployee(this.id, this.dataRecord).subscribe(() => {
                this.router.navigate(['/employees-list'])
            })
        }
    }

}