import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface PokemonTarjeta {
  id: number;
  name: string;
  type: string;
  image: string;
  baseExperience: number;
  esFavorito?: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class PokemonStorageService {
  private http = inject(HttpClient);
  private readonly STORA_KEY = 'equipo_pokemon_registrado';

  misPokemons = signal<PokemonTarjeta[]>([]);
  constructor() {
    this.cargarDesdeStorage();
  }
  private cargarDesdeStorage() {
    const data = localStorage.getItem(this.STORA_KEY);
    if (data) {
      this.misPokemons.set(JSON.parse(data));
    }
    
  }


  
}
