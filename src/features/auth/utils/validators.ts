// Validador de RFC (SAT México)
export const validateRFC = (rfc: string): string => {
    if (!rfc) return 'El RFC es requerido';

    const cleanRFC = rfc.trim().toUpperCase();

    // Regla de longitud: Físicas (13) y Morales (12)
    if (cleanRFC.length < 12 || cleanRFC.length > 13) {
        return 'El RFC debe tener entre 12 y 13 caracteres';
    }

    // Estructura oficial del SAT
    const rfcRegex = /^([A-ZÑ&]{3,4})([0-9]{2})([0-1][0-9])([0-3][0-9])([A-Z0-9]{3})$/i;
    if (!rfcRegex.test(cleanRFC)) {
        return 'La estructura del RFC es inválida';
    }

    return ''; // Sin error
};

// Validador de Correo Electrónico
export const validateEmail = (email: string): string => {
    if (!email) return 'El correo electrónico es requerido';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return 'El formato de correo electrónico es inválido';
    }

    return ''; // Sin error
};
