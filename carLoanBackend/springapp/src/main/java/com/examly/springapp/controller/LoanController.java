package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.LoanApplicationModel;
import com.examly.springapp.service.LoanService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping("/viewLoan")
    public ResponseEntity<LoanApplicationModel> viewLoan(@RequestParam("loanId") int loanId) {
        LoanApplicationModel l = loanService.getLoanById(loanId);
        if (l == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(l);
    }

    @PutMapping("/editLoan/{loanId}")
    public ResponseEntity<String> editLoan(@RequestBody LoanApplicationModel loan, @PathVariable("loanId") int id) {
        try {
            loanService.editLoan(loan, id);
            return ResponseEntity.status(HttpStatus.OK).body("Loan Edited");
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addLoan")
    public ResponseEntity<LoanApplicationModel> addLoan(@RequestBody LoanApplicationModel loan) {
        LoanApplicationModel l = loanService.addLoan(loan);
        if (l != null) {
            return ResponseEntity.status(HttpStatus.OK).body(l);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @DeleteMapping("/deleteLoan/{loanId}")
    public ResponseEntity<String> deleteLoan(@PathVariable("loanId") int id) {
        try {
            loanService.deleteLoan(id);
            return ResponseEntity.status(HttpStatus.OK).body("Loan Deleted");
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
