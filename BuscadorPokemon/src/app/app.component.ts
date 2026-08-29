import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon, PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  query = '';
  pokemon: Pokemon | null = null;
  loading = false;
  error = '';

  constructor(private pokemonService: PokemonService) {}

  search(): void {
    const term = this.query.trim();
    if (!term) {
      this.error = 'Escribe el nombre o numero de un Pokemon.';
      this.pokemon = null;
      return;
    }

    this.loading = true;
    this.error = '';

    this.pokemonService.search(term).subscribe({
      next: (result) => {
        this.pokemon = result;
        this.loading = false;
      },
      error: () => {
        this.pokemon = null;
        this.loading = false;
        this.error = `No se encontro ningun Pokemon con "${term}".`;
      },
    });
  }

  formatId(id: number): string {
    return '#' + id.toString().padStart(3, '0');
  }
}
