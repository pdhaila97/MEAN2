import { Component, OnInit } from '@angular/core';
import { MembersService } from '../members.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  constructor(private memberService: MembersService) {
    this.addBtnCtrl = true;
   }
  memberAdded: boolean;
  regPageDisplay: boolean;
  addBtnCtrl: boolean;
  ngOnInit() {
  }
  add(){
    this.memberAdded = false;
    this.regPageDisplay = true;
    this.addBtnCtrl = false;
  }
  onAddedMember(){
    this.memberAdded = true;
    this.regPageDisplay = false;
    this.addBtnCtrl = true;
  }
  getMessageFromList(updatedDisplayJson: { memberAdded: boolean; regPageDisplay: boolean; addBtnCtrl: boolean}){
    this.memberAdded = updatedDisplayJson.memberAdded;
    this.regPageDisplay = updatedDisplayJson.regPageDisplay;
    this.addBtnCtrl = updatedDisplayJson.addBtnCtrl;
  }
}
