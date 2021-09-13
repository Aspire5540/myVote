import { Component, ElementRef, ViewChild, OnInit, Inject } from '@angular/core';
import { loadModules } from 'esri-loader';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyService } from 'src/app/policy.service';
import { Policy } from 'src/app/policy.model'




@Component({
  selector: 'app-opsamap',
  templateUrl: './opsamap.component.html',
  styleUrls: ['./opsamap.component.css']
})
export class OpsamapComponent implements OnInit {
  

  policies: Policy[];
  
  @ViewChild('f', { static: true }) registerForm: NgForm;

  
  peaname2 = [];
  selPea = '';
  selPeaName = 'กฟน.2';
  selPeapeaCode = '';
  currentMatherPea = "";
  peaCode = "xxx";
  selCondition = 'load';
  animal: string;
  name: string;
  voted=true;
  returnUrl:string;
  constructor(private policyService: PolicyService,private router: Router, private route: ActivatedRoute,private configService: ConfigService ,private http: HttpClient, public dialog: MatDialog) { }
  ngOnInit() {
    // this.getXY();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/end';
    this.getpeaName();
    this.checkVote();
    // this.createMap();
    //this.createTable();
  }
  checkVote(){
    this.configService.postdata2('rdvote.php', {"ID":localStorage.getItem('name')}).subscribe((data => {
      if (data['status'] == 1) {
        // this.registerForm.resetForm();
        if (data["data"]){
          this.router.navigate([this.returnUrl]);

        }
        // this.router.navigate([this.returnUrl]);
        // alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))

  }
  onSubmit() {

    var data;
    data = this.registerForm.value;
    data["ID"] = localStorage.getItem('name');
    // this.wdata["user"] = localStorage.getItem('name');
    // this.wdata["peaCode"] = this.peaCode;
    console.log(this.registerForm.value);


    this.configService.postdata2('wrvote.php', this.registerForm.value).subscribe((data => {
      if (data['status'] == 1) {
        this.registerForm.resetForm();
        this.router.navigate([this.returnUrl]);
        alert("เก็บข้อมูลแล้วเสร็จ");
      } else {
        alert(data['data']);
      }

    }))


  }

 

  getpeaName() {
    var PeaNameURL = 'http://172.30.212.148/myvoteservice/PEANAME.php';
    this.http.get(PeaNameURL).subscribe((data => {
      if (data['status'] == 1) {
        data['data'].forEach(element => {
          this.peaname2.push([element.name, element.number])
        });
      } else {
        alert(data['data']);
      }
      console.log(this.peaname2)
      //this.getXY();
    }))

  }
  
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    //console.log(this.data.error);
    this.dialogRef.close();
  }

}
