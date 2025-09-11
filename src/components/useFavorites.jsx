import { useState, useEffect } from 'react';
import { favoritesStore } from './favoritesStore';

export function useFavorites() {
    const [favorites, setFavorites] = useState(favoritesStore.getFavorites());

    useEffect(() => {
        const unsubscribe = favoritesStore.subscribe(() => {
            setFavorites(favoritesStore.getFavorites());
        });

        return unsubscribe;
    }, []);

    const addToFavorites = (film) => {
        favoritesStore.addToFavorites(film);
    };

    const removeFromFavorites = (filmId) => {
        favoritesStore.removeFromFavorites(filmId);
    };

    const isFavorite = (filmId) => {
        return favoritesStore.isFavorite(filmId);
    };

    return {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };
}