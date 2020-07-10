import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsPipe'
})
export class ProductsPipePipe implements PipeTransform {

  transform(products: any[], buscando: boolean, termino: string): any[] {
    if ( !buscando) { return products; }
    return products.filter(product => product.nombre.toLowerCase().indexOf(termino.toLowerCase()) !== -1);
  }
}