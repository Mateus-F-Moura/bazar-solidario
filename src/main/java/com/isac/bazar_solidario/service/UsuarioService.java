package com.isac.bazar_solidario.service;

import com.isac.bazar_solidario.model.Role;
import com.isac.bazar_solidario.model.Usuario;
import com.isac.bazar_solidario.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario criarUsuario(Usuario usuario) {
        usuario.setRole(Role.CLIENTE);

        return usuarioRepository.save(usuario);
    }

}
