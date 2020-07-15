import { ProductoModel } from './producto.model';

export class SalaModel {
    nombre = '';
    admins = [];
    usuarios = [];
    productos = [];
    img = '';
    code = '';
    open = true;
    creado = new Date().getTime();
}