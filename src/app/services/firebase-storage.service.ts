import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

// import { Storage, ref , uploadBytes, listAll, getDownloadURL} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  images: string[] = [];

  constructor(
    private storage: Storage
  ) { }

  // Subir una imagen
  async uploadImage($event:any) {
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `CustomCards/${file.name}`);
    try {
      await uploadBytes(imgRef, file);
    } catch (error) {
      console.log(error);
    }
  }

  async getImageDownloadUrl(imgRef: any) {
    try {
      const url = await getDownloadURL(imgRef);
      this.images.push(url);
      return url;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getImages() {
    const imagesRef = ref(this.storage, 'CustomCards');
    try {
      const response = await listAll(imagesRef);
      this.images = [];
      for (let item of response.items) {
        const url = await this.getImageDownloadUrl(item);
        console.log(url);
      }
      return await this.images;
    } catch (error) {
      return console.log(error);
    }
  }

}
