package com.ondiscover.models.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface IFileSystemService {
	/**
	 * This method loads a resource from file system
	 * 
	 * @param fileName
	 * @return
	 */
	public byte[] load(String fileName) throws IOException;

	/**
	 * This method copies a file
	 * 
	 * @param file
	 * @return
	 */
	public String copy(MultipartFile file) throws IOException;

	/**
	 * This method delete a filename
	 * 
	 * @param fileName
	 * @return
	 */
	public boolean delete(String fileName);

}
