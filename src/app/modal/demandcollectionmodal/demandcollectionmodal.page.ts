import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { NavParams } from '@ionic/angular';
import * as moment from "moment"; 
import { Pipe, PipeTransform } from "@angular/core";
@Component({
  selector: 'app-demandcollectionmodal',
  templateUrl: './demandcollectionmodal.page.html',
  styleUrls: ['./demandcollectionmodal.page.scss'],
})
export class DemandcollectionmodalPage implements OnInit {
data:any = {}
  callOutCome: any;
  getusername: any;
  businessunit: any;
  customeractiondata: any;
  enable: boolean;
  Npacustomerdata: any;
  firstWords: any[];
  firstname1: any;
  myvalue: boolean;
  purposeID: any;
  purpose: any;
  Collectiondate1: any;
  nextcalldate1: string;
  followuptime: string;
  constructor(private Alertservice:AlertServiceService,private navParams:NavParams,private Apiservice:ApiServiceService,private modalController:ModalController) {
    
   }

  ngOnInit() {
    let Cusdata = this.navParams.get('Data');
    this.data.customerid = Cusdata.CBSCustomerID
    this.getcalloutcome();
    this.demandAccountactionModal(Cusdata);
  }
  modelDissmiss(){
    this.modalController.dismiss();
   }
  getcalloutcome(){
    this.Apiservice.getcalloutcome1().then((res:any)=>{
  // console.log(JSON.parse(res));
  var response = res.data;
  response = JSON.parse(response);
  response = JSON.parse(response);
  this.callOutCome = response;
  
    }) 
  }
  
  checkbox(Event){
    console.log(Event);
    
    if(Event){
      this.data.jointvisit = 'YES';
    }else{
      this.data.jointvisit = "NO"
    }
    console.log(this.data.jointvisit)
  }

  checkusercode(val) {
    var usercode = val;
    var branchid = window.localStorage['branchID'];

    // this.showspin();
    this.Apiservice.getusername(usercode, branchid)
      .then((res:any)=> {
        // this.hidespin();
       var response = JSON.parse(res);
  response = JSON.parse(response);
        if (response == "This User Not in this Branch") {

          // var myPopup = $ionicPopup.show({
          //   template: '<center>This User Is Not Under This Branch</center>',
          //   title: 'Warning',
          //   scope: this,
          //   buttons: [{
          //     text: 'OK',
          //     type: 'button button-clear button-assertive'
          //   }]
          // });
          this.Alertservice.presentAlert('Warning',"This User Is Not Under This Branch");
          this.data.jointusername = "";

        }

        else {
          this.getusername = response;
          // this.data.jointusername = this.getusername;
          this.data.jointusername = this.getusername;
          console.log(this.getusername)
        }

      })
      // .error(function (response) {
      //   this.hidespin();
      //   console.log(response);
      // });
  }
  getbusinessunit(){
    //  this.showspin();
      this.Apiservice.getbusinessunit()
        .then( (res:any)=> {
          var response = res.data;
  response = JSON.parse(response);
  response = JSON.parse(response);
         this.businessunit = response;
  
        //  this.hidespin();
        })
        // .error(function (response) {
        //  this.hidespin();
        //   console.log(response);
  
  
        // });
  
  
    }

