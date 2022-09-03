import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels: string[] = [
    'Ventas en Descarga',
    'Ventas en Tienda',
    'Ventas por Email',
    'Ventas por Publicidad',
    'Ventas por Calle',
  ];
  public colors: Color[] = [
    '#FF2981',
    '#5D26DE',
    '#37BBF5',
    '#26DE56',
    '#F7FA19',
  ];
  public colorsHover: Color[] = [
    '#FF94CD',
    '#9883DE',
    '#9DE1F5',
    '#83DE94',
    '#FAF782',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100, 45, 60],
        backgroundColor: this.colors,
        hoverBackgroundColor: this.colorsHover,
        hoverBorderWidth: 0,
      },
      {
        data: [50, 150, 120, 10, 200],
        backgroundColor: this.colors,
        hoverBackgroundColor: this.colorsHover,
        hoverBorderWidth: 0,
      },
      {
        data: [250, 130, 70, 130, 30],
        backgroundColor: this.colors,
        hoverBackgroundColor: this.colorsHover,
        hoverBorderWidth: 0,
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {}

  //EVENTOS
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }
}
