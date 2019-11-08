import { Component, OnInit, Renderer2, Output, EventEmitter, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { MembersService } from '../members.service';
import { Member } from '../member';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('emailInput', {static: false}) emailInput: ElementRef;
  @ViewChildren('addressInputs') addressInputs: QueryList<ElementRef>;
  @ViewChild('phoneInput', {static: false}) phoneInput: ElementRef;
  inputElementsArray = [];
  regInvalid = false;
  inputVals: { email: string; name: string; address: string[], phone: string};
  constructor(private membersService: MembersService, private router: Router, private renderer: Renderer2) { }
  @Output() addedMember = new EventEmitter<boolean>();
  ngOnInit() {
    this.inputVals = this.membersService.inputVals;
  }
  ngAfterViewInit() {
    this.inputVals.address.forEach((item, index) => {
      if(index !== 0){
        this.addAddressField(item);
      }
    })
  }

  ngOnDestroy(){
    // this.inputElementsArray.forEach(
    //   (item) => {
    //     this.renderer.removeChild(item, item.children[0]);
    //   }
    // )
    console.log("Component Destroyed");
  }
  validateInputs():boolean{
    let addressInputsArray = [];
    Array.from(this.addressInputs.toArray()[0].nativeElement.children).forEach((item: any) => {
      addressInputsArray.push(item.value);
    });
    if(this.nameInput && this.emailInput && this.phoneInput 
      && addressInputsArray.every((item) => {
          return item;
      })){
      // let id;
      // this.membersService.isGettingUpdated? id = this.inputVals.id: id = this.generateKey(); 
      let member: Member = new Member(this.nameInput.nativeElement.value, this.emailInput.nativeElement.value, addressInputsArray, this.phoneInput.nativeElement.value);
      // console.log(`ID: ${id}`);
      if(this.membersService.isGettingUpdated){
        this.membersService.update(this.nameInput.nativeElement.value, this.emailInput.nativeElement.value, addressInputsArray, this.phoneInput.nativeElement.value).subscribe(
          (res) => {
            console.log(res);
            this.membersService.isGettingUpdated = false;
            this.router.navigate(['/list']);
          }
        );
      }else{
        this.membersService.add(member).subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['/list']);
          }
        );
      }
      this.membersService.inputVals.email = "";
      this.membersService.inputVals.address = [""];
      this.membersService.inputVals.name="";
      this.membersService.inputVals.phone="";
      this.regInvalid = false;
      this.addedMember.emit(true);
    }else{
      this.regInvalid = true;
    }
    return false;
  }
  
  addAddressField(item?){
    let input = this.renderer.createElement('input');
    let countAddressInputs = Array.from(this.addressInputs.toArray()[0].nativeElement.children).length;
    this.renderer.setAttribute(input, 'type', 'textarea');
    this.renderer.setAttribute(input, 'placeholder', `Secondary Address ${countAddressInputs}`);
    this.renderer.setAttribute(input, 'class', 'form-control');
    if(this.membersService.isGettingUpdated){
      this.renderer.setProperty(input, 'value', item);
    }
    this.renderer.appendChild(this.addressInputs.toArray()[this.addressInputs.length - 1].nativeElement, input);
    this.inputElementsArray.push(this.addressInputs.toArray()[this.addressInputs.length - 1].nativeElement);
  }

}
