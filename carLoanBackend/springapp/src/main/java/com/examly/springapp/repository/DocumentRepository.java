package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.entity.DocumentModel;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentModel, Integer> {
    @Query(value = "select * From document_model WHERE loan_id=:id", nativeQuery = true)
    public DocumentModel getLoanByLoanId(@Param("id") int loanId);
}
