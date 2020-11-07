import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    // ACR. De esta manera da error, al parecer por redux, por eso cualquiera de las dos siguientes opciones funcionaría:
    // return items.sort((a, b) => {
    //   if (a.tipo === 'ingreso') {
    //     return -1;
    //   } else {
    //     return 1;
    //   }
    // });

    // opcion 1.
    // return items.slice().sort((a, b) => {
    //   if (a.tipo === 'ingreso') {
    //     return -1;
    //   } else {
    //     return 1;
    //   }
    // });

    // opcion 2.
    return [...items].sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });

  }

}
