function getArrayMessagesTryCatch(): { response: string[] } {
    const arrayMessages: string[] = [
        "Lo sentimos, ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.",
        "Oops, algo salió mal. Estamos trabajando para solucionarlo. Por favor, intenta nuevamente más tarde.",
        "Hubo un problema al procesar tu solicitud. Lamentamos las molestias. Por favor, inténtalo más tarde.",
        "¡Vaya! Parece que ha habido un error. Estamos trabajando para resolverlo. Por favor, intenta nuevamente.",
        "Lamentablemente, no pudimos completar tu solicitud en este momento. Intenta nuevamente más tarde.",
        "¡Oh no! Ha ocurrido un error. Estamos haciendo todo lo posible para solucionarlo. Por favor, intenta de nuevo.",
        "Lo siento, parece que algo salió mal. Estamos investigando el problema. Por favor, inténtalo de nuevo más tarde.",
        "Ha habido un error al procesar tu solicitud. Por favor, inténtalo nuevamente en unos minutos.",
    ];

    return { response: arrayMessages };
}

function getArrayMessagesIdle(): { response: string[] } {
    const arrayMessages: string[] = [
        "Tu sesión ha sido cerrada por inactividad. ¡Vuelve cuando quieras continuar explorando! ⏰",
        "Por tu seguridad, cerramos la sesión debido a inactividad. ¡Esperamos verte de nuevo pronto! 👀",
        "La sesión se ha cerrado automáticamente por falta de actividad. No te preocupes, estaremos aquí cuando decidas regresar. 😊",
        "Cerramos tu sesión para protegerte. Siempre es bueno iniciar sesión de nuevo para mantener tu cuenta segura. ¡Hasta luego! 🌐",
        "La inactividad cerró tu sesión. Cuando estés listo para seguir, simplemente inicia sesión de nuevo. ¡Te esperamos! 🚀",
        "Por seguridad, hemos cerrado tu sesión debido a la inactividad. Regresa cuando lo desees para continuar. ¡Hasta pronto! 🔒",
        "Tu sesión fue cerrada automáticamente por inactividad. Cuando estés listo, estaremos aquí para ayudarte. 😴",
        "La sesión ha sido cerrada para proteger tu cuenta debido a la inactividad. ¡Estamos aquí cuando necesites ayuda! 🛡️",
        "Cerramos tu sesión por inactividad, ¡pero siempre es un placer tenerte de vuelta! 😊",
        "La inactividad cerró tu sesión. No te preocupes, puedes iniciar sesión nuevamente cuando quieras. ¡Hasta la próxima! ⏲️",
        "Por tu seguridad, hemos cerrado tu sesión debido a la inactividad. ¡Vuelve pronto! 👋",
        "La sesión se cerró automáticamente por falta de actividad. Cuando decidas regresar, estaremos aquí para ayudarte. 😇",
        "Cerramos tu sesión por inactividad, pero siempre estamos aquí para atenderte cuando vuelvas. ¡Nos vemos pronto! 🌈",
        "La inactividad cerró tu sesión. ¡No te preocupes, estamos aquí para ti cuando decidas volver a iniciar sesión! 🔄",
        "Por seguridad, hemos cerrado tu sesión debido a la inactividad. ¡Te esperamos cuando quieras continuar! 🌟",
        "Tu sesión ha sido cerrada automáticamente por inactividad. Si necesitas ayuda, no dudes en regresar. ¡Hasta luego! 🚪",
        "La inactividad cerró tu sesión, pero eso no significa que no te extrañemos. ¡Vuelve pronto a explorar! 🚀",
        "Cerramos tu sesión por inactividad para proteger tu cuenta. Cuando desees volver, aquí estaremos. ¡Hasta pronto! 🔒",
        "Por tu seguridad, cerramos tu sesión debido a la inactividad. Estamos ansiosos por verte de nuevo en línea. ¡Hasta la próxima! 🌐",
        "La inactividad cerró tu sesión, pero siempre es un placer tenerte de vuelta. ¡Nos vemos pronto! 😊"
    ];

    return { response: arrayMessages }; 
}

