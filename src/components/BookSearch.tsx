import React, { useState } from 'react';
import { Book, GoogleBooksApiResponse } from '../types';

interface BookSearchProps {
  addToFavorites: (book: Book) => void;
  searchResults: Book[];
  setSearchResults: React.Dispatch<React.SetStateAction<Book[]>>;
  favorites: Book[];
}

function BookSearch({ addToFavorites, searchResults, setSearchResults, favorites }: BookSearchProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: GoogleBooksApiResponse = await response.json();
      
      const books: Book[] = data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        imageUrl: item.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.png',
        description: item.volumeInfo.description
      }));
      
      setSearchResults(books.filter(book => !favorites.some(f => f.id === book.id)));
    } catch (error) {
      setError('Error al buscar libros. Por favor, intenta de nuevo.');
      console.error('Error searching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-purple-100 p-4 sm:p-8 rounded-3xl shadow-2xl transition-all duration-300 ease-in-out">
      <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-purple-800 text-center">
        Descubre tu próxima aventura literaria
      </h2>
      <form onSubmit={searchBooks} className="flex flex-col sm:flex-row mb-4 sm:mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Explora libros por título, autor o tema..."
          className="w-full sm:flex-grow p-3 sm:p-4 rounded-full sm:rounded-l-full sm:rounded-r-none mb-2 sm:mb-0 md:text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full sm:rounded-l-none sm:rounded-r-full text-lg font-semibold hover:bg-orange-600 disabled:bg-orange-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {searchResults.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:rotate-1"
          >
            <div className="p-4 sm:p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img 
                  src={book.imageUrl} 
                  alt={book.title} 
                  className="w-20 h-30 sm:w-24 sm:h-36 hover:rotate-3 object-cover rounded-lg shadow-md mr-4 transition-transform duration-300 hover:scale-105" 
                />
                <div>
                  <h3 className="font-bold text-md xl:text-xl mb-2 text-purple-800 line-clamp-2">{book.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 italic">
                    {book.authors?.join(', ') || 'Autor desconocido'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3 mb-4 flex-grow">
                {book.description || 'No hay descripción disponible'}
              </p>
              <button 
                onClick={() => addToFavorites(book)}
                className="w-full bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Añadir a Favoritos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;