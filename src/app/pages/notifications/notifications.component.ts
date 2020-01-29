import { Component, OnInit,ViewChild } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
 
 
@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})

export class NotificationsComponent implements OnInit { 
  
  claimsData = [];
  mockData = []; 
  displayedColumns: string[] = ['ClaimNumber','ClaimentName', 'ID', 'Number', 'AltNumber','TimeStamp','image','itemId']; 
  dataSource = new MatTableDataSource([]); 
  constructor(private toastr: ToastrService, private angularFirestore: AngularFirestore,private dialog:MatDialog) { } 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.RetrieveClaims(); 
  }
  RetrieveClaims(){ 
    this.dataSource = new MatTableDataSource<any>();
    this.angularFirestore.collection('claims doc').snapshotChanges()
    .subscribe(snapshots => {
      this.dataSource = new MatTableDataSource<any>();
      snapshots.forEach(element => {     
        this.dataSource.data.push({data:element.payload.doc.data(),id:element.payload.doc.id});  
        this.dataSource._updateChangeSubscription();  
    this.dataSource.paginator = this.paginator;
       }); 
    }) 
  }

  Accept(){
    console.log('Accept');
  }
  Reject(itemId){ 
    this.angularFirestore.collection('claims doc').doc(itemId).delete();  
    this.RetrieveClaims();
  }
  openDialog(e) { 
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
  //   dialogConfig.data = {
  //   position:e.position,
  //   gender:e.gender,
  //   race:e.race,
  //   occupation:e.occupation,
  //   age:e.age,
  //   key:e.key
  // };
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
}
  
} 