import Titulo from './Titulo'

interface LayoutProps {
    titulo: string
    children?: any
}

export default function Layout (props: LayoutProps) {
    return (
        <div className={`
        backdrop-blur-md
        flex flex-col w-2/3
        bg-white/60 text-gray-800 rounded-xl
        shadow-2xl
        border border-white/20
        overflow-x-auto
        `}>
            <Titulo>{props.titulo}</Titulo>
            <div className='p-6'>
                {props.children}
            </div>
        </div>
    )
}   

    // backdrop-blur-md
    //     flex flex-col w-2/3
    //     bg-white text-gray-800 rounded-md