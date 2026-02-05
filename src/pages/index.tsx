import Layout from "@/components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";
import Botao from "../components/Botao";
import Formulario from "@/components/Formulario";
import { useEffect, useState } from "react"
import ColecaoCliente from "@/backend/db/ColecaoCliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";


export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

    const [visivel, setVisivel] = useState<'tabela' | 'formulario'>('tabela')
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    const [clientes, setClientes] = useState<Cliente[]>([])

    useEffect(obterTodos, [])

    function obterTodos() {
      repo.obterTodos().then(clientes => {
        setClientes(clientes)
        setVisivel('tabela')
      })
    }


  function clienteSelecionado (cliente:Cliente) {
    setCliente(cliente)
    setVisivel('formulario')
  }

  async function clienteExcluido (cliente:Cliente) {
    await repo.excluir(cliente)
    obterTodos()
  }

  function novoCliente (cliente:Cliente) {
    setCliente(Cliente.vazio())
    setVisivel('formulario')
  }

  async function salvarCliente (cliente:Cliente) {
    await repo.salvar(cliente)
    obterTodos()
  }



  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500   text-white
    `}>
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-start">
              <Botao className="mb-5" 
                onClick={() => novoCliente(Cliente.vazio())}>
                Novo Cliente
              </Botao>
            </div>
          <Tabela clientes={clientes} 
            clienteSelecionado={clienteSelecionado}
            clienteExcluido={clienteExcluido}/>
          </>
        ) : (
          
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')}
          />

        )}
       
      </Layout>
    </div>
  )
}
