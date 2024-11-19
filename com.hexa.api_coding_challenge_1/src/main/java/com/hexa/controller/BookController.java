package com.hexa.controller;

import com.hexa.entity.Book;
import com.hexa.exception.BookNotFoundException;
import com.hexa.exception.DuplicateBookException;
import com.hexa.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/getAll")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable String isbn) {
        return bookService.getBookByIsbn(isbn)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new BookNotFoundException(isbn));
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@Valid @RequestBody Book book) {
        if (bookService.getBookByIsbn(book.getIsbn()).isPresent()) {
            throw new DuplicateBookException(book.getIsbn());
        }
        return ResponseEntity.ok(bookService.addBook(book));
    }

    @PutMapping("/updateBook/{isbn}")
    public ResponseEntity<Book> updateBook(@PathVariable String isbn, @Valid @RequestBody Book book) {
        if (!bookService.getBookByIsbn(isbn).isPresent()) {
            throw new BookNotFoundException(isbn);
        }
        book.setIsbn(isbn);
        return ResponseEntity.ok(bookService.updateBook(book));
    }

    @DeleteMapping("/delete/{isbn}")
    public ResponseEntity<Void> deleteBook(@PathVariable String isbn) {
        if (!bookService.getBookByIsbn(isbn).isPresent()) {
            throw new BookNotFoundException(isbn);
        }
        bookService.deleteBookByIsbn(isbn);
        return ResponseEntity.noContent().build();
    }
}
