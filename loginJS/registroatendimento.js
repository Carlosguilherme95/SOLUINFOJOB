document
  .querySelector("form.row.g-3") // Seleciona o formulário com a classe 'row g-3'
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtendo os valores dos campos do formulário
    const posto = document.getElementById("postoGasolina");
    const atendimento = document.getElementById("descricaoAtendimento");

    if (!posto || !atendimento) {
      console.error("Erro: Elementos do formulário não encontrados.");
      alert("Erro: Elementos do formulário não encontrados.");
      return;
    }

    const postoValue = posto.value;
    const atendimentoValue = atendimento.value;

    // Obtendo o userId do localStorage
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Erro: userId não encontrado no localStorage.");
      alert("Usuário não autenticado. Por favor, faça login.");
      return;
    }

    const userIdNumber = parseInt(userId);

    // Montando o objeto de dados do atendimento
    const atendimentoData = {
      posto: postoValue,
      atendimento: atendimentoValue,
      userId: userIdNumber,
    };

    // Verificando se os campos estão preenchidos corretamente
    if (!postoValue || !atendimentoValue) {
      console.error("Erro: Campos de atendimento ou posto não preenchidos.");
      alert("Preencha todos os campos antes de enviar.");
      return;
    }

    // Exibindo os dados do atendimento no console para verificação
    console.log("Enviando dados de atendimento:", atendimentoData);

    // Obtendo o token JWT do localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Erro: Token JWT não encontrado no localStorage.");
      alert("Token de autenticação não encontrado.");
      return;
    }

    // Fazendo a requisição POST para o backend
    axios
      .post("http://localhost:3000/SOLUINFO/atendimentos", atendimentoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Resposta do servidor:", response.data);
        alert("Atendimento registrado com sucesso!");
        document.querySelector("form.row.g-3").reset(); // Limpa o formulário após sucesso
      })
      .catch((error) => {
        console.error("Erro ao enviar atendimento:", error);

        if (error.response) {
          console.error("Erro de resposta do servidor:", error.response);
          alert(
            `Erro do servidor: ${
              error.response.data.error || error.response.statusText
            }`
          );
        } else if (error.request) {
          console.error(
            "Erro na requisição: Sem resposta do servidor.",
            error.request
          );
          alert("Erro de rede: O servidor não respondeu.");
        } else {
          console.error("Erro ao configurar a requisição:", error.message);
          alert("Erro ao configurar a requisição: " + error.message);
        }
      });
  });
