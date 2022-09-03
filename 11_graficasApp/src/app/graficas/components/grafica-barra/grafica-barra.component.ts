import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartConfiguration,
  ChartData,
  ChartType,
  ChartDataset,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafica-barra',
  templateUrl: './grafica-barra.component.html',
  styles: [],
})
export class GraficaBarraComponent implements OnInit {
  @Input() horizontal: boolean = false;
  @Input() title: { display: boolean; text: string } = {
    display: false,
    text: '',
  };

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: this.title.display,
        text: this.title.text,
      },
    },
  };
  @Input() public barChartType: ChartType = 'bar';

  @Input() public barChartLabels: string[] = [];

  @Input() public barChartDataSets: ChartDataset<'bar'>[] = [];

  @Input() public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: this.barChartDataSets,
  };

  constructor() {}

  ngOnInit(): void {
    if (this.horizontal)
      this.barChartOptions = { indexAxis: 'y', ...this.barChartOptions };
    if (
      this.barChartDataSets.length !== 0 &&
      this.barChartLabels.length !== 0
    ) {
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: this.barChartDataSets,
      };
    }

    this.barChartOptions!.plugins!.title = this.title;
  }

  // EVENTS
  public randomize(): void {
    this.barChartData.datasets.forEach((datasets) => {
      datasets.data.forEach((_, i, array) => {
        array[i] = Math.round(Math.random() * 1000);
      });
    });

    this.chart?.update();
  }
}
