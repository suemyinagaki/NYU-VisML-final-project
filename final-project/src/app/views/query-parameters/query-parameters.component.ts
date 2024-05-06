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

  public overlap_boxes: number = 0;
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
    this.overlap_boxes = 0;
    this.people_scene = 0;
    this.bot_confidence = 0.0;
    this.byte_confidence = 0.0;
  }
  public query(){
    this.result = [];
    for (let i = 0; i < this.real_data.length; i++){
      for (let j = 0; j < this.real_data[i]["botsort"].length; j++){
        if(!Object.keys(this.real_data[i]["botsort"][j]).includes("n_people")){
          console.log("ERRO0 Botsort", i, j, this.real_data[i]["botsort"][j])
        }
      }
      for (let j = 0; j < this.real_data[i]["bytetrack"].length; j++){
        if(!Object.keys(this.real_data[i]["bytetrack"][j]).includes("n_people")){
          console.log("ERRO0 Bytetrack", i, j, this.real_data[i]["bytetrack"][j])
        }
      }
    }
    let a = d3.filter(this.real_data, (d: any) => ((d["botsort"].length > 0 && d["botsort"][0]["n_people"] >= this.people_scene)))
    console.log(a)

    this.result = d3.filter(this.real_data, (d: any) => (
      ((d["botsort"].length > 0 && d["botsort"][0]["n_people"] >= this.people_scene) ||
      (d["bytetrack"].length > 0 && d["bytetrack"][0]["n_people"] >= this.people_scene)) && 
      d["botsort_avg_score"] <= this.bot_confidence && 
      d["bytetrack_avg_score"] <= this.byte_confidence && 
      ((d["botsort"].length > 0 && d["botsort"][0]["overlapping_bboxes"] >= this.overlap_boxes) ||
      (d["bytetrack"].length > 0 && d["bytetrack"][0]["overlapping_bboxes"] >= this.overlap_boxes))
    ))
    
    console.log(this.result)
    if (this.sort_by === 'overlap'){
      this.result.sort((a, b) => -a["botsort"][0]["overlapping_bboxes"] + b["botsort"][0]["overlapping_bboxes"]);
    }else if(this.sort_by === 'people'){
      this.result.sort((a, b) => -a["botsort"][0]["n_people"] + b["botsort"][0]["n_people"]);
    }else if(this.sort_by === 'bot'){
      this.result.sort((a, b) => a['botsort_avg_score'] - b['botsort_avg_score']);
    }else{
      this.result.sort((a, b) => a['bytetrack_avg_score'] - b['bytetrack_avg_score']);
    }
    this.newItemEvent.emit(this.result);
  }
}
