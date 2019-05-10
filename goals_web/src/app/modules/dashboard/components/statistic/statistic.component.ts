import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  @Input() chartData: any;
  polarAreaChartLabels: Label[];
  polarAreaChartData: SingleDataSet;
  polarAreaLegend = true;
  isLoaded = false;

  polarAreaChartType: ChartType = 'polarArea';

  chartOptions = {
    scale: {
      ticks: {
        min: 0,
        max: 30
      }
    }
  };

  constructor() {

  }

  ngOnInit() {
    if (this.chartData.names != null) {
      this.polarAreaChartData = this.chartData.counts;
      this.polarAreaChartLabels = this.chartData.names;
      this.isLoaded = true;
    }
  }
}
