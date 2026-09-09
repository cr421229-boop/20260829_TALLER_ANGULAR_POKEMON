import { Component, signal} from '@angular/core';
import { FormsModule} from '@angular/forms';

interface PokemonData {
  name: string;
  type: string;
  image: string;
}

@Component({
  selector: 'app-buscador-pokemon',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './buscador-pokemon.component.html',
  styleUrl: './buscador-pokemon.component.css'
})
export class BuscadorPokemonComponent {

  nombrepPokemonInput = signal('');
  pokemon = signal<PokemonData | null>(null);
  mensajeError = signal<string | null>(null);

  async buscarPokemon() {

    const nombrePokemon = this.nombrepPokemonInput().trim().toLowerCase();

    if (!nombrePokemon) return;

    this.mensajeError.set(null);
    
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
      if(!respuesta.ok){
        throw new Error('¡No encontró el Pokémon!');
    }
    const datos = await respuesta.json();
    this.pokemon.set({
      name: datos.name.toUpperCase(),
      type: datos.types.map((typeInfo: any) => typeInfo.type.name).join(', '),
      image: datos.sprites.front_default
    });
  

    } catch (error: any) {
        this.pokemon.set(null);
        this.mensajeError.set(error.message);
      } 
    }  
  }
