document.addEventListener("DOMContentLoaded", function () {
    const formCadastrar = document.getElementById("formCadastrar");
    const formExcluir = document.getElementById("formExcluir");
    const listar = document.getElementById("tableFaixas");
  
    if (formCadastrar) {
      formCadastrar.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        const nome_faixa = document.getElementById("nome").value;
  
        try {
          const response = await fetch("http://localhost:3000/api/faixas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_faixa })
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert("Faixa cadastrada com sucesso!");
            window.location.href = "/html/index.html"; 
          } else {
            document.getElementById("mensagem").textContent = "Erro: " + data.error;
          }
        } catch (error) {
          document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
        }
      });
    }

    if (formExcluir) {
      formExcluir.addEventListener("submit", async function (event) {
        event.preventDefault();
  
        const id = document.getElementById("id").value;
  
        if (!id) {
          alert("Por favor, insira um ID válido!");
          return;
        }
  
        try {
          const response = await fetch(`http://localhost:3000/api/faixas/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert("Faixa excluída com sucesso!");
            window.location.href = "/html/index.html"; 
          } else {
            document.getElementById("mensagem").textContent = "Erro: " + data.error;
          }
        } catch (error) {
          document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
        }
      });
    }
  
    async function listarFaixas() {
      const tabelaBody = document.querySelector("#tableFaixas tbody");
  
      try {
        const response = await fetch("http://localhost:3000/api/faixas");
  
        if (!response.ok) {
          throw new Error("Erro ao buscar as faixas.");
        }
  
        const faixas = await response.json();
        tabelaBody.innerHTML = "";
  
        if (faixas.length === 0) {
          tabelaBody.innerHTML = "<tr><td colspan='2' style='text-align: center;'>Nenhuma faixa encontrada.</td></tr>";
          return;
        }
  
        faixas.forEach((faixa) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${faixa.id}</td>
            <td>${faixa.nome_faixa}</td>
          `;
          tabelaBody.appendChild(row);
        });
      } catch (error) {
        tabelaBody.innerHTML = `<tr><td colspan='2' style='color: red; text-align: center;'>${error.message}</td></tr>`;
      }
    }
  
    if (listar) {
      listarFaixas();
    }
  });
  