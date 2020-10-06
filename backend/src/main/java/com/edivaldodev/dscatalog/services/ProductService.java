package com.edivaldodev.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edivaldodev.dscatalog.dto.ProductDTO;
import com.edivaldodev.dscatalog.entities.Product;
import com.edivaldodev.dscatalog.repositories.ProductRepository;
import com.edivaldodev.dscatalog.services.exceptions.DatabaseException;
import com.edivaldodev.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findAll(){
		
		List<Product> list = repository.findAll();
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());		
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new EntityNotFoundException("Entity not found!"));
		
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		 Product entity = new Product();
		 //entity.setName(dto.getName());
		 entity = repository.save(entity);
		 
		 return new ProductDTO(entity);
		
	}

	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {
		
		try {
		Product entity = repository.getOne(id);
		//entity.setName(dto.getName());
		entity = repository.save(entity);
		
		return new ProductDTO(entity);
		}
		catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}	
	}

	public void delete(Long id) {
		try {
		repository.deleteById(id);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch(DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
	
}
