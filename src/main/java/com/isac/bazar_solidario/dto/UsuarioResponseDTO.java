package com.isac.bazar_solidario.dto;

import com.isac.bazar_solidario.model.Role;
import com.isac.bazar_solidario.model.Usuario;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email,
        Role role
) {

    public UsuarioResponseDTO(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getRole()
        );
    }
}