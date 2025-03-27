// Função para obter os dados de postos da API
function obterPostos() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Token não encontrado. Por favor, faça login.");
    return;
  }

  axios
    .get("http://localhost:3000/SOLUINFO/atendimentos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Dados recebidos da API:", response.data);

      exibirPostosComContagem(response.data);
    })
    .catch((error) => {
      console.error("Erro ao obter os postos:", error);
      alert("Erro ao carregar os dados de atendimentos.");
    });
}

function exibirPostosComContagem(postos) {
  const tableBody = document.getElementById("postosTableBody");
  tableBody.innerHTML = "";

  postos.forEach((postoObj) => {
    console.log("Posto objeto:", postoObj);

    const row = document.createElement("tr");

    const postoCell = document.createElement("td");
    const countCell = document.createElement("td");

    postoCell.textContent = postoObj.atendimento_posto;
    countCell.textContent = postoObj.count;

    row.appendChild(postoCell);
    row.appendChild(countCell);

    tableBody.appendChild(row);
  });
}

document
  .getElementById("carregarPostosBtn")
  .addEventListener("click", obterPostos);
