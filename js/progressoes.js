document.addEventListener("DOMContentLoaded", function() {
    const formCadastrar = document.getElementById("formCadastrar");
    const listar = document.getElementById("tableProgressoes");
  
    // Função para cadastrar um atleta
    if (formCadastrar) {
      formCadastrar.addEventListener("submit", async function(event) {
        event.preventDefault();
  
        const id_atleta = document.getElementById("id_atleta").value;
        const data_graduacao = document.getElementById("data_graduacao").value;
        const nova_faixa = document.getElementById("nova_faixa").value;
        const observacao = document.getElementById("observacao").value;
  
        const progressao = { id_atleta, data_graduacao, nova_faixa, observacao };
  
        try {
          const response = await fetch("http://localhost:3000/api/progressoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(progressao)
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('Progressão cadastrada com sucesso!');
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
    async function listarProgressoes() {
      const tabelaBody = document.querySelector("#tableProgressoes tbody");
  
      try {
        const response = await fetch("http://localhost:3000/api/progressoes");
  
        if (!response.ok) {
          throw new Error("Erro ao buscar as progressões.");
        }
  
        const progressoes = await response.json();
  
        tabelaBody.innerHTML = "";
  
        if (progressoes.length === 0) {
          tabelaBody.innerHTML = "<tr><td colspan='7' style='text-align: center;'>Nenhuma progressão encontrada.</td></tr>";
          return;
        }
  
        progressoes.forEach((progressao) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${progressao.id_atleta}</td>
            <td>${progressao.data_graduacao}</td>
            <td>${progressao.nova_faixa}</td>
            <td>${progressao.observacao}</td>
          `;
          tabelaBody.appendChild(row);
        });
      } catch (error) {
        tabelaBody.innerHTML = `<tr><td colspan='7' style='color: red; text-align: center;'>${error.message}</td></tr>`;
      }
    }
  
    if (listar) {
      listarProgressoes();
    }
  
  });
  