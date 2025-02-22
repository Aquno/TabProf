document.addEventListener("DOMContentLoaded", function () {
    const formCadastrar = document.getElementById("formCadastrar");
    const formExcluir = document.getElementById("formExcluir");
    const listar = document.getElementById("tableCategorias");
  
    if (formCadastrar) {
      formCadastrar.addEventListener("submit", async function (event) {
        event.preventDefault();
        const nome_categoria = document.getElementById("nome").value;
  
        try {
          const response = await fetch("http://localhost:3000/api/categorias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome_categoria })
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert("Categoria cadastrada com sucesso!");
            window.location.href = "/TabCategorias";
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
  
        try {
          const response = await fetch(`http://localhost:3000/api/categorias/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert("Categoria excluída com sucesso!");
            window.location.href = "/TabCategorias";
          } else {
            document.getElementById("mensagem").textContent = "Erro: " + data.error;
          }
        } catch (error) {
          document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
        }
      });
    }
  
    async function listarCategorias() {
      const tabelaBody = document.querySelector("#tableCategorias tbody");
  
      try {
        const response = await fetch("http://localhost:3000/api/categorias");
  
        if (!response.ok) {
          throw new Error("Erro ao buscar as categorias.");
        }
  
        const categorias = await response.json();
        tabelaBody.innerHTML = "";
  
        if (categorias.length === 0) {
          tabelaBody.innerHTML = "<tr><td colspan='2' style='text-align: center;'>Nenhuma categoria encontrada.</td></tr>";
          return;
        }
  
        categorias.forEach((categoria) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${categoria.id}</td>
            <td>${categoria.nome_categoria}</td>
          `;
          tabelaBody.appendChild(row);
        });
      } catch (error) {
        tabelaBody.innerHTML = `<tr><td colspan='2' style='color: red; text-align: center;'>${error.message}</td></tr>`;
      }
    }
  
    if (listar) {
      listarCategorias();
    }
  });
  