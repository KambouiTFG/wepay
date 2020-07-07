import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsPipe'
})
export class ProductsPipePipe implements PipeTransform {

  transform(products: any[], buscando: boolean, termino: string): any[] {
    if ( !buscando) { return products; }
    return products.filter(product => product.nombre.toLowerCase().indexOf(termino.toLowerCase()) !== -1);
  }
  /* if ( String(categoria) !== '5') {
    products = products.filter(product => String(product.categoria) === categoria);
  }
  if ( termino.trim().length !== 0 ) { 
    return products.filter(product => product.nombre.toLowerCase().indexOf(termino.toLowerCase()) !== -1);
  }
  return products; */
}