export interface CadastroUsuario {
  nome: string;
  email: string;
  senha: string;
}

export interface UsuarioCriado {
  id: number;
  nome: string;
  email: string;
  role: "CLIENTE" | "ADMIN";
}

/** Contrato disponível no UsuarioController. Não devolve a senha ao restante da UI. */
export function criarClienteUsuarios(
  baseUrl: string,
  fetcher: typeof fetch = fetch,
) {
  return async (dados: CadastroUsuario): Promise<UsuarioCriado> => {
    let resposta: Response;
    try {
      resposta = await fetcher(`${baseUrl.replace(/\/$/, "")}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: dados.nome.trim(),
          email: dados.email.trim(),
          senha: dados.senha,
        }),
      });
    } catch {
      throw new Error(
        "Não foi possível conectar ao servidor. Confira sua conexão e tente novamente.",
      );
    }
    if (!resposta.ok) {
      if (
        resposta.status === 502 ||
        resposta.status === 503 ||
        resposta.status === 504
      )
        throw new Error(
          "O servidor está indisponível no momento. Tente novamente mais tarde.",
        );
      if (resposta.status === 409)
        throw new Error("Este e-mail já está cadastrado. Use outro e-mail.");
      if (resposta.status === 400 || resposta.status === 422)
        throw new Error("Confira os dados informados e tente novamente.");
      throw new Error(
        "O servidor não conseguiu concluir seu cadastro. Tente novamente mais tarde.",
      );
    }
    let usuario: Partial<UsuarioCriado>;
    try {
      usuario = await resposta.json();
    } catch {
      throw new Error("O servidor retornou uma resposta inesperada.");
    }
    if (
      typeof usuario?.id !== "number" ||
      typeof usuario.nome !== "string" ||
      typeof usuario.email !== "string" ||
      usuario.role !== "CLIENTE"
    ) {
      throw new Error("O servidor retornou uma resposta inesperada.");
    }
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    };
  };
}
