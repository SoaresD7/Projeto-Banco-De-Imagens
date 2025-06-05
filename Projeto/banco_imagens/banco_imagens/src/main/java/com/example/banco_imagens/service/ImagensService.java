package com.example.banco_imagens.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.banco_imagens.model.Imagens;
import com.example.banco_imagens.repository.ImagensRepository;

@Service
public class ImagensService {

    @Autowired
    private ImagensRepository repository;

    public List<Imagens> listarTodos() {
        return repository.findAll();
    }

    public Optional<Imagens> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Alunos salvar(Imagens imagens) {
        return repository.save(imagens);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}