// export class User {

//   public nombre: string;
//   public email: string;
//   public uid: string;

//   constructor(nombre: string, email: string, uid: string) {
//     this.nombre = nombre;
//     this.email = email;
//     this.uid = uid;
//   }
// }

// ***************

// ACR. Lo de arriba se cambia para no tener que recibir de a uno las propiedades de la clase por el constructor y se pueda recibir un
// objeto al cual se le buscarán las propiedades dinamicamente para ser asignadas.

interface DataObj {
  uid: string;
  email: string;
  nombre: string;
}

export class User {

  public nombre: string;
  public email: string;
  public uid: string;

  constructor(obj: DataObj) { // ACR. Ojo que el obj que se pasa se le debe decir que es de tipo any.
    // ACR. Lo que hace aqui es asignar de forma dinamica las propiedades preguntanto primero si existe el obj y si obj tiene una propiedad
    // llamada nombre entonces la asigna, sino asigna null.
    this.nombre = obj && obj.nombre || null;
    this.email = obj && obj.email || null;
    this.uid = obj && obj.uid || null;
  }

  // ACR. Ejemplo de uso:
  // this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe(
  //   (usuarioObj: any) => { <<======= se asigna tipo any
  //     const newUser = new User(usuarioObj); <<====== se pasa al constructor

  //   }
  // );

}
