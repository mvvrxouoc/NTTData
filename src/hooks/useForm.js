import { useState, useEffect } from "react"

export const useForm = (initialValue) => {

    const [formValue, setFormValue] = useState(initialValue);

    useEffect(() => {
      console.log(formValue);

    }, [formValue]);
    
    
    const handleChange = ({target}) => {
        const {name, value} = target; // Destructuracion de target, para no tener que usar target.name, target.value
        setFormValue({
            ...formValue,
            [name]: value, // [name] es una forma de acceder a la propiedad de un objeto de forma dinamica
        })
    }

    const onResetForm = () => {
        setFormValue(initialValue);
    }
    
    return{
        formValue,
        handleChange,
        setFormValue,
        onResetForm,
    }
}