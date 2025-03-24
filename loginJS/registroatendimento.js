document
  .querySelector("form.row.g-3") // Seleciona o formulário com a classe 'row g-3'
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtendo os valores dos campos do formulário
    const posto = document.getElementById("postoGasolina").value;
    const atendimento = document.getElementById("descricaoAtendimento").value;

    // Obtendo o userId do localStorage
    const userId = localStorage.getItem("userId");

    // Verifica se o userId existe, se não, exibe uma mensagem de erro
    if (!userId) {
      console.error("Erro: userId não encontrado no localStorage.");
      alert("Usuário não autenticado. Por favor, faça login.");
      return;
    }

    // Montando o objeto de dados do atendimento
    const atendimentoData = {
      posto,
      atendimento,
      userId,
    };

    // Verificando se os campos estão preenchidos corretamente
    if (!posto || !atendimento) {
      console.error("Erro: Campos de atendimento ou posto não preenchidos.");
      alert("Preencha todos os campos antes de enviar.");
      return;
    }

    // Exibindo os dados do atendimento no console para verificação
    console.log("Enviando dados de atendimento:", atendimentoData);

    // Obtendo o token JWT do localStorage
    const token = localStorage.getItem("token");

    // Verifica se o token existe, caso contrário, exibe mensagem de erro
    if (!token) {
      console.error("Erro: Token JWT não encontrado no localStorage.");
      alert("Token de autenticação não encontrado.");
      return;
    }

    // Fazendo a requisição POST para o backend
    axios
      .post("http://localhost:3000/atendimentos", atendimentoData, {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token JWT no cabeçalho Authorization
        },
      })
      .then((response) => {
        // Se a requisição for bem-sucedida
        console.log("Resposta do servidor:", response.data);
        alert("Atendimento registrado com sucesso!");
      })
      .catch((error) => {
        // Log detalhado para capturar o erro completo
        console.error("Erro ao enviar atendimento:", error);

        // Exibe a resposta de erro do servidor
        if (error.response) {
          // O servidor respondeu com um erro
          console.error("Erro de resposta do servidor:", error.response);
          alert(
            `Erro do servidor: ${
              error.response.data.error || error.response.statusText
            }`
          );
        } else if (error.request) {
          // A requisição foi feita, mas o servidor não respondeu
          console.error(
            "Erro na requisição: Sem resposta do servidor.",
            error.request
          );
          alert("Erro de rede: O servidor não respondeu.");
        } else {
          // Algo aconteceu ao configurar a requisição
          console.error("Erro ao configurar a requisição:", error.message);
          alert("Erro ao configurar a requisição: " + error.message);
        }
      });
  });
