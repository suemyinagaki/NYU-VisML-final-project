import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { QueryParametersComponent } from './views/query-parameters/query-parameters.component';
import { QueryResultsComponent } from './views/query-results/query-results.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { MetricsComponent } from './views/metrics/metrics.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatButtonToggleModule, 
    QueryParametersComponent, 
    QueryResultsComponent,
    MainViewComponent,
    MetricsComponent
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'final-project';
  public query_result: any[] = [];
  
  public getResult(event: any){
    this.query_result = event;
  }
}
