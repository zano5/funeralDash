import { Component, OnInit,ViewChild } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
 
 
@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})

export class NotificationsComponent implements OnInit { 
  
  claimsData = [];
  mockData = []; 
  displayedColumns: string[] = ['ClaimentName', 'ID', 'Number', 'AltNumber','TimeStamp','image','itemId']; 
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private toastr: ToastrService,private angularFirestore:AngularFirestore) {
   
    
     
  } 
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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
  
} 