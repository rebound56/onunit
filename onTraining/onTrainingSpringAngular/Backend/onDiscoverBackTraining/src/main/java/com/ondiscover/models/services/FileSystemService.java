package com.ondiscover.models.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileSystemService implements IFileSystemService {

	private final Logger log = LoggerFactory.getLogger(getClass());
	/** Variable stores the path directory where files will be saved */
	public static String UPLOAD_DIRECTORY = "src//main//resources//static//upload";

	/*
	 * @see com.ondiscover.models.services.IFileSystemService#load(java.lang.String)
	 */
	@Override
	public byte[] load(String fileName) throws IOException {
		Path fileDirectory = this.getPathByFileName(fileName);
		return Files.readAllBytes(fileDirectory);
	}

	/*
	 * @see
	 * com.ondiscover.models.services.IFileSystemService#copy(org.springframework.
	 * web.multipart.MultipartFile)
	 */
	@Override
	public String copy(MultipartFile file) throws IOException {
		String fileName = this.generateRandomFileName(file);
		Path fileDirectory = this.getPathByFileName(fileName);
		Files.write(fileDirectory, file.getBytes());
		return fileName;
	}

	/*
	 * @see
	 * com.ondiscover.models.services.IFileSystemService#delete(java.lang.String)
	 */
	@Override
	public boolean delete(String fileName) {
		Path fileDirectory = getPathByFileName(fileName);
		File f = fileDirectory.toFile();
		if (f.exists()) {
			f.delete();
			return true;
		}
		return false;
	}

	/**
	 * This method returns a Path
	 * 
	 * @param fileName
	 * @return
	 */
	private Path getPathByFileName(String fileName) {
		String absolutePath = Paths.get(UPLOAD_DIRECTORY).toFile().getAbsolutePath();
		StringBuilder strPathFile = new StringBuilder().append(absolutePath).append("//").append(fileName);
		return Paths.get(strPathFile.toString());
	}

	/**
	 * Method generates random Filename
	 * 
	 * @param file
	 * @return
	 */
	private String generateRandomFileName(MultipartFile file) {
		StringBuilder stringBuilder = new StringBuilder().append(String.valueOf(new Date().getTime()));
		if (file != null) {
			stringBuilder.append(".").append(file.getContentType().split("/")[1]).toString();
		}
		return stringBuilder.toString();
	}

}
