// Importamos useState, el hook de React que permite guardar valores que cambian.
import { useState } from 'react'

export const useForm = (initialValues) => {
  // formState guarda los valores del formulario; setForm los modifica.
  const [formState, setFormState] = useState(initialValues)

  //funcion que se ejecuta cada vez que el usuario escribe en un input.
  const handleInputChange = ({ target }) => {
    const { name, value } = target
    // prev es el estado anterior: copiamos todo (...prev) y pisamos solo el campo que cambió.
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  // Vuelve el formulario a sus valores iniciales.
  const handleReset = () => setFormState(initialValues)

  // Devolvemos lo que las páginas van a usar.
  return { formState, handleInputChange, handleReset }
}
