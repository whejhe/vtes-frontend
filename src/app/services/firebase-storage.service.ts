import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Storage, ref , uploadBytes, listAll, getDownloadURL} from '@angular/fire/storage';

// import { Storage, ref , uploadBytes, listAll, getDownloadURL} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    private storage: Storage
  ) { }

  // Subir una imagen
uploadImage(image: File): Promise<firebase.storage.UploadTaskSnapshot> {
  return this.storage.upload('images', image);
}

// Descargar una imagen
downloadImage(imagePath: string): Promise<firebase.storage.FileReference> {
  return this.storage.ref(imagePath).getDownloadURL();
}

// Eliminar una imagen
deleteImage(imagePath: string): Promise<void> {
  return this.storage.ref(imagePath).delete();
}

}
