import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pCatPipe'
})
export class PCatPipePipe implements PipeTransform {

  transform(products: any[], categoria: string): any[] {
    if ( String(categoria) === '5') { return products; }
    const p = products.filter(product => String(product.categoria) === categoria);
    return p;
  }
}