    demandAccountactionModal(items){

      this.data={};
      console.log(items);

      this.data.addressname = "";
      this.data.callout = "";
      this.data.selectele = "";       
      this.data.followupdate = "";
      this.data.followuptime = "";
      this.data.jointvisit = "";
      this.data.jointcode = "";
      this.data.jointusername = "";
      this.customeractiondata = items;
      window.localStorage['customerID'] = this.customeractiondata.CBSCustomerID;
      window.localStorage['callID'] = this.customeractiondata.ROWID;
      this.data.customerid=this.customeractiondata.CBSCustomerID;
      var customerid = items.CBSCustomerID;
      this.data.collected_accno = this.customeractiondata.AccountNumber;

      // this.smaAccountaction.show();

      if (customerid == null) {
  
          this.enable = false;
    
        }
        if (customerid != null) {
          this.enable = true;
          // this.showspin();

          this.Apiservice.getcustomerdetails(customerid)
            .then((res:any)=> {
              // this.hidespin();
              var response = res.data;
              response = JSON.parse(response);
              response = JSON.parse(response);
              this.Npacustomerdata = JSON.parse(response);
              console.log(this.Npacustomerdata)
              if(this.Npacustomerdata != "" && this.Npacustomerdata != undefined)
              {
              this.data.customerid = customerid;
              this.data.customername = this.Npacustomerdata[0].Nfirstname + ' ' + this.Npacustomerdata[0].Nlastname;
              window.localStorage['customerName'] = this.data.customername;
              this.data.firstname = this.Npacustomerdata[0].Nfirstname;
              this.data.lastname = this.Npacustomerdata[0].Nlastname;
              this.data.mobile = this.Npacustomerdata[0].Nmobile;
              this.data.resphnno = this.Npacustomerdata[0].Nresidencephone;
              this.data.email = this.Npacustomerdata[0].Nemail;
    
              this.firstWords = [];
    
              var firstname = [];
    
              if (this.Npacustomerdata.length > 0) {
                // this.showspin();
              }
              for (let i = 0; i < this.Npacustomerdata.length; i++) {
    
                firstname = this.Npacustomerdata[i].Nfirstname.split(" ");
    
                this.firstWords.push(firstname[0]);
                this.Npacustomerdata[i].firstname = this.firstWords[i];
                this.firstname1 = this.Npacustomerdata[i].firstname;
                if (i == this.Npacustomerdata.length - 1) {
                  // this.hidespin();
                }
              }
    
              console.log(this.Npacustomerdata[0].Add1);
              if(this.Npacustomerdata[0].Add1 != undefined || this.Npacustomerdata[0].Add2 != undefined || this.Npacustomerdata[0].Add3 != undefined || this.Npacustomerdata[0].Add4 != undefined || this.Npacustomerdata[0].PIN != undefined){

                var respAdd1= this.Npacustomerdata[0].Add1;
                var add1 = respAdd1.replace("/", "-");
                console.log(add1);
                var respAdd2= this.Npacustomerdata[0].Add2;
                var add2 = respAdd2.replace("/", "-");
                console.log(add2);
              this.data.addressname = add1+' '+add2+' '+this.Npacustomerdata[0].Add3+' '+this.Npacustomerdata[0].Add4+' '+this.Npacustomerdata[0].PIN;
              console.log(this.data.addressname);
              }
              if(this.data.addressname != "" && this.data.addressname != undefined)
              { 
                console.log(this.data.addressname);
               this.myvalue = true;
               //this.data.selectele='P';
              //  this.setlatlong(this.data.addressname); cmd by sijin
              }
             
             }
            })
            // .error(function (response) {
            //   console.log(response);
            //   this.hidespin();
            // });
        }

      this.purposeID= items.PURPOSEID;
      this.purpose = items.PURPOSE;
      this.data.courtesypurp = this.purposeID; 
  }

  

