package com.example.banco_imagens.controller;


// Importações necessárias
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.banco_imagens.model.Imagens;
import com.example.banco_imagens.service.ImagensService;

@RestController
@RequestMapping("/api/imagens")
public class ImagensController {

    @Autowired
    private ImagensService service;

    @GetMapping
    public List<Imagens> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Imagens> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                      .map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Alunos salvar(@RequestBody Imagens imagens) {
        return service.salvar(imagens);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Imagens> atualizar(@PathVariable Long id, @RequestBody Imagens imagens) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        alunos.setId(id);
        return ResponseEntity.ok(service.salvar(imagens));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}