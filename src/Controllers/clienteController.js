
import * as ClienteModel from "../Models/clienteModel.js";
import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const gerarHash = promisify(scrypt);

// Listar clientes
export function listar(req, res) {
    ClienteModel.listar((err, resultados) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao listar clientes",
                detalhes: err.message
            });
        }

        res.json(resultados);
    });
}

// Buscar cliente por ID
export function buscarPorId(req, res) {
    const { id } = req.params;

    ClienteModel.buscarPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao buscar cliente",
                detalhes: err.message
            });
        }

        if (resultados.length === 0) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.json(resultados[0]);
    });
}

// Cadastrar cliente
export async function criar(req, res) {
    const dados = req.body;

    if (!dados.nome || !dados.email || !dados.senha ||
        !dados.altura || !dados.peso) {
        return res.status(400).json({
            erro: "Preencha todos os campos obrigatórios."
        });
    }

    if (typeof dados.senha !== "string" || dados.senha.length < 8) {
        return res.status(400).json({
            erro: "A senha deve ter pelo menos 8 caracteres."
        });
    }

    try {
        const salt = randomBytes(16).toString("hex");
        const hash = await gerarHash(dados.senha, salt, 64);

        const dadosCliente = {
            nome: dados.nome,
            email: dados.email,
            altura: dados.altura,
            peso: dados.peso,
            telefone: dados.telefone || null,
            endereco: dados.endereco || null,
            senha_hash: salt + ":" + hash.toString("hex")
        };

        ClienteModel.criar(dadosCliente, (err, resultado) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        erro: "E-mail já cadastrado."
                    });
                }

                return res.status(500).json({
                    erro: "Erro ao cadastrar cliente."
                });
            }

            res.status(201).json({
                mensagem: "Cadastro realizado com sucesso!",
                id_cliente: resultado.insertId,
                nome: dadosCliente.nome,
                email: dadosCliente.email
            });
        });

    } catch (erro) {
        console.error("Erro no cadastro:", erro);

        res.status(500).json({
            erro: "Não foi possível realizar o cadastro."
        });
    }
}

// Verificar login
export function login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            erro: "Informe o e-mail e a senha."
        });
    }

    ClienteModel.buscarPorEmail(email, async (err, resultados) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao buscar cliente."
            });
        }

        if (resultados.length === 0) {
            return res.status(401).json({
                erro: "E-mail ou senha incorretos."
            });
        }

        const cliente = resultados[0];

        try {
            const partes = cliente.senha_hash.split(":");

            if (partes.length !== 2) {
                return res.status(401).json({
                    erro: "E-mail ou senha incorretos."
                });
            }

            const [salt, hashSalvo] = partes;

            const hashDigitado = await gerarHash(senha, salt, 64);
            const hashOriginal = Buffer.from(hashSalvo, "hex");

            if (hashDigitado.length !== hashOriginal.length ||
                !timingSafeEqual(hashDigitado, hashOriginal)) {
                return res.status(401).json({
                    erro: "E-mail ou senha incorretos."
                });
            }

            res.json({
                mensagem: "Login realizado com sucesso!",
                cliente: {
                    id_cliente: cliente.id_cliente,
                    nome: cliente.nome,
                    email: cliente.email
                }
            });

        } catch (erro) {
            console.error("Erro no login:", erro);

            res.status(500).json({
                erro: "Não foi possível realizar o login."
            });
        }
    });
}

// Atualizar cliente
export function atualizar(req, res) {
    const { id } = req.params;
    const dados = req.body;

    ClienteModel.atualizar(id, dados, (err, resultado) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    erro: "E-mail já cadastrado"
                });
            }

            return res.status(500).json({
                erro: "Erro ao atualizar cliente",
                detalhes: err.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.json({
            mensagem: "Cliente atualizado com sucesso"
        });
    });
}

// Excluir cliente
export function excluir(req, res) {
    const { id } = req.params;

    ClienteModel.excluir(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({
                erro: "Erro ao excluir cliente",
                detalhes: err.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                erro: "Cliente não encontrado"
            });
        }

        res.json({
            mensagem: "Cliente excluído com sucesso"
        });
    });
}
