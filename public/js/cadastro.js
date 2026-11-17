
// Formulário de cadastro
const formularioCadastro = document.getElementById("form-cadastro");
const mensagemCadastro = document.getElementById("mensagem-cadastro");

formularioCadastro.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    // Pegar os dados do formulário
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    // Verificar as senhas
    if (senha !== confirmarSenha) {
        mensagemCadastro.textContent = "As senhas não coincidem.";
        mensagemCadastro.style.color = "red";
        return;
    }

    // Enviar cadastro para o backend
    try {
        mensagemCadastro.textContent = "Cadastrando...";
        mensagemCadastro.style.color = "#426987";

        const resposta = await fetch("/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                email,
                telefone,
                altura,
                peso,
                senha
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Erro ao cadastrar.");
        }

        // Cadastro realizado
        mensagemCadastro.textContent = "Conta criada com sucesso!";
        mensagemCadastro.style.color = "green";

        formularioCadastro.reset();

        // Ir para a página de login
        setTimeout(() => {
            window.location.href = "/pages/login.html";
        }, 1500);

    } catch (erro) {
        console.error("Erro no cadastro:", erro);

        mensagemCadastro.textContent = erro.message;
        mensagemCadastro.style.color = "red";
    }
});
