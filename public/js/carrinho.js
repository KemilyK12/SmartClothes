
// Sacola da Kemilly (cliente de teste)
const idCarrinho = 1;

// Formatar valores em reais
function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Escolher imagem do produto
function escolherImagem(produto) {
    const categoria = (produto.categoria || "").toLowerCase();

    if (categoria.includes("blazer")) {
        return "/images/blazer.jpg";
    }

    if (categoria.includes("camisa")) {
        return "/images/camisa_social.jpg";
    }

    return "/images/polo.jpg";
}

// Remover produto da sacola
async function removerProduto(idItem) {
    const confirmar = confirm("Deseja remover este produto da sacola?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch("/itens-carrinho/" + idItem, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao remover produto.");
        }

        await carregarCarrinho();

    } catch (erro) {
        console.error("Erro ao remover produto:", erro);
        alert("Não foi possível remover o produto.");
    }
}

// Atualizar quantidade no MySQL
async function atualizarQuantidade(item, novaQuantidade) {
    if (novaQuantidade < 1) {
        return;
    }

    try {
        const resposta = await fetch(
            "/itens-carrinho/" + item.id_item_carrinho,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantidade: novaQuantidade,
                    preco_unitario: Number(item.preco_unitario)
                })
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar quantidade.");
        }

        await carregarCarrinho();

    } catch (erro) {
        console.error("Erro ao atualizar quantidade:", erro);
        alert("Não foi possível atualizar a quantidade.");
    }
}

// Buscar produtos da sacola
async function carregarCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");

    try {
        const resposta = await fetch("/itens-carrinho");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar itens da sacola.");
        }

        const todosItens = await resposta.json();

        const itens = todosItens.filter(item =>
            Number(item.id_carrinho) === idCarrinho
        );

        listaCarrinho.innerHTML = "";

        if (itens.length === 0) {
            listaCarrinho.innerHTML = "<p>Sua sacola está vazia.</p>";
            totalCarrinho.textContent = formatarPreco(0);
            return;
        }

        let total = 0;

        for (const item of itens) {
            const respostaProduto = await fetch(
                "/produtos/" + item.id_produto
            );

            if (!respostaProduto.ok) {
                throw new Error("Erro ao buscar produto.");
            }

            const produto = await respostaProduto.json();

            const subtotal =
                Number(item.preco_unitario) * Number(item.quantidade);

            total += subtotal;

            // Card da sacola
            const card = document.createElement("div");
            card.classList.add("produto-card", "item-sacola");

            // Imagem à esquerda
            const imagem = document.createElement("img");
            imagem.src = escolherImagem(produto);
            imagem.alt = produto.nome;
            imagem.classList.add("imagem-sacola");

            // Informações à direita
            const informacoes = document.createElement("div");
            informacoes.classList.add("produto-info");

            const nome = document.createElement("h3");
            nome.textContent = produto.nome;

            const preco = document.createElement("p");
            preco.textContent =
                "Preço: " + formatarPreco(item.preco_unitario);

            const quantidadeTexto = document.createElement("p");
            quantidadeTexto.textContent = "Quantidade:";

            // Controle de quantidade
            const controleQuantidade = document.createElement("div");
            controleQuantidade.classList.add("controle-quantidade");

            const botaoMenos = document.createElement("button");
            botaoMenos.textContent = "−";
            botaoMenos.type = "button";
            botaoMenos.classList.add("botao-sacola");

            botaoMenos.disabled = Number(item.quantidade) <= 1;

            const numeroQuantidade = document.createElement("span");
            numeroQuantidade.textContent = item.quantidade;

            const botaoMais = document.createElement("button");
            botaoMais.textContent = "+";
            botaoMais.type = "button";
            botaoMais.classList.add("botao-sacola");

            // Aumentar quantidade
            botaoMais.addEventListener("click", async () => {
                botaoMais.disabled = true;
                botaoMenos.disabled = true;

                await atualizarQuantidade(
                    item,
                    Number(item.quantidade) + 1
                );
            });

            // Diminuir quantidade
            botaoMenos.addEventListener("click", async () => {
                botaoMais.disabled = true;
                botaoMenos.disabled = true;

                await atualizarQuantidade(
                    item,
                    Number(item.quantidade) - 1
                );
            });

            controleQuantidade.appendChild(botaoMenos);
            controleQuantidade.appendChild(numeroQuantidade);
            controleQuantidade.appendChild(botaoMais);

            // Subtotal
            const valorSubtotal = document.createElement("p");
            valorSubtotal.textContent =
                "Subtotal: " + formatarPreco(subtotal);

            // Botão remover
            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover da sacola";
            botaoRemover.classList.add("botao-sacola");
            botaoRemover.type = "button";

            botaoRemover.addEventListener("click", async () => {
                botaoRemover.disabled = true;
                await removerProduto(item.id_item_carrinho);
            });

            // Montar informações
            informacoes.appendChild(nome);
            informacoes.appendChild(preco);
            informacoes.appendChild(quantidadeTexto);
            informacoes.appendChild(controleQuantidade);
            informacoes.appendChild(valorSubtotal);
            informacoes.appendChild(botaoRemover);

            // Montar card
            card.appendChild(imagem);
            card.appendChild(informacoes);

            listaCarrinho.appendChild(card);
        }

        totalCarrinho.textContent = formatarPreco(total);

    } catch (erro) {
        console.error("Erro ao carregar sacola:", erro);

        listaCarrinho.innerHTML =
            "<p>Não foi possível carregar sua sacola.</p>";
    }
}

// Carregar sacola
carregarCarrinho();
