import { Component, ElementRef, Input, NgZone, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
// import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgMagnizoomModule } from 'ng-magnizoom';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import * as d3 from 'd3';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    FormsModule,
    MatRadioModule,
    HttpClientModule,
    NgMagnizoomModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

  constructor(private http: HttpClient, private elRef: ElementRef, private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef) {
    this.hostElement = this.elRef.nativeElement.children;
  }
  
  @Input() current_frame: any[] = [];
  @Output() newFrame = new EventEmitter<number>();

  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  @ViewChild('canvasElement')
  canvasElement!: ElementRef;
  
  public frame_slider: number = 1;
  public max_frame: number = 900;
  public displayMode: string = "bot";
  public img_path: string = "";
  public show_tag: boolean = false;
  public current_filename: string = ""
  private url: string = '../../../assets/data/frames.json';
  private all_data: any;
  public filtered_data: any[] = [];
  public n: number = 15;
  public max_n_people: number = 0;
  public people_in_scene: any;
  public margin = ({top: 50, right: 0, bottom: 0, left: 50});
  public height: number = 0;
  public width: number = 1000;
  public x: any;
  public y: any;
  public color: any;
  public xAxis: any;
  public yAxis: any;
  public input_received: boolean = false;
  public svg: any;
  public g: any;
  public hostElement: any;
  public viewer: any = null;
  public show_botsort_timeline: boolean = true;
  public old_structure_data: any[] = [];

  ngOnChanges(changes: any) {
    for (const propName in changes) {
      const chng = changes[propName];
      this.frame_slider = parseInt(chng.currentValue['frame'])
      this.current_filename = chng.currentValue['filename'];
      this.old_structure_data = []
      this.all_data.forEach((d: any) => {
        let bot = d["botsort"];
        let byte = d["bytetrack"];
        for(let i = 0; i < bot.length; i++ ){
          let obj = {
            "filename": d.filename,
            "frame": d.frame,
            "model": "botsort",
            "n_people": bot[i]["n_people"],
            "people_id": bot[i]["people_id"]
          }
          this.old_structure_data.push(obj);
        }
        for(let i = 0; i < byte.length; i++ ){
          let obj = {
            "filename": d.filename,
            "frame": d.frame,
            "model": "bytetrack",
            "n_people": byte[i]["n_people"],
            "people_id": byte[i]["people_id"]
          }
          this.old_structure_data.push(obj);
        }
      });
      if (chng.currentValue){
        let new_frames = this.old_structure_data.map((d: any)=>({"filename": d.filename, frame: d.frame, people_id: d.people_id, n_people: d.n_people, model: d.model}));
        if(this.displayMode === 'bot'){
          this.filtered_data = new_frames.filter((d: any) => d.model === "botsort" && d.filename == this.current_filename && d.frame >= this.frame_slider - this.n && d.frame <= this.frame_slider + this.n)  
          this.people_in_scene = new Set(this.filtered_data.map(d=>(`ID #${d.people_id}`)))
        }
        if(this.displayMode === 'byte'){
          this.filtered_data = new_frames.filter((d: any) => d.model === "bytetrack" && d.filename == this.current_filename && d.frame >= this.frame_slider - this.n && d.frame <= this.frame_slider + this.n)  
          this.people_in_scene = new Set(this.filtered_data.map(d=>(`ID #${d.people_id}`)))
        }
        this.max_n_people = d3.max(this.filtered_data, d=>d.n_people);
        this.height = this.margin.top + this.margin.bottom + (this.max_n_people) * 10
        this.createChart(this.filtered_data);
      }
    }
  }

  ngOnInit(){
    console.log("HOST", this.hostElement)
    // this.loadViewer();
    this.changeDetectorRef.detectChanges();
    
  }

  ngAfterViewInit(){
    this.http.get(this.url).subscribe(res => {
      this.all_data = res;
    });
    this.old_structure_data = []
    this.all_data.forEach((d: any) => {
      let bot = d["botsort"];
      let byte = d["bytetrack"];
      for(let i = 0; i < bot.length; i++ ){
        let obj = {
          "filename": d.filename,
          "frame": d.frame,
          "model": "botsort",
          "n_people": bot[i]["n_people"],
          "people_id": bot[i]["people_id"]
        }
        this.old_structure_data.push(obj);
      }
      for(let i = 0; i < byte.length; i++ ){
        let obj = {
          "filename": d.filename,
          "frame": d.frame,
          "model": "bytetrack",
          "n_people": byte[i]["n_people"],
          "people_id": byte[i]["people_id"]
        }
        this.old_structure_data.push(obj);
      }
    });
  }

  // private loadViewer(): void{
  //   let path1 = '../../../assets/data/input/' + this.current_filename + '/' + this.frame_slider.toString().padStart(6, '0') + '.jpg';
  //   let path2 = '../../../assets/data/output/' + this.current_filename + '/botsort/' + this.frame_slider.toString().padStart(6, '0') + '.jpg';
  //   let tiledImage: any = [{
  //         type: 'image',
  //         url:  path1
  //     }, {
  //       type: 'image',
  //       url:  path2
  //   }];
    
  //   this.viewer = this.ngZone.runOutsideAngular(() =>
  //     OpenSeadragon({
  //       id: "openseadragon1",
  //       prefixUrl: '../../../assets/icons/',
  //       tileSources:   {
  //           type: 'image',
  //           url:  '../../../assets/data/input/chase_1_sensor_1_left/000001.jpg'
  //       }
  //   })
  //   );
  // }

  private setColorScale() {
    this.color = d3.scaleOrdinal(this.people_in_scene, d3.schemeCategory10)
  }

  private createXAxis() {
    this.x = d3.scaleBand(
      d3.range(this.frame_slider-this.n, this.frame_slider+this.n+1), 
      [this.margin.left, this.width - this.margin.right]
    ).round(true)

    this.g.append('g')
        .attr('transform', `translate(0,${this.margin.top})`)
        .attr("stroke-width", 0.5)
        .call(d3.axisTop(this.x));
  }

  private createYAxis() {
    this.y = d3.scaleBand(
      this.people_in_scene, 
      [this.margin.top, this.height - this.margin.bottom]
    ).round(true)    

    this.g.append('g')
        .attr('transform', `translate(${this.margin.left},0)`)
        .attr("stroke-width", 0.5)
        .call(d3.axisLeft(this.y));
  }

  public updateChart(data: any) {
    // this.createChart(data);
  }

  private removeExistingChartFromParent() {
    d3.select('#matrix').select('svg').remove();
  }

  private setChartDimensions() {
    let viewBoxHeight = this.height;
    let viewBoxWidth = this.width;
    this.svg = d3.select('#matrix').append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  }

  private addGraphicsElement() {
    this.g = this.svg.append("g")
        .attr("transform", "translate(0,0)");
  }

  public createChart(data: any) {

    this.removeExistingChartFromParent();

    this.setChartDimensions();

    this.setColorScale();

    this.addGraphicsElement();

    this.createXAxis();

    this.createYAxis();
    
    if(this.displayMode === 'bot'){
      this.svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", (d: any) => this.x(d.frame))
        .attr("y", (d: any) => this.y(`ID #${d.people_id}`))
        .attr("width", this.x.bandwidth() - 1)
        .attr("height", this.y.bandwidth() - 1)
        .attr("fill", (d: any) => '#4B0082')
      .append("title")
        .text("People ID Timeline");
    }
    else if(this.displayMode === 'byte'){
      this.svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", (d: any) => this.x(d.frame))
        .attr("y", (d: any) => this.y(`ID #${d.people_id}`))
        .attr("width", this.x.bandwidth() - 1)
        .attr("height", this.y.bandwidth() - 1)
        .attr("fill", (d: any) => '#4B0082')
      .append("title")
        .text("People ID Timeline");
    }else{
      this.svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", (d: any) => this.x(d.frame))
        .attr("y", (d: any) => this.y(`ID #${d.people_id}`))
        .attr("width", this.x.bandwidth() - 1)
        .attr("height", this.y.bandwidth() - 1)
        .attr("fill", (d: any) => '#4B0082')
      .append("title")
        .text("People ID Timeline");
    }
    
  }

  public handleValueChange(event: any){
    let new_frames = this.old_structure_data.map((d: any)=>({"filename": d.filename, frame: d.frame, people_id: d.people_id, n_people: d.n_people, model: d.model}));
    if(this.displayMode === 'bot'){
      this.filtered_data = new_frames.filter((d: any) => d.model === "botsort" && d.filename == this.current_filename && d.frame >= this.frame_slider - this.n && d.frame <= this.frame_slider + this.n)  
      this.people_in_scene = new Set(this.filtered_data.map(d=>(`ID #${d.people_id}`)))
    }
    if(this.displayMode === 'byte'){
      this.filtered_data = new_frames.filter((d: any) => d.model === "bytetrack" && d.filename == this.current_filename && d.frame >= this.frame_slider - this.n && d.frame <= this.frame_slider + this.n)  
      this.people_in_scene = new Set(this.filtered_data.map(d=>(`ID #${d.people_id}`)))
    }
    this.max_n_people = d3.max(this.filtered_data, d=>d.n_people);
    this.height = this.margin.top + this.margin.bottom + (this.max_n_people) * 10
    this.createChart(this.filtered_data);
    this.newFrame.emit(this.frame_slider);
  }

  public showBotSortTimeline(){
    let new_frames = this.old_structure_data.map((d: any)=>({"filename": d.filename, frame: d.frame, people_id: d.people_id, n_people: d.n_people, model: d.model}));
    this.filtered_data = new_frames.filter((d: any) => d.model === "botsort" && d.filename == this.current_filename && d.frame >= this.frame_slider - this.n && d.frame <= this.frame_slider + this.n)  
    this.people_in_scene = new Set(this.filtered_data.map(d=>(`ID #${d.people_id}`)))
    this.max_n_people = d3.max(this.filtered_data, d=>d.n_people);
    this.height = this.margin.top + this.margin.bottom + (this.max_n_people) * 10
    this.show_botsort_timeline = true;
    this.createChart(this.filtered_data);
  }

  public showByteTrackTimeline(){
    let new_frames = this.old_structure_data.map((d: any)=>({"filename": d.filename, frame: d.frame, people_id: d.people_id, n_people: d.n_people, model: d.model}));
    this.filtered_data = new_frames.filter((d: any) => d.model === "bytetrack" && d.filename == this.current_filename && d.frame >= this.frame_slider - this.n && d.frame <= this.frame_slider + this.n)  
    this.people_in_scene = new Set(this.filtered_data.map(d=>(`ID #${d.people_id}`)))
    this.max_n_people = d3.max(this.filtered_data, d=>d.n_people);
    this.height = this.margin.top + this.margin.bottom + (this.max_n_people) * 10
    this.show_botsort_timeline = false;
    this.createChart(this.filtered_data);
  }

}
