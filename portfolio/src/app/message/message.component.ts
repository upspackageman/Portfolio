import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @ViewChild('tinymce', { static: true }) tinymceEditor: any;

  contactForm: UntypedFormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(fb: UntypedFormBuilder,private messageService: MessageService) {
    this.contactForm = fb.group({
      name: [null, [Validators.required, Validators.minLength(1)]],
      // lastName: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]]

    });

  }


  ngOnInit(): void {
    const sent = document.querySelector('#sent') as HTMLElement;
    sent.style.display = 'none';
    const load = document.querySelector('#loading') as HTMLElement;
    load.style.display ='none'


  }

  resend() {
    const form = document.querySelector('#contactForm') as HTMLElement;
    const sent = document.querySelector('#sent') as HTMLElement;
    sent.style.display = 'none';
    form.style.display = 'block';
  }



  emailErrorSent(err:any) {
    const form = document.querySelector('#contactForm') as HTMLElement;
    const sent = document.querySelector('#sent') as HTMLElement;
    const message = document.querySelector('#sent h1') as HTMLElement;
    message.innerHTML = err;
    console.log(message);
    console.log(err);
    const load = document.querySelector('#loading') as HTMLElement;
    load.style.display ='none'
    sent.style.display = 'block';
    form.style.display = 'none';
  }

  emailSent() {
    const form = document.querySelector('#contactForm') as HTMLElement;
    const sent = document.querySelector('#sent') as HTMLElement;
    const load = document.querySelector('#loading') as HTMLElement;
    load.style.display ='none'
    sent.style.display = 'block';
    form.style.display = 'none';
  }

  get f() {
    return this.contactForm.controls;
  }

  test() {
   

    let contact: any = {};

   
    const name = document.getElementById('name') as HTMLInputElement;
    contact.name = name.value;
   
    const email = document.getElementById('_email') as HTMLInputElement;
    contact.email = email.value;

    const load = document.querySelector('#loading') as HTMLElement;
    load.style.display ='block'

    const items = this.tinymceEditor._editor.contentDocument.body.querySelectorAll('p');

    contact.message = 'Contact: '+contact.name + '\n' +'Email: '+contact.email+'\n\n';

    for (let i = 0; i < items.length; i++) {

      if (items[i]) {
        contact.message += items[i].innerText + '\n\n';
      }

    }
    console.log(contact.email);
    console.log(contact.name);
    console.log(contact.message);

    console.log(contact);

    this.messageService.sendEmail(contact).subscribe({
      next: (_) => {
        this.emailSent();
       
      },
      error: (err: HttpErrorResponse) => {
        //console.log(err);
        this.emailErrorSent(err);
      }
    });
  }

  }





