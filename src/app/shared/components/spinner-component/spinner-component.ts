import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-spinner-component',
  imports: [],
  standalone:true,
  templateUrl: './spinner-component.html',
  styleUrl: './spinner-component.css',
})
export class SpinnerComponent {
    constructor(public loading: LoadingService) {}


}
