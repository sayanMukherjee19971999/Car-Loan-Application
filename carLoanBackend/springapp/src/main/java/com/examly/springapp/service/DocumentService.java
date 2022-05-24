package com.examly.springapp.service;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.examly.springapp.entity.DocumentModel;
import com.examly.springapp.exception.DocumentException;

import com.examly.springapp.entity.LoanApplicationModel;
import com.examly.springapp.repository.DocumentRepository;
import com.examly.springapp.repository.LoanRepository;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository docRepo;

    @Autowired
    private LoanRepository loanRepo;

    public String getFileName(int loanId, HttpServletResponse request) {

        DocumentModel doc = docRepo.getLoanByLoanId(loanId);

        request.setHeader("Content-Disposition", "attachment; filename=\"" + doc.getFileName()+"\"");
        return doc.getFileName();
    }

    public String getFileType(int loanId, HttpServletResponse request) {

        DocumentModel doc = docRepo.getLoanByLoanId(loanId);

        request.setHeader("Content-Disposition", "attachment; filename=\"" + doc.getFileName()+"\"");
        return doc.getFileType();
    }

    // Download File code
    public byte[] getFile(int loanId, HttpServletResponse request) {

        DocumentModel doc = docRepo.getLoanByLoanId(loanId);
        request.setHeader("Content-Disposition", "attachment; filename=\"" + doc.getFileName()+"\"");
        return doc.getData();
    }

    //Upload file code
    public DocumentModel storeFile(MultipartFile file, int loanId) throws DocumentException {

        LoanApplicationModel l = loanRepo.getLoanByLoanId(loanId);

        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            // Check if the file name contains invalid characters
            if (fileName.contains("..")) {
                throw new DocumentException();
            }
            DocumentModel dbFile = new DocumentModel(fileName, file.getContentType(), file.getBytes(), l);

            dbFile.setLoan(l);

            return docRepo.save(dbFile);
        } catch (IOException ex) {
            throw new DocumentException();
        }
    }


}



