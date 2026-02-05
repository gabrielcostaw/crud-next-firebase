import { table } from "console"
import Clientes from "../core/Cliente"
import { iconeEdicao, iconeLixo } from "./icones"

interface TabelaProps {
    clientes: Clientes[]
    clienteSelecionado?: (cliente:Clientes) => void
    clienteExcluido?: (cliente:Clientes) => void
}

const styleButtonEdit = "flex justify-center items-center text-green-600 rounded-full p-2 m-1 hover:bg-purple-50"
const styleButtonLixo = "flex justify-center items-center text-red-600 rounded-full p-2 m-1 hover:bg-purple-50"
export default function Tabela (props: TabelaProps) {
    
        const exibirAcoes = props.clienteExcluido || props.clienteSelecionado

        function renderizarCabecalho () {
        return (
                <tr>
                    <th className="text-left p-4"> Código</th>
                    <th className="text-left p-4"> Nome</th>
                    <th className="text-left p-4"> Idade</th>
                    {exibirAcoes ? <th className="text-center p-4"> Ações</th> : false}
                </tr>
            )
        }

        function renderizarDados () {
            return props.clientes?.map((cliente, i) => {
                return (
                    <tr key={cliente.id} className={`
                        ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}
                    `}>
                        <td className="text-left p-4">{cliente.id}</td>
                        <td className="text-left p-4">{cliente.nome}</td>
                        <td className="text-left p-4">{cliente.idade}</td>
                        {exibirAcoes ? renderizarAcoes(cliente) : false}
                    </tr>
                )
            })
        }

        function renderizarAcoes (cliente: Clientes) {
            return (
                <td className="flex justify-center items-center">
                    {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)}
                    className={styleButtonEdit}>
                        {iconeEdicao}
                    </button>
                    ) : false}

                    {props.clienteExcluido ? (
                    <button onClick={() => props.clienteExcluido?.(cliente)}
                    className={styleButtonLixo}>
                        {iconeLixo}
                    </button>
                    ) : false}
                </td>
            )
        }
        
        return (
            <table className="w-full rounded-xl overflow-hidden">
                <thead className={`
                    bg-gradient-to-r from-purple-500 to-purple-800 text-gray-50
                `}>
                {renderizarCabecalho()}
                </thead>
                <tbody >
                {renderizarDados()}
                </tbody>
            </table>
        )

}