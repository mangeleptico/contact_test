import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from 'src/app/core/services/contact.service';
import { Contact } from '../../core/models/Contact';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.sass']
})
export class ContactTableComponent implements OnInit, OnChanges, AfterViewInit {

  displayedColumns = ['id', 'names', 'last_names','email', 'phone'];
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>([]);
  @Input() newContact!: Contact;
  @Input() formSubmitted: boolean = false;
  @Output() resetForm = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.getContacts();
  }
  /**
 * Function that get the list of contacts from database
 * @author Miguel Restrepo
 **/
  getContacts() {
    const data: Contact[] = [];
    this.contactService.getContacts().subscribe(res => {
      res.docs.forEach(element => {
        data.push(element.data() as Contact);
      });
      this.dataSource.data = data;
    });
  }

 /**
 * Function that get the changes of the input
 * @author Miguel Restrepo
 * @param changes: Get the simple changes of the input
 **/
  ngOnChanges(changes: SimpleChanges) {
    if (changes['formSubmitted'] && !changes['formSubmitted'].isFirstChange()) {
      this.dataSource.data.push(this.newContact);
      this.dataSource.data = this.dataSource.data.slice();
      this.resetForm.emit('reset');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


}
