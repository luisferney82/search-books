export interface Book{
id: string;
  title: string;
  authors?: string[];
  publisher?: string;
  imageUrl?: string;
  description?: string;

}


export interface GoogleBooksApiResponse {
    items: {
      id: string;
      volumeInfo: {
        title: string;
        authors?: string[];
        publisher?: string;
        description?: string;
        imageLinks?: {
          thumbnail?: string;
        };
      };
    }[];
  }