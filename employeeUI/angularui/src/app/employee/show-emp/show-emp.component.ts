import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(
    private service: SharedService,
    private toastrService: ToastrService
  ) { }

  @ViewChild('closeModal') closeModal: ElementRef;

  EmployeeList: any = [];

  ModalTitle: string;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;
  EmployeeNameFilter: string = "";
  EmployeeListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp = {
      EmployeeId: 0,
      EmployeeName: "",
      Department: "",
      DateOfJoining: "",
      PhotoFileName: "anonymous.png"
    }
    this.ModalTitle="Adicionar Colaborador(a)";
    this.ActivateAddEditEmpComp = true;
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
      this.EmployeeListWithoutFilter = data;
      this.sortResult('EmployeeId', true);
    });
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  editClick(item) {
    this.emp = item;
    this.ModalTitle = "Editar Colaborador(a)";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item){
    if(confirm('Tem certeza? Esta ação não poderá ser desfeita.')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data => {
        this.toastrService.success(data.toString());
        this.refreshEmpList();
      })
    }
  }

  FilterFn() {
    var EmployeeNameFilter = this.EmployeeNameFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter(function (el) {
      return el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop, asc) {
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function(a, b) {
      if(asc) {
        return (a[prop] > b[prop])? 1 : ((a[prop] < b[prop]) ?-1 : 0);
      } else {
        return (b[prop] > a[prop])? 1 : ((b[prop] < a[prop]) ?-1 : 0);
      }
    })
  }

  receiveEvent(clicked) {
    if(clicked = true) {
      this.closeModal.nativeElement.click();
    }
  }
}
