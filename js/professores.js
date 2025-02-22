document.addEventListener("DOMContentLoaded", function() {
  const formCadastrar = document.getElementById("formCadastrar");
  const formEditar = document.getElementById("formEditar");
  const formExcluir = document.getElementById("formExcluir");
  const formBuscar = document.getElementById("formBuscar");
  const listar = document.getElementById("tableProfessores")

  if (formCadastrar) {
    formCadastrar.addEventListener("submit", async function(event) {
      event.preventDefault(); // Evita recarregar a página

      const cpf = document.getElementById("cpf").value;
      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const salario = document.getElementById("salario").value;

      const professor = { cpf, nome, telefone, salario: salario || null };

      try {
        const response = await fetch("http://localhost:3000/api/professores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(professor)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Professor cadastrado com sucesso!');
          window.location.href = "/TabProf";
        } else {
          document.getElementById("mensagem").textContent = "Erro: " + data.error;
        }
      } catch (error) {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
      }
    });
  }

  if (formEditar) {
    formEditar.addEventListener("submit", async function(event) {
      event.preventDefault(); // Evita recarregar a página

      const id = document.getElementById("id").value;

      const cpf = document.getElementById("cpf").value;
      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const salario = document.getElementById("salario").value;

      const professor = { cpf, nome, telefone: telefone || null, salario: salario || null };

      try {
        const response = await fetch(`http://localhost:3000/api/professores/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(professor)
        });

        const data = await response.json();

        if (response.ok) {
          alert('Cadastro atualizado com sucesso!');
          window.location.href = "/TabProf";
        } else {
          document.getElementById("mensagem").textContent = "Erro: " + data.error;
        }
      } catch (error) {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
      }
    });
  }

  if (formExcluir) {
    formExcluir.addEventListener("submit", async function(event) {
      event.preventDefault(); // Evita recarregar a página

      const id = document.getElementById("id").value;

      if (!id) {
        alert("Por favor, insira um ID válido!");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/professores/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (response.ok) {
          alert('Professor deletado com sucesso!');
          window.location.href = "/TabProf";
        } else {
          document.getElementById("mensagem").textContent = "Erro: " + data.error;
        }
      } catch (error) {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
      }
    });
  }

  if (formBuscar) {
    formBuscar.addEventListener("submit", async function(event) {
      event.preventDefault(); // Evita recarregar a página

      const id = document.getElementById("buscar").value;
      const resultadoBusca = document.getElementById("resultadoBusca");

      resultadoBusca.innerHTML = "";

      if (!id) {
        alert("Por favor, insira um ID válido!");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/professores/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        console.log(data)

        if (data && data.error) {
          resultadoBusca.innerHTML = `
           <p style="text-align: center">ID inválido</p>
          `
        }

        if(data && !data.error) {
          resultadoBusca.innerHTML = `
            <div style="text-align: center">
              <h2>Resultado da Busca:</h2>
              <p><strong>ID:</strong> ${data.id}</p>
              <p><strong>Nome:</strong> ${data.nome}</p>
              <p><strong>CPF:</strong> ${data.cpf}</p>
              <p><strong>Telefone:</strong> ${data.telefone}</p>
              <p><strong>Salário:</strong> R$ ${data.salario || "Não informado"}</p>
            </div
          `;
        }

      } catch (error) {
        document.getElementById("mensagem").textContent = "Erro ao conectar com o servidor!";
      }
    });
  }

  async function listarProfessores() {
    const tabelaBody = document.querySelector("#tableProfessores tbody");

    try {
      const response = await fetch("http://localhost:3000/api/professores"); // Ajuste para o endpoint correto da sua API

      if (!response.ok) {
        throw new Error("Erro ao buscar os professores.");
      }

      const professores = await response.json();

      // Limpa a tabela antes de adicionar os novos dados
      tabelaBody.innerHTML = "";

      if (professores.length === 0) {
        tabelaBody.innerHTML = "<tr><td colspan='4' style='text-align: center;'>Nenhum professor encontrado.</td></tr>";
        return;
      }

      professores.forEach((professor) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${professor.cpf}</td>
          <td>${professor.nome}</td>
          <td>${professor.telefone}</td>
          <td>R$ ${professor.salario ? professor.salario : "Não informado"}</td>
        `;
        tabelaBody.appendChild(row);
      });
    } catch (error) {
      tabelaBody.innerHTML = `<tr><td colspan='4' style='color: red; text-align: center;'>${error.message}</td></tr>`;
    }
  }

  if (listar) {
    listarProfessores();
  }

});
