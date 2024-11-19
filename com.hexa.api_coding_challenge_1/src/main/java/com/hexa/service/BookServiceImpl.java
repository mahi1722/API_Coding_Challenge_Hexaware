package com.hexa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexa.entity.Book;
import com.hexa.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService {
	
	@Autowired
	BookRepository bookRepository;

	@Override
	public List<Book> getAllBooks() {
		
		return bookRepository.findAll();
	}

	@Override
	public Optional<Book> getBookByIsbn(String isbn) {
		
		return bookRepository.findById(isbn);
	}

	@Override
	public Book addBook(Book book) {
		
		return bookRepository.save(book);
	}

	@Override
	public Book updateBook(Book book) {
		
		return bookRepository.save(book);
	}

	@Override
	public void deleteBookByIsbn(String isbn) {
		bookRepository.deleteById(isbn);
		
	}
	

}
