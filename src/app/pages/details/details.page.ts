import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'src/app/services/pokeapi.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { getCardColor } from 'src/app/utils/utils';

@Component({
  standalone: false,
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemon: any;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokeApi: PokeApiService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.loadPokemon(name);
    }
  }

  loadPokemon(name: string) {
    this.pokeApi.getPokemonDetails(name).subscribe(data => {
      this.pokemon = data;
      this.isFavorite = this.favoritesService.isFavorite(name);
    });
  }

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.favoritesService.removeFavorite(this.pokemon.name);
    } else {
      await this.favoritesService.addFavorite(this.pokemon.name);
    }
    this.isFavorite = this.favoritesService.isFavorite(this.pokemon.name);
  }

  getTypes(): string {
    return this.pokemon.types.map((t: any) => t.type.name).join(', ');
  }

  getAbilities(): string {
    return this.pokemon.abilities.map((a: any) => a.ability.name).join(', ');
  }

  getCardColor = getCardColor;

}
