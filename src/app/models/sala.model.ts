import { ProductoModel } from './producto.model';

export class SalaModel {
    nombre = '';
    owner = '';
    admins = [];
    usuarios = [];
    productos = [];
    img = '';
    code = '';
    open = true;
    creado = new Date().getTime();
}