import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'participantes',
  pure: false
})
export class ParticipantesPipe implements PipeTransform {

  transform(lista: string[], allParticipantes: string[]): any {
    let res: string [] = [];
    allParticipantes.forEach(user => {
      if (!lista.includes(user)) {
        res.push(user);
      }
    });
    return res;
  }

}
