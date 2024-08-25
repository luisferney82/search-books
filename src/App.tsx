import  { useState, useCallback } from 'react';
import BookSearch from './components/BookSearch';
import Favorites from './components/Favorites';
import { Book } from './types';

function App() {
  // Estado para los libros favoritos y los resultados de búsqueda
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  // Función para añadir un libro a favoritos
  const addToFavorites = useCallback((book: Book) => {
    setFavorites(prevFavorites => [...prevFavorites, book]);
    setSearchResults(prevResults => prevResults.filter(b => b.id !== book.id));
  }, []);

  // Función para quitar un libro de favoritos
  const removeFromFavorites = useCallback((book: Book) => {
    setFavorites(prevFavorites => prevFavorites.filter(b => b.id !== book.id));
    setSearchResults(prevResults => [book,...prevResults]);
  }, []);

  return (
    <div className="min-h-screen bg-purple-100">
      {/* Barra superior con mensaje */}
      <header className="bg-purple-800 text-white py-2 px-4 text-center">
        <p className="flex items-center justify-center text-sm">
          Hecho con amor por Luis Ferney para Cosmoteca
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </p>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-purple-800">Búsqueda de Libros</h1>
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Sección de búsqueda de libros */}
          <section className="sm:w-1/2 md:w-2/3 ">
            <BookSearch 
              addToFavorites={addToFavorites} 
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              favorites={favorites}
            />
          </section>
          {/* Sección de libros favoritos */}
          <aside className=" md:w-1/3">

            <Favorites 
              favorites={favorites} 
              removeFromFavorites={removeFromFavorites} 
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;