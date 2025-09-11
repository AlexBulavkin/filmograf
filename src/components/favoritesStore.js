let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
const listeners = new Set();

export const favoritesStore = {
    getFavorites() {
        return favorites;
    },
    
    addToFavorites(film) {
        if (!favorites.some(fav => fav.id === film.id)) {
            favorites = [...favorites, film];
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.notifyListeners();
        }
    },
    
    removeFromFavorites(filmId) {
        favorites = favorites.filter(film => film.id !== filmId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.notifyListeners();
    },
    
    isFavorite(filmId) {
        return favorites.some(film => film.id === filmId);
    },
    
    subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    
    notifyListeners() {
        listeners.forEach(listener => listener());
    }
};