import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform( images: string): string {
    console.log('entramos al pipe');
    if ( !images ){
      console.log('Imagen no encontrada');
      return 'assets/img/noimage.png';
    }
    console.log('si hay imagen');

    if ( images.length > 0 ) {
      return images;
    } else {
      return 'assets/img/noimage.png';
    }
  }

}
