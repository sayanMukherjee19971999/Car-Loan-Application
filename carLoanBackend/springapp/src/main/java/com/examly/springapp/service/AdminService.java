package com.examly.springapp.service;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.DocumentModel;
import com.examly.springapp.entity.LoanApplicationModel;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.DocumentRepository;
import com.examly.springapp.repository.LoanRepository;
import com.examly.springapp.repository.UserRepo;

@Service
public class AdminService {
	
	@Autowired
	private LoanRepository loanRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private DocumentRepository docRepo;
	

	public User getCurrentUser() {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.getUserByEmail(email);
	}


	public LoanApplicationModel approveLoan(LoanApplicationModel loan) {
		LoanApplicationModel ln = loanRepo.getLoanByLoanId(loan.getLoanId());
        ln.setLoanId(loan.getLoanId());
        if(loan.getLoanType().toLowerCase().equals("approve")) {
			ln.setLoanType("approve");
			double emi = Integer.valueOf(ln.getLoanAmountRequired())/Integer.valueOf(ln.getLoanRepaymentMonths());
	    	ln.setMonthlyEmi(emi);
		}else if(loan.getLoanType().toLowerCase().equals("reject")){
			ln.setLoanType("reject");
			ln.setMonthlyEmi(0);
		}
		else {
			ln.setLoanType("pending");
			ln.setMonthlyEmi(0);
		}
        return loanRepo.save(ln);
    }
	public byte[] verifyDocuments(DocumentModel data,HttpServletResponse request) {

		int loanId = data.getLoan().getLoanId();
		DocumentModel doc = docRepo.getLoanByLoanId(loanId);
		request.setHeader("Content-Disposition", "attachment; filename=" + doc.getFileName());
		return doc.getData();
	
}

public String getFileName(int loanId, HttpServletResponse request) {

	DocumentModel doc = docRepo.getLoanByLoanId(loanId);

	request.setHeader("Content-Disposition", "attachment; filename=" + doc.getFileName());
	return doc.getFileName();
}

public String getFileType(int loanId, HttpServletResponse request) {

	DocumentModel doc = docRepo.getLoanByLoanId(loanId);

	request.setHeader("Content-Disposition", "attachment; filename=" + doc.getFileName());
	return doc.getFileType();
}
	public void editLoan(LoanApplicationModel loan, int id) {
		LoanApplicationModel ln = loanRepo.getLoanByLoanId(id);
        ln.setLoanId(id);
        if(loan.getLoanType().toLowerCase().equals("approve")) {
			ln.setLoanType("approve");
			double emi = Integer.valueOf(ln.getLoanAmountRequired())/Integer.valueOf(ln.getLoanRepaymentMonths());
	    	ln.setMonthlyEmi(emi);
		}else if(loan.getLoanType().toLowerCase().equals("reject")){
			ln.setLoanType("reject");
			ln.setMonthlyEmi(0);
		}
		else {
			ln.setLoanType("pending");
			ln.setMonthlyEmi(0);
		}
        loanRepo.save(ln);
    }

    public void deleteLoan(int id) {

        loanRepo.deleteById(id);
    }
    public List<LoanApplicationModel> getAllLoans() {
        return loanRepo.findAll();
    }
	public LoanApplicationModel getLoanById(int loanId) {
    	return loanRepo.getLoanByLoanId(loanId);
    }
    
    
    public LoanApplicationModel generateSchedule(int loanId) {
    	LoanApplicationModel ln = loanRepo.getLoanByLoanId(loanId);
    	double emi = Integer.valueOf(ln.getLoanAmountRequired())/Integer.valueOf(ln.getLoanRepaymentMonths());
    	ln.setMonthlyEmi(emi);
    	return loanRepo.save(ln);
    }
	
    public LoanApplicationModel editSchedule(LoanApplicationModel loan, int loanId) {
    	
    	double emi = Integer.valueOf(loan.getLoanAmountRequired())/Integer.valueOf(loan.getLoanRepaymentMonths());
    	loan.setMonthlyEmi(emi);
    	return loanRepo.save(loan);
    }
    public void deleteSchedule(int loanId) {
    	LoanApplicationModel ln = loanRepo.getLoanByLoanId(loanId);
    	ln.setMonthlyEmi(0);
        loanRepo.save(ln);
    }
}