 saveDemandCustomer(){

    var usercode = window.localStorage['userCode'];
  var username = window.localStorage['userName'];
  var branchid = window.localStorage['branchID'];
  var CallerId = window.localStorage['userID'];
  var callid = null;
    // this.showspin();
    var mobile1 = this.data.mobile;
    var calltype = this.data.selectele;
    var remarks1 = this.data.Remarks;
    var firstname = this.data.firstname;
    var lastname1 = this.data.lastname;
    var purpose = this.data.courtesypurp;
    var customername = this.data.firstname;
    var responseid = this.data.callout;
    var cbsid = window.localStorage['customerID'];

    console.log(responseid)
    console.log(remarks1)
    if (lastname1 == "" || lastname1 == null || lastname1 == undefined) {

      var lastname = null;
    } else {
      var lastname = lastname1;
    } 
    if (remarks1 == "" || remarks1 == null || remarks1 == undefined) {

      var remarks = null;
    } else {
      var remarks = remarks1;
    }
    if (mobile1 == "" || mobile1 == null || mobile1 == undefined) {

      var mobile = null;
    } else {
      var mobile = mobile1;
    }
    console.log(this.data.courtesypurp)

    if (purpose == undefined || purpose == null || purpose == "") {
      // var myPopup = $ionicPopup.show({
      //   template: '<center>Select Purpose</center>',
      //   title: 'Warning',
      //   scope: this,
      //   buttons: [{
      //     text: 'OK',
      //     type: 'button button-clear button-assertive'
      //   }]
      // });
      // this.hidespin($ionicLoading);
      this.Alertservice.presentAlert('Warning',"Select Purpose");
      return false;

    }

    if (purpose == "5" && this.data.current == "Y") {
      if ((this.data.collected_date == null || this.data.collected_date == undefined || this.data.collected_date == "") || (this.data.collected_accno == null || this.data.collected_accno == undefined || this.data.collected_accno == "") || (this.data.collectamount == null || this.data.collectamount == "" || this.data.collectamount == undefined)) {

        // var myPopup = $ionicPopup.show({
        //   template: '<center>Fill All Details Of Amount Collected</center>',
        //   title: 'Warning',
        //   scope: this,
        //   buttons: [{
        //     text: 'OK',
        //     type: 'button button-clear button-assertive'
        //   }]
        // });
        // this.hidespin($ionicLoading);
        this.Alertservice.presentAlert('Warning',"Fill All Details Of Amount Collected");
        return false;

      } else {
        var collectionmode = "Y";
        // this.Collectiondate1 = this.data.collected_date;
        // var collectiondate = $filter('date')(this.Collectiondate1, 'yyyy-MM-dd');
        this.Collectiondate1 = this.data.collected_date;
      var collectiondate = moment(this.Collectiondate1).format('YYYY-MM-DD');
        var accountno = this.data.collected_accno;
        var amount = this.data.collectamount;
      }

    }


    if (purpose != "5") {
      var collectionmode:string = null;

    }

    if (collectionmode == null) {
      var accountno = null;
      var amount = null;
      var collectiondate:string = null;

    }

    if (purpose == 5) {
      if (this.data.current == "" || this.data.current == undefined || this.data.current == null || this.data.current == "N") {

        var collectionmode:string = null;

      }

    }


    console.log(this.data.current)

    if (this.data.callout == "" || this.data.callout == undefined || this.data.callout == null) {

      // var myPopup = $ionicPopup.show({
      //   template: '<center>Select Call OutCome</center>',
      //   title: 'Warning',
      //   scope: this,
      //   buttons: [{
      //     text: 'OK',
      //     type: 'button button-clear button-assertive'
      //   }]
      // });
      // this.hidespin($ionicLoading);
      this.Alertservice.presentAlert('Warning',"Select Call OutCome");
      return false;
    }



    if (responseid == "2") {
      if ((this.data.followupdate == null || this.data.followupdate == undefined || this.data.followupdate == "") || (this.data.followuptime == undefined || this.data.followuptime == "" || this.data.followuptime == null)) {
        // var myPopup = $ionicPopup.show({
        //   template: '<center>Provide Followup Details</center>',
        //   title: 'Warning',
        //   scope: this,
        //   buttons: [{
        //     text: 'OK',
        //     type: 'button button-clear button-assertive'
        //   }]
        // });
        // this.hidespin($ionicLoading);
        this.Alertservice.presentAlert('Warning',"Provide Followup Details");
        return false;


      } else {
        // this.nextcalldate1 = $filter('date')(this.data.followupdate, 'yyyy-MM-dd');
        // this.followuptime = $filter('date')(this.data.followuptime, 'h.mm a');
        // var nextcalldate = this.nextcalldate1 + ' ' + this.followuptime;
        this.nextcalldate1 = moment(this.data.followupdate).format('YYYY-MM-DD');
        this.followuptime = moment(this.data.followuptime).format('h.mm a')
       //  this.followuptime = $filter('date')(this.data.followuptime, 'h.mm a');
         var nextcalldate = this.nextcalldate1 + ' ' +this.followuptime;
      }

    }

    if (responseid != "2") {
      var nextcalldate = " ";
      //          var Endtime = null;
      // var Totime = null;

    }

    if (this.data.selectele == "" || this.data.selectele == undefined || this.data.selectele == null) {
      // var myPopup = $ionicPopup.show({
      //   template: '<center>Select Call Type</center>',
      //   title: 'Warning',
      //   scope: this,
      //   buttons: [{
      //     text: 'OK',
      //     type: 'button button-clear button-assertive'
      //   }]
      // });
      // this.hidespin($ionicLoading);
      this.Alertservice.presentAlert('Warning',"Select Call Type");
      return false;

    }

    if (this.data.selectele == "P" && this.data.JointVisit == "YES") {
      if (this.data.jointcode == null || this.data.jointcode == "" || this.data.jointcode == undefined) {
        // var myPopup = $ionicPopup.show({
        //   template: '<center>Enter Joint Usercode</center>',
        //   title: 'Warning',
        //   scope: this,
        //   buttons: [{
        //     text: 'OK',
        //     type: 'button button-clear button-assertive'
        //   }]
        // });
        // this.hidespin($ionicLoading);
        this.Alertservice.presentAlert('Warning',"Enter Joint Usercode");
        return false;
      }

      else {
        var jointvisit = "Y";
        var jointcode = this.data.jointcode;

      }


    }

    if (this.data.selectele == "P") {
      if (this.data.JointVisit == "" || this.data.JointVisit == undefined || this.data.JointVisit == null || this.data.JointVisit == "N") {

        var jointvisit:string = null;
      }

    }

    if (this.data.selectele != "P") {

      var jointvisit:string = null;

    }

    if (jointvisit == null) {
      var jointcode = null;
    }
    var BusinessUnit = 0;
    var Endtime = null;
    var Totime = null;
    console.log(this.data.followupdate)
    console.log(this.data.followuptime)
    console.log(this.data.JointVisit)
    if(lastname == '.') lastname = null;
console.log(branchid, cbsid, customername, mobile, CallerId, username, calltype, remarks, purpose, responseid, nextcalldate, firstname, lastname, usercode, callid, accountno, amount, collectiondate, collectionmode, jointvisit, jointcode, Endtime, Totime, BusinessUnit)
var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
var checkForSpecialChar = function(string){
for(let i = 0; i < specialChars.length;i++){
 if(string.indexOf(specialChars[i]) > -1){
     return true
  }
}
return false;
}   
if(checkForSpecialChar(customername)){
// alert("First Name should not contain special character");
// var alertPopup = $ionicPopup.alert({
//   title: 'Warning',
//   template: 'First Name should not contain special character '
// });
this.Alertservice.presentAlert('Warning',"First Name should not contain special character");
} else {
  
// this.showspin();
   this.Apiservice.DemandEntry(branchid, cbsid, customername, mobile, CallerId, username, calltype, remarks, purpose, responseid, nextcalldate, firstname, lastname, usercode, callid, accountno, amount, collectiondate, collectionmode, jointvisit, jointcode, Endtime, Totime, BusinessUnit)
      .then((res:any)=> {
        var response = res.data;
  response = JSON.parse(response);
  response = JSON.parse(response);
        // this.hidespin();
        // response = JSON.parse(response);
        var success = [];
        success = response;
        window.localStorage['date'] = "";

        if (success[0].response == 1) {

          // var alertPopup = $ionicPopup.alert({
          //   title: 'Warning',
          //   template: 'Please Visit Follow Up Screen As It Is In FOLLOW UP Status ' + success[0].Column1
          // });
          this.Alertservice.presentAlert('Warning',"Please Visit Follow Up Screen As It Is In FOLLOW UP Status " + success[0].Column1);
          // alertPopup.then(function (res) {
          //   this.UpdateModal.hide();
          //   // Custom functionality....
          // });

        }
        else {

          this.Alertservice.presentAlert('Success',"Saved Successfully");
          // var alertPopup = $ionicPopup.alert({
          //   title: 'Success',
          //   template: 'Saved Successfully'
          // });

          // alertPopup.then(function (res) {
          //   this.smaAccountaction.hide();
          //   this.getdemandcollectionCustomers(); cmd by sijin
          //   // Custom functionality....
          // });
          this.data = {};
        }
        
        // this.getsmaAmount();

      })
      // .error(function (response) {
      //   this.hidespin();
      //   console.log(response);
      // });

    }

      // this.data={};

  }

}
