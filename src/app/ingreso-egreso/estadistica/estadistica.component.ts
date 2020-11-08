import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
// import { AppState } from 'src/app/app.reducer';
import { IngresoEgresoAppState } from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;
  subscription: Subscription = new Subscription();

  doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  doughnutChartData: MultiDataSet = []; // [[350, 450], [50, 150], [250, 130]];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: any[] = [
    { backgroundColor: ['#00ce68', '#e65251'] },
    { borderColor: ['#3bd949', '#dc3545'] }
  ];

  constructor(private ingresoEgresoService: IngresoEgresoService, private store: Store<IngresoEgresoAppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      this.contarIngresoEgreso(ingresoEgreso.items);
    });
  }

  contarIngresoEgreso(items: IngresoEgreso[]): void {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData = [[this.ingresos, this.egresos]];
  }

}
