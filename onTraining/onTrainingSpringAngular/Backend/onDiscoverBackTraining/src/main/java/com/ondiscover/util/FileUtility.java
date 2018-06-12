package com.ondiscover.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

public class FileUtility {
	/** Variable stores the path directory where files will be saved */
	public static String UPLOAD_DIRECTORY = "src//main//resources//static//upload";

	/**
	 * Method returns the current date string
	 * 
	 * @return
	 */
	public static String getStringCurrentDate() {
		return String.valueOf(new Date().getTime());
	}

	/**
	 * Method generates randome Filename
	 * 
	 * @param file
	 * @return
	 */
	public static String generateRandomFileName(MultipartFile file) {
		StringBuilder stringBuilder = new StringBuilder().append(getStringCurrentDate());
		if (file != null) {
			stringBuilder.append(".").append(file.getContentType().split("/")[1]).toString();
		}
		return stringBuilder.toString();
	}

	/**
	 * Method writes file on upload directory
	 * 
	 * @param fileName
	 * @param file
	 * @throws IOException
	 */
	public static void writeFile(String fileName, MultipartFile file) throws IOException {
		if (file == null)
			throw new IOException("file is null");
		Path fileDirectory = getPathFileName(fileName);
		Files.write(fileDirectory, file.getBytes());
	}

	/**
	 * Method deletes file on upload directory
	 * 
	 * @param fileName
	 * @throws IOException
	 */
	public static void deleteFile(String fileName) throws IOException {
		Path fileDirectory = getPathFileName(fileName);
		File f = fileDirectory.toFile();
		if (f.exists())
			f.delete();
	}

	/**
	 * Method returns the path of a filename
	 * 
	 * @param fileName
	 * @return
	 */
	public static Path getPathFileName(String fileName) {
		Path resourcesDirectory = Paths.get(UPLOAD_DIRECTORY);
		String absolutePath = resourcesDirectory.toFile().getAbsolutePath();
		StringBuilder strPathFile = new StringBuilder().append(absolutePath).append("//").append(fileName);
		return Paths.get(strPathFile.toString());
	}

}
