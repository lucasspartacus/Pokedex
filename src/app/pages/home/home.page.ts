import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/pokeapi.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getCardColor } from 'src/app/utils/utils';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  allPokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchTerm: string = '';
  page = 1;
  limit = 20;

  constructor(private pokeApi: PokeApiService, private router: Router) {}
  ngOnInit() {
    this.pokeApi.getAllPokemonNames().subscribe(response => {
      this.allPokemons = response.results.map((p: { name: string; url: string }, index: number) => ({
        name: p.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }));
      this.loadPokemons();
    });
  }

  loadPokemons() {
    const offset = (this.page - 1) * this.limit;
    this.pokeApi.getPokemons(this.limit, offset).subscribe(res => {
      const pokemonList = res.results.map((p: { name: string; url: string }, index: number) => ({
        ...p,
        id: offset + index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${offset + index + 1}.png`
      }));

      const requests = pokemonList.map((p: { name: string }) =>
        this.pokeApi.getPokemonDetails(p.name)
      );

      Promise.all(requests.map((req: Observable<any>) => req.toPromise())).then(details => {
        this.pokemons = details.map((detail, i) => ({
          ...pokemonList[i],
          types: detail.types
        }));
        this.filteredPokemons = [...this.pokemons];
      });
    });
  }

  searchPokemon() {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
      this.filteredPokemons = [...this.pokemons];
    } else {
      this.filteredPokemons = this.allPokemons.filter(pokemon =>
        pokemon.name.includes(term)
      );
    }
  }

  nextPage() {
    this.page++;
    this.loadPokemons();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPokemons();
    }
  }

  goToDetails(name: string) {
    this.router.navigate(['/details', name]);
  }

  getCardColor = getCardColor;
}
