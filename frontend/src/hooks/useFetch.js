import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [isLoadig, setIsLoading] = useState(true)

    const [data, setData] = useState(null)

    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            setIsLoading(true)
            setError(null) // limpiamos errores de un pedido anterior

            // fetch hace el pedido. credentials: 'include' manda la cookie del login al backend.
            const response = await fetch(url, { credentials: 'include' })
            // nota: fetch NO falla solo cuando el backend responde 401, 403 o 500.
            // Solo falla si no hay conexión. Por eso revisamos nosotros response.ok.
            // response.ok es true solo si el código HTTP está entre 200 y 299.

            if (!response.ok) throw new Error(`Error ${response.status}`) 

            const data = await response.json()
            setData(data)
        } catch (error) {
            setError(error.message)
        }finally{
            // Por eso apagamos la carga acá, para no repetir la línea en try y en catch.
            setIsLoading(false)
        }
    }

    // useEffect ejecuta código cuando el componente aparece en pantalla
    // y cada vez que cambia algo de la lista del final.
    useEffect(()=>{
        fetchData()},
        [url] // [url]: el efecto se vuelve a ejecutar solo si la URL cambia
        )

    return {data, isLoadig, error}
}