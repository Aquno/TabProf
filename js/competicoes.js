document.addEventListener("DOMContentLoaded", function() {
    const formCadastrar = document.getElementById("formCadastrar");
    const listar = document.getElementById("tableCompeticoes");
  
    // Função para cadastrar um atleta
    if (formCadastrar) {
      formCadastrar.addEventListener("submit", async function(event) {
        event.preventDefault();
  
        const nome = document.getElementById("nome").value;
        const data = document.getElementById("data").value;
  
        const competicao = { nome, data };
  
        try {
          const response = await fetch("http://localhost:3000/api/competicoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(competicao)
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('Competição cadastrada com sucesso!');
            window.location.href = "/html/index.html"; // Redireciona após o cadastro
          } else {
            document.getElementById("mensagem").textContent = "Erro: " + data.error;
          }
        } catch (error) {
          document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
        }
      });
    }  
  
    // Função para listar os atletas
    async function listarCompeticoes() {
      const tabelaBody = document.querySelector("#tableCompeticoes tbody");
  
      try {
        const response = await fetch("http://localhost:3000/api/competicoes");
  
        if (!response.ok) {
          throw new Error("Erro ao buscar as competições.");
        }
  
        const competicoes = await response.json();

        console.log(competicoes)
  
        tabelaBody.innerHTML = "";
  
        if (competicoes.length === 0) {
          tabelaBody.innerHTML = "<tr><td colspan='7' style='text-align: center;'>Nenhuma competição encontrada.</td></tr>";
          return;
        }
  
        competicoes.forEach((competicao) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${competicao.nome}</td>
            <td>${competicao.data}</td>
          `;
          tabelaBody.appendChild(row);
        });
      } catch (error) {
        tabelaBody.innerHTML = `<tr><td colspan='7' style='color: red; text-align: center;'>${error.message}</td></tr>`;
      }
    }
  
    if (listar) {
      listarCompeticoes();
    }
  
  });
  