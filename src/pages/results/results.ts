import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results = [];
  labels = [];
  data = [];
  doughnutChartType: string = 'doughnut';
  radarChartType: string = 'radar';

  view: string = 'data';
  
  constructor(
    private performanceData: PerformanceDataProvider,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.performanceData
      .getResults()
      .subscribe(data => (this.results = data.entries));
  }

}
