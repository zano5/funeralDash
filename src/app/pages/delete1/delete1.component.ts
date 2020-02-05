import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-delete1',
  templateUrl: './delete1.component.html',
  styleUrls: ['./delete1.component.scss']
})
export class Delete1Component implements OnInit {
  Name;
  ID;
  Email;
  Plan;
  Number;
  Salary;
  UID;

  data = [];
  constructor(private db: AngularFirestore,private dialogRef:MatDialogRef<Delete1Component>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.data = data;
      console.log(this.data);
      this.Name = data.data.BuyerFullName;
      this.Email = data.data.BuyerEmail;
      this.ID = data.data.BuyerID;
      this.Plan = data.data.BuyerPolicy;
      this.Number = data.data.BuyerMobileNumber;
      this.Salary = data.data.BuyerIncome;
      this.UID = data.id; 
    }

  ngOnInit() {
  }
  close2() { 
    this.dialogRef.close();
    
  }
  Confirm2(){
 
    this.db.collection('Rejected Purchases').add(this.data);
    this.db.collection('Purchase').doc(this.UID).delete(); 
    this.dialogRef.close();
  }
}
