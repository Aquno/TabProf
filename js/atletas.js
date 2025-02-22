document.addEventListener("DOMContentLoaded", function() {
  const formCadastrar = document.getElementById("formCadastrar");
  const formEditar = document.getElementById("formEditar");
  const formExcluir = document.getElementById("formExcluir");
  const formBuscar = document.getElementById("formBuscar");
  const listar = document.getElementById("tableAtletas");

  // Função para cadastrar um atleta
  if (formCadastrar) {
    formCadastrar.addEventListener("submit", async function(event) {
      event.preventDefault();

      const cpf = document.getElementById("cpf").value;
      const nome = document.getElementById("nome").value;
      const data_nascimento = document.getElementById("data_nascimento").value;
      const rua = document.getElementById("rua").value;
      const numero = document.getElementById("numero").value;
      const bairro = document.getElementById("bairro").value;
      const cidade = document.getElementById("cidade").value;
      const telefone = document.getElementById("telefone").value;
      const peso = document.getElementById("peso").value;
      const id_categoria = document.getElementById("id_categoria").value;
      const id_faixa = document.getElementById("id_faixa").value;
      const id_professor = document.getElementById("id_professor").value;

      const atleta = { cpf, nome, data_nascimento, rua, numero, bairro, cidade, telefone, peso, id_categoria, id_faixa, id_professor };

      try {
        const response = await fetch("http://localhost:3000/api/atletas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(atleta)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Atleta cadastrado com sucesso!');
          window.location.href = "/TabAtletas"; // Redireciona após o cadastro
        } else {
          document.getElementById("mensagem").textContent = "Erro: " + data.error;
        }
      } catch (error) {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
      }
    });
  }

  // Função para editar um atleta
  if (formEditar) {
    formEditar.addEventListener("submit", async function(event) {
      event.preventDefault();

      const id = document.getElementById("id").value;
      const cpf = document.getElementById("cpf").value;
      const nome = document.getElementById("nome").value;
      const data_nascimento = document.getElementById("data_nascimento").value;
      const rua = document.getElementById("rua").value;
      const numero = document.getElementById("numero").value;
      const bairro = document.getElementById("bairro").value;
      const cidade = document.getElementById("cidade").value;
      const telefone = document.getElementById("telefone").value;
      const peso = document.getElementById("peso").value;
      const id_categoria = document.getElementById("id_categoria").value;
      const id_faixa = document.getElementById("id_faixa").value;
      const id_professor = document.getElementById("id_professor").value;

      const atleta = { cpf, nome, data_nascimento, rua, numero, bairro, cidade, telefone, peso, id_categoria, id_faixa, id_professor };

      try {
        const response = await fetch(`http://localhost:3000/api/atletas/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(atleta)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Atleta atualizado com sucesso!');
          window.location.href = "/TabAtletas"; // Redireciona após a atualização
        } else {
          document.getElementById("mensagem").textContent = "Erro: " + data.error;
        }
      } catch (error) {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
      }
    });
  }

  // Função para excluir um atleta
  if (formExcluir) {
    formExcluir.addEventListener("submit", async function(event) {
      event.preventDefault();

      const id = document.getElementById("id").value;

      if (!id) {
        alert("Por favor, insira um ID válido!");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/atletas/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (response.ok) {
          alert('Atleta excluído com sucesso!');
          window.location.href = "/TabAtletas"; // Redireciona após exclusão
        } else {
          document.getElementById("mensagem").textContent = "Erro: " + data.error;
        }
      } catch (error) {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
      }
    });
  }

  // Função para buscar um atleta
  if (formBuscar) {
    formBuscar.addEventListener("submit", async function(event) {
      event.preventDefault();

      const id = document.getElementById("buscar").value;
      const resultadoBusca = document.getElementById("resultadoBusca");

      resultadoBusca.innerHTML = "";

      if (!id) {
        alert("Por favor, insira um ID válido!");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/atletas/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (data && data.error) {
          resultadoBusca.innerHTML = `<p style="text-align: center">ID inválido</p>`;
        }

        if (data && !data.error) {
          resultadoBusca.innerHTML = `
            <div style="text-align: center">
              <h2>Resultado da Busca:</h2>
              <p><strong>ID:</strong> ${data.id}</p>
              <p><strong>Nome:</strong> ${data.nome}</p>
              <p><strong>CPF:</strong> ${data.cpf}</p>
              <p><strong>Telefone:</strong> ${data.telefone}</p>
              <p><strong>Peso:</strong> ${data.peso || "Não informado"}</p>
              <p><strong>Categoria:</strong> ${data.id_categoria}</p>
              <p><strong>Faixa:</strong> ${data.id_faixa}</p>
              <p><strong>Professor:</strong> ${data.id_professor}</p>
            </div>
          `;
        }
      } catch (error) {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
      }
    });
  }

  // Função para listar os atletas
  async function listarAtletas() {
    const tabelaBody = document.querySelector("#tableAtletas tbody");

    try {
      const response = await fetch("http://localhost:3000/api/atletas");

      if (!response.ok) {
        throw new Error("Erro ao buscar os atletas.");
      }

      const atletas = await response.json();

      tabelaBody.innerHTML = "";

      if (atletas.length === 0) {
        tabelaBody.innerHTML = "<tr><td colspan='7' style='text-align: center;'>Nenhum atleta encontrado.</td></tr>";
        return;
      }

      atletas.forEach((atleta) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${atleta.cpf}</td>
          <td>${atleta.nome}</td>
          <td>${atleta.cidade}</td>
          <td>${atleta.peso || "Não informado"}</td>
          <td>${atleta.telefone}</td>
          <td>${atleta.id_faixa}</td>
        `;
        tabelaBody.appendChild(row);
      });
    } catch (error) {
      tabelaBody.innerHTML = `<tr><td colspan='7' style='color: red; text-align: center;'>${error.message}</td></tr>`;
    }
  }

  if (listar) {
    listarAtletas();
  }

});
