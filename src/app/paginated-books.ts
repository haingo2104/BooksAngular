import { Book } from "./book";

export interface PaginatedBooks {
    books: Book[];       
    total: number; 
}
