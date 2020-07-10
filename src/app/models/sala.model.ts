import { ProductoModel } from './producto.model';

export class SalaModel {
    nombre = '';
    admins = [];
    usuarios = [];
    productos = [];
    img = '';
    code = '';
    creado = new Date().getTime();
}