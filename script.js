document.getElementById("formCadastrar").addEventListener("submit", async function(event) {
  event.preventDefault(); // Evita recarregar a página

  const cpf = document.getElementById("cpf").value;
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const salario = document.getElementById("salario").value;

  const professor = {
      cpf,
      nome,
      telefone,
      salario: salario || null
  };

  try {
      const response = await fetch("http://localhost:3000/professor", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(professor)
      });

      const data = await response.json();

      if (response.ok) {
          document.getElementById("mensagem").textContent = "Professor cadastrado com sucesso!";
          alert('Professor cadastrado com sucesso!')
          window.location.href = "/TabProf"
      } else {
          document.getElementById("mensagem").textContent = "Erro: " + data.error;
      }
  } catch (error) {
      document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
  }
});
