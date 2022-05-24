package com.examly.springapp.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.examly.springapp.entity.DocumentModel;
import com.examly.springapp.service.DocumentService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/uploadFile")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
            @RequestParam("loanId") int loanId) throws Exception {
        DocumentModel dbFile = documentService.storeFile(file, loanId);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(dbFile.getFileName())
                .toUriString();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("File Uploaded Successfully. You can download the file from " + fileDownloadUri);
    }

    @GetMapping("/downloadFile")
    public void downloadFile(@RequestParam("loanId") int loanId, HttpServletResponse response)
            throws Exception {
        response.getOutputStream().write(fileContent(loanId, response));
    }

    private byte[] fileContent(int loanId, HttpServletResponse response) {
        return documentService.getFile(loanId, response);
    }

    @GetMapping("/fileName")
    public String getFileName(@RequestParam("loanId") int loanId, HttpServletResponse response) {
        return documentService.getFileName(loanId, response);
    }

    @GetMapping("/fileType")
    public String getFileType(@RequestParam("loanId") int loanId, HttpServletResponse response) {
        return documentService.getFileType(loanId, response);
    }

}
