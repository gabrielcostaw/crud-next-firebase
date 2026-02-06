import { table } from "console"
import Clientes from "../core/Cliente"
import { iconeEdicao, iconeLixo } from "./icones"

interface TabelaProps {
    clientes: Clientes[]
    clienteSelecionado?: (cliente:Clientes) => void
    clienteExcluido?: (cliente:Clientes) => void
}

const styleButtonEdit = "flex justify-center items-center text-blue-800 rounded-full p-2 mt-2 hover:bg-purple-50 hover:outline hover:outline-2 hover-outline-blue"
const styleButtonLixo = "flex justify-center items-center text-red-600 rounded-full p-2 mt-2 hover:bg-purple-50 hover:outline hover:outline-2 hover-outline-red"
export default function Tabela (props: TabelaProps) {
    
        const exibirAcoes = props.clienteExcluido || props.clienteSelecionado

        function renderizarCabecalho () {
        return (
                <tr>
                    <th className="text-left p-4 w-4/10"> Código</th>
                    <th className="text-left p-4 w-3/10"> Nome</th>
                    <th className="text-left p-4 w-2/10"> Idade</th>
                    {exibirAcoes ? <th className="text-center p-4 w-3/10"> Ações</th> : false}
                </tr>
            )
        }

        function renderizarDados () {
            return props.clientes?.map((cliente, i) => {
                return (
                    <tr key={cliente.id} className={`
                        ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}
                    `}>
                        <td className="text-left p-4 overflow-auto">{cliente.id}</td>
                        <td className="text-left p-4 overflow-auto">{cliente.nome}</td>
                        <td className="text-left p-4 overflow-auto">{cliente.idade}</td>
                        {exibirAcoes ? renderizarAcoes(cliente) : false}
                    </tr>
                )
            })
        }

        function renderizarAcoes (cliente: Clientes) {
            return (
                <td className="flex justify-center items-center rounded-md">
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
            <div className="rounded-lg overflow-x-hidden">
            <table className="w-full table-fixed">
                <thead className={`
                    bg-purple-800 text-gray-50
                `}>
                {renderizarCabecalho()}
                </thead>
                <tbody >
                {renderizarDados()}
                </tbody>
            </table>
            </div>
        )

}