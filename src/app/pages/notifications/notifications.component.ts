import { Confirm2Component } from './../confirm2/confirm2.component';
import { Component, OnInit,ViewChild } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DeleteComponent } from '../delete/delete.component';
import { ViewClaimComponent } from '../view-claim/view-claim.component';
 
 
@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})

export class NotificationsComponent implements OnInit { 
  
  claimsData = [];
  mockData = []; 
  displayedColumns: string[] = ['ClaimNumber','ClaimentName', 'ID', 'Number', 'AltNumber','TimeStamp','image','itemId']; 
  displayedColumns1: string[] = ['ClaimNumber','ClaimentName', 'ID', 'Number', 'AltNumber','TimeStamp','image',]; 
  dataSource = new MatTableDataSource([]); 
  dataSource1 = new MatTableDataSource([]);
  constructor(private toastr: ToastrService, private angularFirestore: AngularFirestore,private dialog:MatDialog,private db: AngularFirestore) {
    
   } 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.RetrieveClaims(); 
  }
  RetrieveClaims(){ 

    this.dataSource = new MatTableDataSource<any>();
    this.dataSource1 = new MatTableDataSource<any>()

    this.angularFirestore.collection('claims doc').snapshotChanges()
    .subscribe(snapshots => {
      this.dataSource = new MatTableDataSource<any>();
      snapshots.forEach(element => {     
        this.dataSource.data.push({data:element.payload.doc.data(),id:element.payload.doc.id});   
        this.dataSource._updateChangeSubscription();  
    this.dataSource.paginator = this.paginator;
       }); 
    }) 

    this.angularFirestore.collection('Approved Claims').snapshotChanges()
    .subscribe(snapshots => {
      this.dataSource1 = new MatTableDataSource<any>();
      snapshots.forEach(element => {     
        this.dataSource1.data.push({data:element.payload.doc.data(),id:element.payload.doc.id});   
        this.dataSource1._updateChangeSubscription();  
        this.dataSource1.paginator = this.paginator;
       }); 
    }) 
  }

  Accept(claimsdoc){
    // console.log('Accept'); 
    this.openDialog(claimsdoc);
  }
  Reject(itemId){ 
    // this.angularFirestore.collection('claims doc').doc(itemId).delete();  
    // this.RetrieveClaims();
  }
  openDialog(e) { 
    const dialogConfig = new MatDialogConfig(); 
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      
      dialogConfig.data = e;
      this.dialog.open(Confirm2Component, dialogConfig);
}

Accept1(purchase){
  this.openDialog1(purchase);
}

Reject1(itemId){ 
  this.db.collection('Purchase').doc(itemId).delete();  
  this.RetrieveClaims();
}
openDialog1(e) {  
  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  
  dialogConfig.data = e;
  this.dialog.open(DeleteComponent, dialogConfig);
} 
openDialog2(e) {  
  const dialogConfig = new MatDialogConfig(); 
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  
  dialogConfig.data = e;
  this.dialog.open(ViewClaimComponent, dialogConfig);
} 
rows(row){
    this.openDialog2(row);
}
} 