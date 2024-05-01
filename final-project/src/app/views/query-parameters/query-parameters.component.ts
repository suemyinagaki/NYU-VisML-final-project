import { Component } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-query-parameters',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatSliderModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './query-parameters.component.html',
  styleUrl: './query-parameters.component.scss'
})
export class QueryParametersComponent {

  constructor(private http: HttpClient) {}
  
  @Output() newItemEvent = new EventEmitter<any[]>();

  public overlap_area: number = 0;
  public people_scene: number = 0;
  public bot_confidence: number = 0.0;
  public byte_confidence: number = 0.0;
  public sort_by: string = "area";
  public result: any[] = [];
  private url: string = '../../../assets/data/frames.json';
  private real_data: any;


  ngAfterViewInit(){
    this.http.get(this.url).subscribe(res => {
      this.real_data = res;
    });
    
  }

  public clearParameters(){
    this.overlap_area = 0;
    this.people_scene = 0;
    this.bot_confidence = 0.0;
    this.byte_confidence = 0.0;
  }
  public query(){
    this.result = [];
    this.result = d3.filter(this.real_data, d=>d.n_people >= this.people_scene && d["botsort"]["score"] <= this.bot_confidence)
    
    if (this.sort_by === 'area'){
      console.log("area")
      //this.result.sort((a, b) => -a.area + b.area);
    }else if(this.sort_by === 'people'){
      this.result.sort((a, b) => -a.n_people + b.n_people);
    }else if(this.sort_by === 'bot'){
      this.result.sort((a, b) => a['botsort']['score'] - b['botsort']['score']);
    }else{
      console.log("bytetrack")
      //this.result.sort((a, b) => a.byte_conf - b.byte_conf);
    }
    this.newItemEvent.emit(this.result);
  }
}
