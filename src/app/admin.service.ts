import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private userDoc: AngularFirestoreDocument<Users>


  constructor(
    private angularfire: AngularFirestore
  ) { }
  
  getUsers(){
    return this.angularfire.collection('users').snapshotChanges();
  }
  deleteUser(key){
    this.angularfire.doc<Users>('users/'+key).delete();
  }
}
