// Função para enviar o login e senha via POST
const loginAndPass = async () => {
  // Pegando os valores do login e da senha do formulário
  const login = document.getElementById("login").value;
  const pass = document.getElementById("inputPassword5").value;

  // Função que realiza o login
  const loginUser = async (login, pass) => {
    try {
      // Enviando o login e a senha ao backend
      const response = await axios.post(
        "http://localhost:3000/SOLUINFO/login", // URL do backend
        {
          user: login, // Enviando o login
          password: pass, // Enviando a senha
        }
      );

      // Verificando se o login foi bem-sucedido
      if (response.status === 200) {
        console.log("Login bem-sucedido!");
        localStorage.setItem("userId", response.data.userId);
        window.location.href = "home.html";
      } else {
        console.error("Falha no login:", response.data.message);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
    }
  };

  // Chamando a função para realizar o login
  loginUser(login, pass);
};
