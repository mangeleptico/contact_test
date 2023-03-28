import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact } from '../models/Contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firebase: AngularFirestore) { }

  saveContact(contact: Contact): Promise <any>{
    return this.firebase.collection('contact').add(contact)
  }

  getContacts(){
    return this.firebase.collection('contact').get();
  }
}
