document.addEventListener("DOMContentLoaded", function() {
    const formCadastrar = document.getElementById("formCadastrar");
    const listar = document.getElementById("tableParticipacoes");
  
    // Função para cadastrar um atleta
    if (formCadastrar) {
      formCadastrar.addEventListener("submit", async function(event) {
        event.preventDefault();
  
        const id_atleta = document.getElementById("id_atleta").value;
        const id_categoria = document.getElementById("id_categoria").value;
        const id_competicao = document.getElementById("id_competicao").value;
        const resultado = document.getElementById("resultado").value;
        const matricula = document.getElementById("matricula").value;
  
        const participacao = { id_atleta, id_categoria, id_competicao, resultado, matricula };
  
        try {
          const response = await fetch("http://localhost:3000/api/participacoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(participacao)
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('Participação cadastrada com sucesso!');
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
    async function listarParticipacoes() {
      const tabelaBody = document.querySelector("#tableParticipacoes tbody");
  
      try {
        const response = await fetch("http://localhost:3000/api/participacoes");
  
        if (!response.ok) {
          throw new Error("Erro ao buscar as participações.");
        }
  
        const participacoes = await response.json();
  
        tabelaBody.innerHTML = "";
  
        if (participacoes.length === 0) {
          tabelaBody.innerHTML = "<tr><td colspan='7' style='text-align: center;'>Nenhuma participação encontrada.</td></tr>";
          return;
        }
  
        participacoes.forEach((participacao) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${participacao.id_atleta}</td>
            <td>${participacao.id_categoria}</td>
            <td>${participacao.id_competicao}</td>
            <td>${participacao.resultado}</td>
            <td>${participacao.matricula}</td>
          `;
          tabelaBody.appendChild(row);
        });
      } catch (error) {
        tabelaBody.innerHTML = `<tr><td colspan='7' style='color: red; text-align: center;'>${error.message}</td></tr>`;
      }
    }
  
    if (listar) {
      listarParticipacoes();
    }
  
  });
  