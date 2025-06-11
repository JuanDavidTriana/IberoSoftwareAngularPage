import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: false,
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  loading = true;
  error = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.http.get<any>('https://rickandmortyapi.com/api/character')
      .subscribe({
        next: (data) => {
          this.characters = data.results;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading characters:', error);
          this.error = true;
          this.loading = false;
        }
      });
  }

  goToCharacter(id: number) {
    this.router.navigate(['/character', id]);
  }
}
