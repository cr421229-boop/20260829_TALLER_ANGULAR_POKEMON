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
  private readonly STORAGE_KEY = 'equipo_pokemon_registrado';

  misPokemons = signal<PokemonTarjeta[]>([]);

  misPokemon() {
    return this.misPokemons();
  }

  constructor() {
    this.cargarDesdeStorage();
  }
  private cargarDesdeStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.misPokemons.set(JSON.parse(data));
    }
    
  };
  // Buscar un Pokémon en la API 

  buscarEnAPI(nombreOId: string){
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nombreOId.toLowerCase()}`);
    
  };
  // Guardar un nuevo Pokémon en el almacenamiento

  guardarPokemon(nuevo: PokemonTarjeta){
    const actualizados = [...this.misPokemons(), nuevo];
    this.misPokemons.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));

    
  };
  // Actualizar el estado de favorito de un Pokémon

  actualizarFavorito(id: number, ){
    const actualizados = this.misPokemons().map(poke =>{
      if(poke.id === id){
        return{...poke, esFavorito: !poke.esFavorito}
      }
      return poke;
    });
    this.misPokemons.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));
  };
  // Eliminar un Pokémon del almacenamiento

  eliminarPokemon(id: number){
    const filtrados = this.misPokemons().filter(poke => poke.id !== id);
    this.misPokemons.set(filtrados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtrados));
  }

  
}
