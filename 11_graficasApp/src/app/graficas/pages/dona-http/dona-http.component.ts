import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

import { GraficasService } from '../../services/graficas.service';

@Component({
  templateUrl: './dona-http.component.html',
  styles: [],
})
export class DonaHttpComponent implements OnInit {
  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };

  constructor(private graficasService: GraficasService) {}

  ngOnInit(): void {
    // this.graficasService.getUsuariosRedesSociales().subscribe({
    //   next: (data) => {
    //     // console.log(data);
    //     const labels = Object.keys(data);
    //     const values = Object.values(data);
    //     // console.log(labels, values);
    //     this.doughnutChartData.labels = labels;
    //     this.doughnutChartData.datasets.push({ data: values });
    //   },
    // });

    this.graficasService.getUsuariosRedesSocialesDonaData().subscribe({
      next: ({ labels, values }) => {
        this.doughnutChartData.labels = labels;
        this.doughnutChartData.datasets.push({ data: values });
      },
    });
  }

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
