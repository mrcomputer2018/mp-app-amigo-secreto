import { ModeToggle } from "../commons/ModeToggle";

export default function Header() {
    return (
        <header className="w-full py-4 border-b border-gray-200 dark:border-gray-700 elevation-2 dark:elevation-4">
            <div className="container max-w-7xl mx-auto flex justify-between items-center">
                <img src="" alt="imagem do logotipo" />

                <nav>
                    <ul className="flex space-x-4">
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Contact</li>
                    </ul>
                </nav>

                <ModeToggle />
            </div>
        </header>
    )
}