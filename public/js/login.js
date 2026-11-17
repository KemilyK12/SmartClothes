
// Formulário de login
const formularioLogin = document.getElementById("form-login");
const mensagemLogin = document.getElementById("mensagem-login");

formularioLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    // Pegar os dados digitados
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    try {
        mensagemLogin.textContent = "Entrando...";
        mensagemLogin.style.color = "#426987";

        // Enviar dados para a API
        const resposta = await fetch("/clientes/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(resultado.erro || "Erro ao entrar.");
        }

        // Guardar dados básicos para mostrar no site
        sessionStorage.setItem("cliente", JSON.stringify(resultado.cliente));

        mensagemLogin.textContent = "Login realizado com sucesso!";
        mensagemLogin.style.color = "green";

        // Voltar para a página inicial
        window.location.href = "/";

    } catch (erro) {
        console.error("Erro no login:", erro);

        mensagemLogin.textContent = erro.message;
        mensagemLogin.style.color = "red";
    }
});
