import { Injectable, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ExtractDataService {

  private itemDoc: AngularFirestoreDocument<Users>;

  dataSource = new MatTableDataSource([]);
  dataSource1 = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private db: AngularFirestore) { }

  getPurchase(){
    return this.db.collection('Purchase').snapshotChanges();
  }

  delete(id){
    this.db.doc('Purchase/' + id).delete();
  }

  update(obj, key) {

    this.itemDoc = this.db.doc<Users>('users/' + key);
    this.itemDoc.update(obj);
  }

  RetrievePurchases(){ 
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource1 = new MatTableDataSource<any>();

    this.db.collection('Purchase').snapshotChanges()
    .subscribe(snapshots => {
      this.dataSource = new MatTableDataSource<any>();
      snapshots.forEach(element => {     
        this.dataSource.data.push({data:element.payload.doc.data(),id:element.payload.doc.id});  
        this.dataSource._updateChangeSubscription(); 
       }); 
    }) 

    this.db.collection('Approved Purchases').snapshotChanges()
    .subscribe(snapshots => {
      this.dataSource1 = new MatTableDataSource<any>();
      snapshots.forEach(element => {     
        console.log(element.payload.doc.data());
        this.dataSource1.data.push(element.payload.doc.data());  
        this.dataSource1._updateChangeSubscription(); 
       }); 
    }) 
    console.log(this.dataSource1);
  }

}
