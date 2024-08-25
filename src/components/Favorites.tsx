import { Book } from '../types';

// Definición de las props del componente
interface FavoritesProps {
  favorites: Book[];
  removeFromFavorites: (book: Book) => void;
}

function Favorites({ favorites, removeFromFavorites }: FavoritesProps) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-purple-800">Favoritos</h2>
      {/* Renderizado condicional basado en si hay favoritos o no */}
      {favorites.length === 0 ? (
        <p className="text-gray-500">No hay libros favoritos aún.</p>
      ) : (
        // Lista de libros favoritos
        <ul className="space-y-2">
          {favorites.map(book => (
            <li key={book.id} className="flex items-center bg-purple-50 rounded-lg p-2 hover:shadow-md transition-shadow duration-200">
              {/* Imagen del libro */}
              <img 
                src={book.imageUrl} 
                alt={book.title} 
                className="w-12 h-16 object-cover rounded mr-3"
              />
              {/* Información del libro */}
              <div className="flex-grow">
                <h3 className="font-medium text-sm text-purple-800 line-clamp-1">{book.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {book.authors?.join(', ') || 'Autor desconocido'}
                </p>
              </div>
              {/* Botón para quitar de favoritos */}
              <button 
                onClick={() => removeFromFavorites(book)}
                className="ml-2 text-orange-500 hover:text-orange-700"
                aria-label="Quitar de favoritos"
              >
                {/* Ícono de X para quitar de favoritos */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;