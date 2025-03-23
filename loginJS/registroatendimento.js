document
  .querySelector("form.row.g-3") // Seleciona o formulário com a classe 'row g-3'
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const posto = document.getElementById("postoGasolina").value;
    const atendimento = document.getElementById("descricaoAtendimento").value;
    const userId = localStorage.getItem("userId");

    const atendimentoData = {
      posto,
      atendimento,
      userId,
    };
    console.log(userId);
    axios
      .post("http://localhost:3000/SOLUINFO/atendimentos", atendimentoData)
      .then((response) => {
        console.log(response.data);
        alert("atendimento registrado com sucesso");
      })
      .catch((error) => {
        console.error("erro ao enviar atendimento");
        alert("não foi possível registrar o atendimento");
      });
  });
