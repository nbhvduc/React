import { useEffect } from "react"
import { useNavigate } from "react-router"


export const Home = () => {
    const navigate = useNavigate()

    return (
        <div>Welcome to Home Page</div>
    )
}