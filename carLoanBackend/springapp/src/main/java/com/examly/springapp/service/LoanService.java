package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.LoanApplicationModel;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.LoanRepository;
import com.examly.springapp.repository.UserRepo;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepo;

    @Autowired
    private UserRepo userRepo;

    List<LoanApplicationModel> list = new ArrayList<>();

    public List<LoanApplicationModel> getAllLoan() {
        return loanRepo.findAll();
    }

    public List<LoanApplicationModel> getLoan() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User u = userRepo.getUserByEmail(email);

        return loanRepo.findByUser(u);
    }

    public LoanApplicationModel getLoanById(int loanId) {
        return loanRepo.getLoanByLoanId(loanId);
    }

    public LoanApplicationModel addLoan(LoanApplicationModel loan) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User u = userRepo.getUserByEmail(email);

        loan.setUser(u);

        return loanRepo.save(loan);
    }

    public void editLoan(LoanApplicationModel loan, int id) {
        loan.setLoanId(id);
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User u = userRepo.getUserByEmail(email);

        loan.setUser(u);
        loanRepo.save(loan);
    }

    public void deleteLoan(int id) {

        loanRepo.deleteById(id);
    }
}
