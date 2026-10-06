import { Link } from "react-router"

export const NavBar = () =>{
    return(
        <>
            <h2>Bienvenido</h2>
            <nav>
                <ul>
                    <li><Link to="/home">home</Link></li>
                    <li><button type="button">Logout</button></li>
                </ul>
            </nav>
        </>
    )
}