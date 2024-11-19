package com.hexa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexa.entity.Book;

public interface BookRepository extends JpaRepository<Book, String> {

}
