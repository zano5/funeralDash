import { Component, OnInit,ViewChild } from "@angular/core";
import { ExtractDataService } from 'src/app/services/extract-data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {

  displayedColumns: string[] = ['BuyerFullName', 'BuyerID', 'BuyerMobileNumber', 'BuyerEmail','BuyerIncome','BuyerPolicy','itemId']; 
  displayedColumns1: string[] = ['BuyerFullName', 'BuyerID', 'BuyerMobileNumber', 'BuyerEmail','BuyerIncome','BuyerPolicy']; 
  dataSource = new MatTableDataSource([]);
  dataSource1 = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private extractPur: ExtractDataService,private db: AngularFirestore, private router:Router,private dialog:MatDialog) {
    this.dataSource.paginator = this.paginator;
    this.RetrievePurchases();
  }

  ngOnInit() {}

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
  Accept(purchase){
    this.openDialog(purchase);
  }

  Reject(itemId){ 
    this.db.collection('Purchase').doc(itemId).delete();  
    this.RetrievePurchases();
  }
  openDialog(e) {  
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    dialogConfig.data = e;
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
}
  
}
