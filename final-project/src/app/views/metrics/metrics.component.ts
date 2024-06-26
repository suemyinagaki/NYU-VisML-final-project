import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTableModule
  ],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent {
  constructor(private http: HttpClient) {}

  @Input() current_frame: any[] = [];
  @Input() frame_slider: number = 0;

  public title: string = "";
  public botsort_n_people: number = 0;
  public bytetrack_n_people: number = 0;
  public botsort_score: number = 0.0;
  public bytetrack_score: number = 0.0;
  private url: string = '../../../assets/data/frames.json';
  private all_data: any;
  private frame: any;
  public botsort_bbox_list: any[] = [];
  public bytetrack_bbox_list: any[] = [];
  public botsort_score_list: any[] = [{'id': '-', 'score': '-'}, {'id': '-', 'score': '-'}, {'id': '-', 'score': '-'}, {'id': '-', 'score': '-'}, {'id': '-', 'score': '-'}];
  public bytetrack_score_list: any[] = [{'id': '-', 'score': '-'}, {'id': '-', 'score': '-'}, {'id': '-', 'score': '-'}, {'id': '-', 'score': '-'}, {'id': '-', 'score': '-'}];
  public displayedColumns: string[] = ['ID', 'Score'];
  public botsort_overlaps: number = 0;
  public bytetrack_overlaps: number = 0;
/*
  {
    "filename": "chase_1_sensor_1_left",
    "frame": "1",
    "botsort": {
        "people_id": "1",
        "bbox": [
            "1399.68",
            "373.92",
            "94.77",
            "243.00"
        ],
        "score": "0.92",
        "overlapping_bboxes": 0
    },
    "n_people": 4
},*/


/*
  EU TENHO QUE ABRIR O JSON AQUI TAMBEM, POIS PRECISO PEGAR TODOS OS IDS QUE ESTAO RELACIONADOS COM ESSE FRAME PRA MOSTRAR,
  MAS O DADO QUE EU RECEBO EH DE UM UNICO ID. 
*/
  ngOnChanges(changes: any) {
    for (const propName in changes) {
      const chng = changes[propName];

      if(propName == 'current_frame'){
        if (chng.currentValue){
          this.title = chng.currentValue['filename']; 
          this.frame = chng.currentValue['frame']; 
          this.botsort_n_people = chng.currentValue['botsort'][0]['n_people'];
          this.bytetrack_n_people = chng.currentValue['bytetrack'][0]['n_people'];
          this.botsort_score = chng.currentValue['botsort_avg_score']
          this.bytetrack_score = chng.currentValue['bytetrack_avg_score']
          this.botsort_overlaps = chng.currentValue['botsort'][0]['overlapping_bboxes'];
          this.bytetrack_overlaps = chng.currentValue['bytetrack'][0]['overlapping_bboxes'];

          this.botsort_score_list = chng.currentValue['botsort'].sort((a: any, b: any) => d3.descending(a['score'], b['score'])).slice(0,5).map((d: any)=>({'id': d['people_id'], 'score': d['score']}));
          this.bytetrack_score_list = chng.currentValue['bytetrack'].sort((a: any, b: any) => d3.descending(a['score'], b['score'])).slice(0,5).map((d: any)=>({'id': d['people_id'], 'score': d['score']}));
          while(this.botsort_score_list.length < 5){
            this.botsort_score_list.push({"id": "-", "score": "-"})
          }
          while(this.bytetrack_score_list.length < 5){
            this.bytetrack_score_list.push({"id": "-", "score": "-"})
          }
        }
      }else if(propName == 'frame_slider'){
        this.frame = chng.currentValue; 
        let cur_frame = this.all_data.filter((d: any) => (d['filename'] == this.title && d['frame'] == this.frame && d['botsort'].length > 0 && d['bytetrack'].length > 0))[0]
        console.log("CURRENT FRAME", cur_frame)
        this.botsort_n_people = cur_frame['botsort'][0]['n_people']; //eu deveria mudar isso e colocar n_people dentro do botsort
        this.bytetrack_n_people = cur_frame['bytetrack'][0]['n_people'];
        this.botsort_score = cur_frame['botsort_avg_score'];
        this.bytetrack_score = cur_frame['bytetrack_avg_score'];

        // get all scores of this frame
        this.botsort_score_list = cur_frame['botsort'].sort((a: any, b: any) => d3.descending(a['score'], b['score'])).slice(0,5).map((d: any)=>({'id': d['people_id'], 'score': d['score']}));
        this.bytetrack_score_list = cur_frame['bytetrack'].sort((a: any, b: any) => d3.descending(a['score'], b['score'])).slice(0,5).map((d: any)=>({'id': d['people_id'], 'score': d['score']})); 
        
        while(this.botsort_score_list.length < 5){
          this.botsort_score_list.push({"id": "-", "score": "-"})
        }
        while(this.bytetrack_score_list.length < 5){
          this.bytetrack_score_list.push({"id": "-", "score": "-"})
        }
      }
    }
  }

 

  ngOnInit(){  
    
  }

  ngAfterViewInit(){
    this.http.get(this.url).subscribe(res => {
      this.all_data = res;
    });
  }
}
