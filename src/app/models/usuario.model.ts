

export class UsuarioModel {

    role = 2;
    email: string;
    img =  '';
    google = false;
    password?: string;
    nombre?: string;
    creado? = new Date().getTime();
    cambioNombre? = new Date().getTime();
}

