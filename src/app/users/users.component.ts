import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  showAdvancedSearch = false;
  searchCriteria = {
    name: '',
    email: '',
    role: ''
  };

  toggleAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  performSearch() {
    // Implement your search logic here
    console.log('Search criteria:', this.searchCriteria);
  }



}
