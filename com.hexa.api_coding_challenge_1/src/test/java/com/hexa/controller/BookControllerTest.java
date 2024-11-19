package com.hexa.controller;

import com.hexa.entity.Book;
import com.hexa.exception.BookNotFoundException;
import com.hexa.exception.DuplicateBookException;
import com.hexa.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookController bookController;

    @Autowired
    private MockMvc mockMvc;  // Ensure this is Autowired

    private Book book;

    @BeforeEach
    void setUp() {
        book = new Book("12345", "Test Book", "Test Author", 2024);
    }

    @Test
    void testGetAllBooks() throws Exception {
        when(bookService.getAllBooks()).thenReturn(List.of(book));

        mockMvc.perform(get("/api/book/getAll"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetBookByIsbn_Success() throws Exception {
        when(bookService.getBookByIsbn("12345")).thenReturn(Optional.of(book));

        mockMvc.perform(get("/api/book/12345"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isbn").value("12345"))
                .andExpect(jsonPath("$.title").value("Test Book"));
    }

    @Test
    void testGetBookByIsbn_NotFound() throws Exception {
        when(bookService.getBookByIsbn("12345")).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/book/12345"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Book with ISBN 12345 not found."));
    }

    @Test
    void testAddBook_Success() throws Exception {
        when(bookService.getBookByIsbn("12345")).thenReturn(Optional.empty());
        when(bookService.addBook(any(Book.class))).thenReturn(book);

        mockMvc.perform(post("/api/book/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"isbn\":\"12345\",\"title\":\"Test Book\",\"author\":\"Test Author\",\"publicationYear\":2024}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isbn").value("12345"))
                .andExpect(jsonPath("$.title").value("Test Book"));
    }

    @Test
    void testAddBook_Duplicate() throws Exception {
        when(bookService.getBookByIsbn("12345")).thenReturn(Optional.of(book));

        mockMvc.perform(post("/api/book/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"isbn\":\"12345\",\"title\":\"Test Book\",\"author\":\"Test Author\",\"publicationYear\":2024}"))
                .andExpect(status().isConflict())
                .andExpect(content().string("Book with ISBN 12345 already exists."));
    }

    @Test
    void testUpdateBook_Success() throws Exception {
        when(bookService.getBookByIsbn("12345")).thenReturn(Optional.of(book));
        when(bookService.updateBook(any(Book.class))).thenReturn(book);

        mockMvc.perform(put("/api/book/updateBook/12345")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"isbn\":\"12345\",\"title\":\"Updated Book\",\"author\":\"Test Author\",\"publicationYear\":2024}"))
                .andExpect(status().isOk());
    }

    @Test
    void testUpdateBook_NotFound() throws Exception {
        when(bookService.getBookByIsbn("12345")).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/book/updateBook/12345")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"isbn\":\"12345\",\"title\":\"Updated Book\",\"author\":\"Test Author\",\"publicationYear\":2024}"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Book with ISBN 12345 not found."));
    }

    @Test
    void testDeleteBook_Success() throws Exception {
        when(bookService.getBookByIsbn("12345")).thenReturn(Optional.of(book));
        doNothing().when(bookService).deleteBookByIsbn("12345");

        mockMvc.perform(delete("/api/book/delete/12345"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testDeleteBook_NotFound() throws Exception {
        when(bookService.getBookByIsbn("12345")).thenReturn(Optional.empty());

        mockMvc.perform(delete("/api/book/delete/12345"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Book with ISBN 12345 not found."));
    }
}
