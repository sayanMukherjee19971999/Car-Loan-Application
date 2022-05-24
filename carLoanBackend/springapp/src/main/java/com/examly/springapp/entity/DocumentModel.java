package com.examly.springapp.entity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class DocumentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String fileName;
    private String fileType;

    @Lob
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "loan_id")
    private LoanApplicationModel loan;

    public DocumentModel() {
    }

    public DocumentModel(String fileName, String fileType, byte[] data, LoanApplicationModel loan) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.data = data;
        this.loan = loan;
    }

    public LoanApplicationModel getLoan() {
        return loan;
    }

    public void setLoan(LoanApplicationModel loan) {
        this.loan = loan;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}


