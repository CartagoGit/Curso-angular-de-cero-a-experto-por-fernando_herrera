import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [
    `
      .search-container {
        background-color: white;
        border-radius: 5px;
        border: 1px solid grey;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
        padding: 5px;
        position: fixed;
        right: 20px;
        top: 20px;
        width: 270px;
      }
    `,
  ],
})
export class SearchBarComponent implements OnInit {
  private debounceTimer?: NodeJS.Timeout;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  public onQueryChange(query: string = ''): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.apiService.getLugaresByQuery(query);
    }, 300);
  }
}
