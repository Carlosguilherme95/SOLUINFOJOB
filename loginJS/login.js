// Função para enviar o login e senha via POST
const loginAndPass = async () => {
  // Pegando os valores do login e da senha do formulário
  const login = document.getElementById("login").value;
  const pass = document.getElementById("inputPassword5").value;

  try {
    console.log("Enviando login e senha para o backend...");

    // Enviando o login e a senha ao backend
    const response = await axios.post("http://localhost:3000/SOLUINFO/login", {
      user: login, // Enviando o login
      password: pass, // Enviando a senha
    });

    console.log("Resposta do backend:", response.data); // Exibindo todos os dados recebidos

    // Verificando se o login foi bem-sucedido
    if (response.status === 200 && response.data.token) {
      console.log("Login bem-sucedido!");

      // Armazenando o userId e o token no localStorage
      localStorage.setItem("userId", response.data.userId.toString());
      localStorage.setItem("token", response.data.token);

      // Verificando se os dados foram armazenados corretamente
      console.log(
        "userId armazenado no localStorage:",
        localStorage.getItem("userId")
      );
      console.log(
        "token armazenado no localStorage:",
        localStorage.getItem("token")
      );

      // Redirecionando para a página inicial
      setTimeout(() => {
        console.log("Redirecionando para home.html após 500ms");
        console.log("Redirecionando..."); // Verifique se este log aparece
        window.location.replace("home.html");
      }, 500);
    } else {
      console.error("Falha no login:", response.data.message);
      alert("Falha no login: " + response.data.message);
    }
  } catch (error) {
    console.error("Erro ao tentar fazer login:", error);
    alert(
      "Erro ao tentar fazer login. Verifique o console para mais detalhes."
    );
  }
};

// Garantir que o código seja executado quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("loginBtn");
  if (loginButton) {
    loginButton.addEventListener("click", loginAndPass);
  } else {
    console.error("Botão de login não encontrado!");
  }
});
