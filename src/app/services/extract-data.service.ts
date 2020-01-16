import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExtractDataService {

  constructor(private db: AngularFirestore) { }

  getPurchase(){
    return this.db.collection('Purchase').snapshotChanges();
  }

  delete(id){
    this.db.doc('Purchase/' + id).delete();
  }

}
