import { Component, OnInit} from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/core/services/contact.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.sass']
})
export class ContactFormComponent implements OnInit {

  items!: any[];
  contact: any;
  submited: boolean = false;
  spinner: boolean = false;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private authService: AuthenticationService,
    private router: Router,
    private matSnackBar: MatSnackBar
    ) {
    }
  ngOnInit(): void {
    this.createForm();
  }

  /**
 * This is a function that create the contact formGroup.
 * @author Miguel Restrepo
 **/
  createForm() {
    this.contact = this.fb.group({
    names: ['', Validators.required],
    last_names: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    id: ['', Validators.required],
    })
  }

  /**
 * This is a function that logout of the app.
 * @author Miguel Restrepo
 **/
  logOut(){
    this.spinner = true;
    this.authService.logout()
    .then(() => {
      this.router.navigate(['/auth/login']);
      this.spinner = false;
    })
    .catch((error: any) => {
      console.log(error);
      this.spinner = false;
    });

  }

  /**
 * Through an Output the form is reseted after the element is created and added at the table.
 * @author Miguel Restrepo
 **/
  resetForm(message: string) {
    this.contact.reset();
  }

    /**
 * Function that send the contact form info to the contactService, and save the element
 * @author Miguel Restrepo
 **/
  submit() {
    if (this.contact.valid) {
      this.spinner = true;
      this.contactService.saveContact(this.contact.value)
      .then(() => {
        this.spinner = false;
        this.submited = true;
        this.matSnackBar.open('Contacto guardado', 'Ok', {"duration": 3000})
      }, error => {
        console.log(error);
        this.spinner = false;
      })
      this.submited = false;
    } else {
      this.contact.markAllAsTouched();
    }
  }

}
