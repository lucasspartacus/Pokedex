import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: string[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    const savedFavorites = await this._storage.get('favorites');
    if (savedFavorites) {
      this.favorites = savedFavorites;
    }
  }

  getFavorites(): string[] {
    return this.favorites;
  }

  async addFavorite(pokemonName: string) {
    if (!this.favorites.includes(pokemonName)) {
      this.favorites.push(pokemonName);
      await this._storage?.set('favorites', this.favorites);
    }
  }

  async removeFavorite(pokemonName: string) {
    this.favorites = this.favorites.filter(name => name !== pokemonName);
    await this._storage?.set('favorites', this.favorites);
  }

  isFavorite(pokemonName: string): boolean {
    return this.favorites.includes(pokemonName);
  }
}
