import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  templateUrl: './barras.component.html',
  styles: [],
})
export class BarrasComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max: 100,
      },
    },
    // plugins: {
    //   legend: {
    //     display: true,
    //   },
    // },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        backgroundColor: '#EC4CF5',
        hoverBackgroundColor: '#E79FF5',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        backgroundColor: '#703ADE',
        hoverBackgroundColor: '#9A85DE',
      },
      {
        data: [67, 80, 4, 19, 86, 57, 11],
        label: 'Series C',
        backgroundColor: '#4579FA',
        hoverBackgroundColor: '#93B7FA',
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    this.barChartData.datasets.forEach((datasets) => {
      datasets.data.forEach((_, i, array) => {
        array[i] = Math.round(Math.random() * 100);
      });
    });

    this.chart?.update();
  }
}
