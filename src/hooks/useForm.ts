import { useState, useEffect, ChangeEvent } from "react"
  
export interface FormValues {
    username: string;
    password: string;
    email?: string;
    birthDate?: any;
  }

export const useForm = (initialValue: FormValues) => {

    const [formValue, setFormValue] = useState<FormValues>(initialValue);

    useEffect(() => {
      console.log(formValue);
    }, [formValue]);
    
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target; 
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