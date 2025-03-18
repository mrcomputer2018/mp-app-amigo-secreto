import { GiftIcon, User } from "lucide-react";
import { ModeToggle } from "../commons/ModeToggle";

export default function Header() {
    return (
        <header className="w-full py-4 border-b border-gray-200 dark:border-gray-700 elevation-2 dark:elevation-4">
            <div className="container max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div>
                        <GiftIcon size={32} color="#ff0000"/>
                    </div>
                    <h1 className="text-2xl">
                        <strong>
                            Amigo
                        </strong>
                        <span className="font-light">
                            Secreto
                        </span>
                    </h1>
                </div>

                <nav>
                    <ul className="flex space-x-4">
                        <button className="flex items-center space-x-1">
                            <User />
                            Meus Grupos
                        </button>
                        <button>Novo Grupo</button>
                    </ul>
                </nav>

                <ModeToggle />
            </div>
        </header>
    )
}