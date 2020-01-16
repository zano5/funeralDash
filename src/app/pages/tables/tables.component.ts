import { Component, OnInit } from "@angular/core";
import { ExtractDataService } from 'src/app/services/extract-data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {

  itemList = [];
  mySubscription: any;
  constructor(private extractPur: ExtractDataService,private db: AngularFirestore, private router:Router) {

    this.db.collection('Purchase').snapshotChanges()
    .subscribe(snapshots => {
      snapshots.forEach(element => {   
      this.itemList.push({data:element.payload.doc.data(),id:element.payload.doc.id});
       }); 
       console.log(this.itemList)
    })

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
}

  ngOnInit() {}

  Reject(id){
    this.extractPur.delete(id);
    alert("Item deleted");
    this.itemList = [];
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  
}
