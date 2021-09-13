import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfigService } from '../config/config.service';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  myDonut: Chart;
  myBar: Chart;
  option = "1";
  totalTr=0



  unit = ' kVA';
  peaname = {};
  peaname2 = [];
  selBudjet = ['', ''];
  selPea = '';
  selPeaName = 'กฟน.2';
  selPeapeaCode = '';
  selPeapeaCode2 = 'B000';
  currentMatherPea = "";
  currentPea = "";
  peaCode = "";
  peaNum: string;
  roicp = {};
  kvaPlnTotal = 0;
  kvaTotal = 0;
  kvaD1Total = 0;
  workCostActTRTotal: number;
  workCostActBYTotal: number;
  workCostActTotal: number;
  workCostPlnTotal: number;
  matCostActTotal: number;
  matCostPlnTotal: number;
  roicdate: string;
  car: string;
  name:string;

  constructor(private configService: ConfigService) {


      }

  ngOnInit() {


    // this.peaCode = localStorage.getItem('peaCode');
    this.name=localStorage.getItem('name');
    this.peaCode = 'B00000';
    this.peaNum = this.peaCode.substr(1, 5);
    this.selPeapeaCode = this.peaCode.substr(0, 4);
    
    this.getTrData();
    // this.getinfo();
    //this.getJobClsdPea();


  }


  checkID(){
    
    var admin=['ชานนท์  โสตถิถาวร','วีรพัฒน์  ตันยา','นพปฏล  คำแสง'];
    console.log(this.name);
    if(admin.includes(this.name)){
      return true;
    }else{
      return false;
    }
  }
  getTrData() {
    //จำนวนงานคงค้าง %เบิกจ่าย
    //this.getRoicP();
    this.configService.postdata2('/rdLoad.php', {}).subscribe((data => {
      if (data['status'] == 1) {
        var name = [];
        var point=[];

        data['data'].forEach(element => {
          name.push(element['voted']);
          point.push(element['nID']);
        });
       
        

      console.log(name,point)
      var barChartData = {
        labels: name,
        datasets: [{
          label: 'คะแนน',
          backgroundColor: [
            "#fe68af","#a92137","#44a0a5","#5593ed","#c93346","#627e48","#f958e4","#d43fbd","#7273be","#179cd5","#3074d7","#44a0a5"
          ],
          borderWidth: 1,
          data: point
        }]
  
      };
      if (this.myBar) this.myBar.destroy();
      var pcentTr=this.totalTr/23015*100
      this.myBar = new Chart('myBar', {
				type: 'bar',
				data: barChartData,
        options: {
          
          scales: {
            yAxes: [{
                  ticks:{
                    beginAtZero :true
                  }
                }]
              },

            
					indexAxis: 'y',
					// Elements options apply to all of the options unless overridden in a dataset
					// In this case, we are setting the border of each horizontal bar to be 2px wide
					elements: {
						rectangle: {
							borderWidth: 2,
						}
					},
					responsive: true,
					legend: {
						position: 'right',
					},
					title: {
						display: true,
					}
        }
      }
      )
  

      } else {
        alert(data['data']);
      }

    }));
    

  }

  onValChange(val) {
    this.option = val;
    this.getTrData();

  }
  selectBudget(event) {
    this.selBudjet = event.value;

    //this.getJobClsdPea();
    this.getTrData();
  }

}

