package com.isac.bazar_solidario.controller;

import com.isac.bazar_solidario.dto.UsuarioRequestDTO;
import com.isac.bazar_solidario.dto.UsuarioResponseDTO;
import com.isac.bazar_solidario.model.Usuario;
import com.isac.bazar_solidario.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public UsuarioResponseDTO criarUsuario(
            @RequestBody @Valid UsuarioRequestDTO dados) {

        Usuario usuario = new Usuario();

        usuario.setNome(dados.nome());
        usuario.setEmail(dados.email());
        usuario.setSenha(dados.senha());

        Usuario usuarioCriado = usuarioService.criarUsuario(usuario);
        
        return new UsuarioResponseDTO(usuarioCriado);
    }
}