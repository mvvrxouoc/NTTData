
export const ValidationForm = (formValue, formType) => {

    const error = {};
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const formStructure = {
        username: {
            value: formValue.username,
            type: "text",
            required: true
        },
        email:  {
            value: formValue.email,
            type: "email",
            required: formType === 'register'
        },
        password: {
            value: formValue.password,
            type: "password",
            required: true
        },
        birthDate: {
            value: formValue.birthDate,
            type: "date",
            required: formType === 'register'
        }
        }
    

    const keys = Object.keys(formStructure); 
    
    for ( let key of keys ) {

    if ( formStructure[key].type === "text" && formStructure[key].required ) {
        if (!formStructure[key].value || formStructure[key].value.trim() === "") {
            error[key] = "El campo de nombre de usuario es obligatorio";
        } else if (formStructure[key].value.length < 3) {
            error[key] = "El nombre de usuario debe tener al menos 3 caracteres";
        }

    }

    if ( formStructure[key].type === "email" && formStructure[key].required ) {
        if (!formStructure[key].value || formStructure[key].value.trim() === "") {
            error[key] = "El email es obligatorio";
        } else if (!validEmail.test(formStructure[key].value)) {
            error[key] = "El formato del email es inválido";
        }
    }

    if (formStructure[key].type === "password" && formStructure[key].required) {
        if (!formStructure[key].value || formStructure[key].value.trim() === "") {
            error[key] = "La contraseña es obligatoria";
        } else if (formStructure[key].value.length < 8) {
            error[key] = "La contraseña debe tener al menos 8 caracteres";
        }
    }

    if (formStructure[key].type === "date" && formStructure[key].required) {
            if (!formStructure[key].value) {
                error[key] = "La fecha de nacimiento es obligatoria";
            }
        }
    }

    return error;
}