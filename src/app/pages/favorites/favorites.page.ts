import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { PokeApiService } from 'src/app/services/pokeapi.service';
import { Router } from '@angular/router';
import { getCardColor } from 'src/app/utils/utils';

@Component({
  standalone: false,
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoritePokemons: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private pokeApiService: PokeApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const favoriteNames = this.favoritesService.getFavorites();
    this.favoritePokemons = [];

    favoriteNames.forEach(name => {
      this.pokeApiService.getPokemonDetails(name).subscribe(pokemon => {
        this.favoritePokemons.push({
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          id: pokemon.id
        });
      });
    });
  }

  goToDetails(name: string) {
    this.router.navigate(['/details', name]);
  }
}
