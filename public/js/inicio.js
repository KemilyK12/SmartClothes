
// Carrossel

const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicador");

const botaoAnterior = document.getElementById("anterior");
const botaoProximo = document.getElementById("proximo");

let slideAtual = 0;
let intervalo;

function mostrarSlide(numero) {
    slides.forEach(slide => slide.classList.remove("ativo"));
    indicadores.forEach(indicador => indicador.classList.remove("ativo"));

    slides[numero].classList.add("ativo");
    indicadores[numero].classList.add("ativo");

    slideAtual = numero;
}

function proximoSlide() {
    let proximo = slideAtual + 1;

    if (proximo >= slides.length) {
        proximo = 0;
    }

    mostrarSlide(proximo);
}

function anteriorSlide() {
    let anterior = slideAtual - 1;

    if (anterior < 0) {
        anterior = slides.length - 1;
    }

    mostrarSlide(anterior);
}

function iniciarIntervalo() {
    intervalo = setInterval(proximoSlide, 6000);
}

function reiniciarIntervalo() {
    clearInterval(intervalo);
    iniciarIntervalo();
}

botaoProximo.addEventListener("click", () => {
    proximoSlide();
    reiniciarIntervalo();
});

botaoAnterior.addEventListener("click", () => {
    anteriorSlide();
    reiniciarIntervalo();
});

indicadores.forEach((indicador, indice) => {
    indicador.addEventListener("click", () => {
        mostrarSlide(indice);
        reiniciarIntervalo();
    });
});

const carrossel = document.querySelector(".carrossel");

carrossel.addEventListener("mouseenter", () => {
    clearInterval(intervalo);
});

carrossel.addEventListener("mouseleave", () => {
    reiniciarIntervalo();
});

mostrarSlide(0);
iniciarIntervalo();


// Buscar produtos no banco de dados

async function carregarProdutos() {

    const listaProdutos = document.getElementById("lista-produtos");

    try {

        const resposta = await fetch("/produtos");

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar os produtos.");
        }

        const produtos = await resposta.json();

        listaProdutos.innerHTML = "";

        if (produtos.length === 0) {
            listaProdutos.innerHTML = "<p>Nenhum produto cadastrado.</p>";
            return;
        }

        produtos.forEach(produto => {

            // Escolher imagem do produto
            const categoria = (produto.categoria || "").toLowerCase();

            let imagem = "/images/polo.jpg";

            if (categoria.includes("camisa")) {
                imagem = "/images/camisa_social.jpg";
            } else if (categoria.includes("blazer")) {
                imagem = "/images/blazer.jpg";
            } else if (categoria.includes("polo")) {
                imagem = "/images/polo.jpg";
            }

            // Criar card do produto
            const card = document.createElement("div");
            card.classList.add("produto-card");

            // Imagem
            const img = document.createElement("img");
            img.src = imagem;
            img.alt = produto.nome;

            // Informações
            const informacoes = document.createElement("div");
            informacoes.classList.add("produto-info");

            // Nome
            const nome = document.createElement("h3");
            nome.textContent = produto.nome;

            // Descrição
            const descricao = document.createElement("p");
            descricao.textContent =
                produto.descricao || produto.categoria || "Peça da coleção";

            // Preço
            const preco = document.createElement("div");
            preco.classList.add("produto-preco");

            preco.textContent = Number(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            // Botão da sacola
            const botaoComprar = document.createElement("button");

            botaoComprar.textContent = "Adicionar à sacola";
            botaoComprar.classList.add("botao-sacola");
            botaoComprar.type = "button";

            botaoComprar.addEventListener("click", async () => {

                // Evitar cliques repetidos enquanto salva
                botaoComprar.disabled = true;

                try {

                    // Enviar produto para o MySQL
                    const resposta = await fetch("/itens-carrinho", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id_carrinho: 1,
                            id_produto: produto.id_produto,
                            quantidade: 1,
                            preco_unitario: Number(produto.preco)
                        })
                    });

                    if (!resposta.ok) {
                        throw new Error("Erro ao adicionar produto à sacola.");
                    }

                    alert(produto.nome + " adicionado à sacola!");

                } catch (erro) {

                    console.error("Erro ao adicionar produto:", erro);

                    alert("Não foi possível adicionar o produto à sacola.");

                } finally {

                    botaoComprar.disabled = false;

                }

            });

            // Montar informações
            informacoes.appendChild(nome);
            informacoes.appendChild(descricao);
            informacoes.appendChild(preco);
            informacoes.appendChild(botaoComprar);

            // Montar card
            card.appendChild(img);
            card.appendChild(informacoes);

            listaProdutos.appendChild(card);

        });

    } catch (erro) {

        console.error("Erro ao carregar produtos:", erro);

        listaProdutos.innerHTML =
            "<p>Não foi possível carregar os produtos. Tente novamente.</p>";

    }

}

// Carregar produtos
carregarProdutos();



// Mostrar perfil quando estiver logado
const clienteLogado = sessionStorage.getItem("cliente");
const linkPerfil = document.getElementById("link-perfil");

if (clienteLogado && linkPerfil) {
    linkPerfil.innerHTML = `
        <svg width="25" height="25" viewBox="0 0 24 24"
             fill="none" stroke="currentColor"
             stroke-width="1.7" stroke-linecap="round"
             stroke-linejoin="round">
            <circle cx="12" cy="8" r="4"></circle>
            <path d="M4 21v-2a8 8 0 0 1 16 0v2"></path>
        </svg>
    `;

    linkPerfil.href = "#";
    linkPerfil.title = "Sair da conta";

    linkPerfil.addEventListener("click", (evento) => {
        evento.preventDefault();

        if (confirm("Deseja sair da sua conta?")) {
            sessionStorage.removeItem("cliente");
            window.location.reload();
        }
    });
}