function getArrayMessagesWelcome(names: string): { response: string[] } {
    const arrayMessages: string[] = [
        `
🌟 Hola! *${names}*  ¡Bienvenido a \`Double Code!\` 🌟

    ¡Es un placer recibirte en nuestra plataforma!

    Soy tu asesor virtual, listo para brindarte la mejor atención y orientación.

🕘 Por favor, esperame un momento mientras cargamos nuestras opciones para ayudarte de la mejor manera posible.`, 
        `¡Hola, ${names}! ¡Qué alegría tenerte aquí en \`Double Code\`! 🎉
Estamos encantados de recibirte en nuestra plataforma. Soy tu asesor virtual y estoy aquí para ayudarte en todo lo que necesites.`,

        `¡Saludos, ${names}! ¡Bienvenido/a a \`Double Code\`! 🌟
Espero que te sientas como en casa mientras exploras nuestra plataforma. Estoy aquí para ser tu guía y resolver cualquier pregunta que tengas.`,

        `Hola ${names}! ¡Qué bueno verte por aquí en \`Double Code\`! 😊
Estoy aquí para asegurarme de que tu experiencia sea excelente. No dudes en preguntar cualquier cosa que necesites.`,

        `¡Hola, ${names}! ¡Te damos una cálida bienvenida a \`Double Code\`! 🌟
Como tu asesor virtual, estoy aquí para ayudarte en cada paso del camino. No dudes en contar conmigo para cualquier consulta.`,

        `¡Hola ${names}! ¡Es genial tenerte aquí en \`Double Code\`! 🚀
Estoy aquí para asegurarme de que tengas una experiencia increíble mientras navegas por nuestra plataforma. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🎉
Mi objetivo es asegurarme de que te sientas bienvenido/a y apoyado/a en nuestra comunidad. ¿Hay algo en lo que pueda ayudarte?`,

        `¡Hola ${names}! ¡Qué gusto verte por aquí en \`Double Code\`! 😊
Estoy aquí para hacer tu visita lo más placentera posible. ¿Hay algo específico que estés buscando?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🚀
Como tu asesor virtual, estoy aquí para hacer que tu experiencia sea lo más fluida y satisfactoria posible. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Qué bueno tenerte aquí en \`Double Code\`! 🌟
Estoy aquí para asegurarme de que tengas una experiencia increíble mientras exploras nuestra plataforma. ¿Cómo puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🎉
Como tu asesor virtual, estoy aquí para ayudarte en todo lo que necesites. ¿Hay algo en lo que pueda asistirte?`,

        `¡Hola ${names}! ¡Es un placer recibirte en \`Double Code\`! 😊
Estoy aquí para ayudarte a navegar por nuestra plataforma y resolver cualquier duda que tengas. ¿En qué puedo colaborar hoy?`,

        `¡Hola ${names}! ¡Qué bueno verte por aquí en \`Double Code\`! 🌟
Como tu asesor virtual, estoy aquí para asegurarme de que tengas la mejor experiencia posible. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🚀
Estoy aquí para hacer que tu experiencia sea lo más placentera posible. ¿En qué puedo asistirte hoy?`,

        `¡Hola ${names}! ¡Qué alegría tenerte aquí en \`Double Code\`! 🎉
Como tu asesor virtual, estoy aquí para ayudarte en todo lo que necesites. ¿Hay algo en lo que pueda colaborar contigo?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🌟
Espero que disfrutes de tu estancia aquí. ¿Hay algo en lo que pueda ayudarte hoy?`,

        `¡Hola ${names}! ¡Qué gusto verte por aquí en \`Double Code\`! 😊
Estoy aquí para asegurarme de que tengas una experiencia increíble. ¿En qué puedo asistirte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🚀
Estoy aquí para ayudarte en todo lo que necesites. ¿En qué puedo colaborar contigo?`,

        `¡Hola ${names}! ¡Qué alegría tenerte aquí en \`Double Code\`! 🎉
Como tu asesor virtual, estoy aquí para hacer que tu experiencia sea lo más fluida posible. ¿Hay algo en lo que pueda ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🌟
Estoy aquí para brindarte la mejor atención y orientación. ¿En qué puedo asistirte hoy?`,

        `¡Hola ${names}! ¡Qué bueno verte por aquí en \`Double Code\`! 😊
Como tu asesor virtual, estoy aquí para asegurarme de que tengas una experiencia satisfactoria. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🚀
Estoy aquí para ayudarte en cada paso del camino. ¿En qué puedo colaborar contigo?`,

        `¡Hola ${names}! ¡Qué alegría tenerte aquí en \`Double Code\`! 🎉
Espero que disfrutes de tu visita. ¿En qué puedo asistirte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🌟
Como tu asesor virtual, estoy aquí para hacer que tu experiencia sea lo más satisfactoria posible. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Qué bueno verte por aquí en \`Double Code\`! 😊
Estoy aquí para ayudarte en todo lo que necesites. ¿En qué puedo colaborar contigo?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Double Code\`! 🚀
Espero que te sientas como en casa aquí. ¿En qué puedo asistirte hoy?`
    ];

    return { response: arrayMessages };
}

export {
    getArrayMessagesTryCatch,
    getArrayMessagesIdle,
    getArrayMessagesWelcome
};