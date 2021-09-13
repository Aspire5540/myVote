import { Component} from '@angular/core';
import { Subject } from 'rxjs';
import {LoaderserviceService} from '../config/loaderservice.service'
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderserviceService){
  }
}