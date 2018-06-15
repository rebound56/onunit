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
	public String copy(String prefix, MultipartFile file) throws IOException;
	
	/**
	 * This method deletes all directory
	 */
	public void deleteAll();
	
	
	/**
	 * This method initializes the upload folder
	 * @throws IOException
	 */
	public void init() throws IOException;
	
	
	

	/**
	 * This method delete a filename
	 * 
	 * @param fileName
	 * @return
	 */
	public boolean delete(String fileName);

}
