import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: "app-typography",
  templateUrl: "typography.component.html"
})
export class TypographyComponent implements OnInit {

  dataSource = [];
  userList;
  constructor(private adminServ: AdminService,
    private angularfire: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {
      this.angularfire.collection('users').snapshotChanges().subscribe(data => {
        this.userList = data.map(e => {
          return{
            key: e.payload.doc.id,
            ...e.payload.doc.data()
          } as Users
        });
        console.log(this.userList)
        
      })
    }

  ngOnInit() {}

  onDelete(key){
    this.adminServ.deleteUser(key);
  }
  editUser(key){
    this.router.navigate(['/user'], {queryParams:{key: key, }})
  }
}
