import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'participantes'
})
export class ParticipantesPipe implements PipeTransform {

  transform(allParticipantes: string[], lista: string[]): any {
    let res: string [] = [];

    allParticipantes.forEach(user => {
      if (!lista.includes(user)) {
        res.push(user);
      }
    });

    console.log('todos', allParticipantes);
    console.log('lsta productos', lista);
    console.log('res', res);

    return res;
  }

}
