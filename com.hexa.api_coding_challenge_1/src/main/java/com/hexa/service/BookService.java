package com.hexa.service;

import java.util.List;
import java.util.Optional;

import com.hexa.entity.Book;

public interface BookService {
	
	List<Book> getAllBooks();
	Optional<Book> getBookByIsbn(String isbn);
	Book addBook(Book book);
	Book updateBook(Book book);
	void deleteBookByIsbn(String isbn);

}
