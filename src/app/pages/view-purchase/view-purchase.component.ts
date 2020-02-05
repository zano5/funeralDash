import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.scss']
})
export class ViewPurchaseComponent implements OnInit {
  Name;
  ID;
  Email;
  Plan;
  Number;
  Salary;
  UID;
  documentID;
  Members = [];
  Address;
  constructor(private db: AngularFirestore,private dialogRef:MatDialogRef<ViewPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      console.log(data);
      this.Address = data.data.BuyerAddress;
      this.Members = data.data.BuyerMembers; 
      this.Name = data.data.BuyerFullName;
      this.Email = data.data.BuyerEmail;
      this.ID = data.data.BuyerID;
      this.Plan = data.data.BuyerPolicy;
      this.Number = data.data.BuyerMobileNumber;
      this.Salary = data.data.BuyerIncome;
      this.UID = data.id; 
      this.documentID = data.data.BuyerUserID;
     }

  ngOnInit() {
  }
  confirm(){
    this.dialogRef.close();
  }
}
