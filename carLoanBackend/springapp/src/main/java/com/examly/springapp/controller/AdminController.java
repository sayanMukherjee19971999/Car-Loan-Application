package com.examly.springapp.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.examly.springapp.entity.LoanApplicationModel;
import com.examly.springapp.entity.DocumentModel;

import com.examly.springapp.entity.User;
import com.examly.springapp.exception.LoginException;
import com.examly.springapp.exception.SignupException;
import com.examly.springapp.service.AdminService;
import com.examly.springapp.repository.DocumentRepository;
import com.examly.springapp.service.UserService;
import com.examly.springapp.utility.JwtUtil;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private DocumentRepository docRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public User registerUser(@RequestBody User user) throws SignupException {
        String email = user.getEmail();
        if (email != null && !"".equals(email)) {
            User us = this.userService.getUserByEmailId(email);
            if (us != null) {
                throw new SignupException();
            }
        }
        User u = null;
        user.setUserRole("admin");
        u = this.userService.saveUser(user);
        return u;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) throws LoginException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        } catch (Exception e) {
            throw new LoginException();
        }
        return jwtUtil.generateToken(user.getEmail());
    }

    @GetMapping("/getCurrentUser")
    public ResponseEntity<User> getCurrentUser() {
        try {
            User u = adminService.getCurrentUser();
            return ResponseEntity.status(HttpStatus.OK).body(u);
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/downloadFile")
    public void downloadFile(@RequestParam("loanId") int loanId, HttpServletResponse response)
            throws Exception {
        response.getOutputStream().write(fileContent(loanId, response));
    }

    private byte[] fileContent(int loanId, HttpServletResponse response) {
        DocumentModel dm = docRepo.getLoanByLoanId(loanId);
        return adminService.verifyDocuments(dm, response);
    }

    @GetMapping("/fileName")
    public String getFileName(@RequestParam("loanId") int loanId, HttpServletResponse response) {
        return adminService.getFileName(loanId, response);
    }

    @GetMapping("/fileType")
    public String getFileType(@RequestParam("loanId") int loanId, HttpServletResponse response) {
        return adminService.getFileType(loanId, response);
    }

    @PutMapping("/editLoan/{loanId}")
    public ResponseEntity<String> editLoan(@RequestBody LoanApplicationModel loan, @PathVariable("loanId") int id) {
        try {
            adminService.editLoan(loan, id);
            return ResponseEntity.status(HttpStatus.OK).body("Loan Edited");
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/deleteLoan/{loanId}")
    public ResponseEntity<String> deleteLoan(@PathVariable("loanId") int id) {
        try {
            adminService.deleteLoan(id);
            return ResponseEntity.status(HttpStatus.OK).body("Loan Deleted");
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getLoan/{loanId}")
    public ResponseEntity<LoanApplicationModel> getLoanById(@PathVariable("loanId") int id) {
        LoanApplicationModel ln = adminService.getLoanById(id);
        if (ln == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(ln);
    }

    @GetMapping("/getAllLoans")
    public ResponseEntity<List<LoanApplicationModel>> getAllLoans() {
        List<LoanApplicationModel> ls = adminService.getAllLoans();
        if (ls.size() <= 0) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(ls);
    }

    @GetMapping("/generateSchedule/{loanId}")
    public ResponseEntity<LoanApplicationModel> generateSchedule(@PathVariable("loanId") int id) {
        LoanApplicationModel ls = adminService.generateSchedule(id);
        if (ls != null) {
            return ResponseEntity.status(HttpStatus.OK).body(ls);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PutMapping("/editRepaymentSchedule/{loanId}")
    public ResponseEntity<String> editRepaymentSchedule(@RequestBody LoanApplicationModel loan,
            @PathVariable("loanId") int id) {
        try {
            adminService.editSchedule(loan, id);
            return ResponseEntity.status(HttpStatus.OK).body("Repayment Schedule Edited");
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/deleteRepaymentSchedule/{loanId}")
    public ResponseEntity<String> deleteRepaymentSchedule(@PathVariable("loanId") int id) {
        try {
            adminService.deleteSchedule(id);
            return ResponseEntity.status(HttpStatus.OK).body("Payment Schedule Deleted");
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
