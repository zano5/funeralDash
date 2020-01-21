import { Component, OnInit,ViewChild } from "@angular/core";
import { ExtractDataService } from 'src/app/services/extract-data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {

  displayedColumns: string[] = ['BuyerFullName', 'BuyerID', 'BuyerMobileNumber', 'BuyerEmail','BuyerIncome','BuyerPolicy','itemId']; 
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private extractPur: ExtractDataService,private db: AngularFirestore, private router:Router) {
    this.dataSource.paginator = this.paginator;
    this.RetrievePurchases();
  }

  ngOnInit() {}

  RetrievePurchases(){ 
    this.dataSource = new MatTableDataSource<any>();
    this.db.collection('Purchase').snapshotChanges()
    .subscribe(snapshots => {
      this.dataSource = new MatTableDataSource<any>();
      snapshots.forEach(element => {     
        this.dataSource.data.push({data:element.payload.doc.data(),id:element.payload.doc.id});  
        this.dataSource._updateChangeSubscription(); 
       }); 
    }) 
  }

  Reject(itemId){ 
    this.db.collection('Purchase').doc(itemId).delete();  
    this.RetrievePurchases();
  }

  method(){

  }
  
}
