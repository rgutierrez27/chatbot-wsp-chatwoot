
function getArrayMessagesWelcome(names: string): { response: string[] } {
    const arrayMessages: string[] = [
        `¡Hola, ${names}! ¡Qué alegría tenerte aquí en \`Creative Studio\`! 🎉
Estamos encantados de recibirte en nuestra plataforma. Soy tu asesor virtual y estoy aquí para ayudarte en todo lo que necesites.`,

        `¡Saludos, ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🌟
Espero que te sientas como en casa mientras exploras nuestra plataforma. Estoy aquí para ser tu guía y resolver cualquier pregunta que tengas.`,

        `Hola ${names}! ¡Qué bueno verte por aquí en \`Creative Studio\`! 😊
Estoy aquí para asegurarme de que tu experiencia sea excelente. No dudes en preguntar cualquier cosa que necesites.`,

        `¡Hola, ${names}! ¡Te damos una cálida bienvenida a \`Creative Studio\`! 🌟
Como tu asesor virtual, estoy aquí para ayudarte en cada paso del camino. No dudes en contar conmigo para cualquier consulta.`,

        `¡Hola ${names}! ¡Es genial tenerte aquí en \`Creative Studio\`! 🚀
Estoy aquí para asegurarme de que tengas una experiencia increíble mientras navegas por nuestra plataforma. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🎉
Mi objetivo es asegurarme de que te sientas bienvenido/a y apoyado/a en nuestra comunidad. ¿Hay algo en lo que pueda ayudarte?`,

        `¡Hola ${names}! ¡Qué gusto verte por aquí en \`Creative Studio\`! 😊
Estoy aquí para hacer tu visita lo más placentera posible. ¿Hay algo específico que estés buscando?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🚀
Como tu asesor virtual, estoy aquí para hacer que tu experiencia sea lo más fluida y satisfactoria posible. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Qué bueno tenerte aquí en \`Creative Studio\`! 🌟
Estoy aquí para asegurarme de que tengas una experiencia increíble mientras exploras nuestra plataforma. ¿Cómo puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🎉
Como tu asesor virtual, estoy aquí para ayudarte en todo lo que necesites. ¿Hay algo en lo que pueda asistirte?`,

        `¡Hola ${names}! ¡Es un placer recibirte en \`Creative Studio\`! 😊
Estoy aquí para ayudarte a navegar por nuestra plataforma y resolver cualquier duda que tengas. ¿En qué puedo colaborar hoy?`,

        `¡Hola ${names}! ¡Qué bueno verte por aquí en \`Creative Studio\`! 🌟
Como tu asesor virtual, estoy aquí para asegurarme de que tengas la mejor experiencia posible. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🚀
Estoy aquí para hacer que tu experiencia sea lo más placentera posible. ¿En qué puedo asistirte hoy?`,

        `¡Hola ${names}! ¡Qué alegría tenerte aquí en \`Creative Studio\`! 🎉
Como tu asesor virtual, estoy aquí para ayudarte en todo lo que necesites. ¿Hay algo en lo que pueda colaborar contigo?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🌟
Espero que disfrutes de tu estancia aquí. ¿Hay algo en lo que pueda ayudarte hoy?`,

        `¡Hola ${names}! ¡Qué gusto verte por aquí en \`Creative Studio\`! 😊
Estoy aquí para asegurarme de que tengas una experiencia increíble. ¿En qué puedo asistirte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🚀
Estoy aquí para ayudarte en todo lo que necesites. ¿En qué puedo colaborar contigo?`,

        `¡Hola ${names}! ¡Qué alegría tenerte aquí en \`Creative Studio\`! 🎉
Como tu asesor virtual, estoy aquí para hacer que tu experiencia sea lo más fluida posible. ¿Hay algo en lo que pueda ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🌟
Estoy aquí para brindarte la mejor atención y orientación. ¿En qué puedo asistirte hoy?`,

        `¡Hola ${names}! ¡Qué bueno verte por aquí en \`Creative Studio\`! 😊
Como tu asesor virtual, estoy aquí para asegurarme de que tengas una experiencia satisfactoria. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🚀
Estoy aquí para ayudarte en cada paso del camino. ¿En qué puedo colaborar contigo?`,

        `¡Hola ${names}! ¡Qué alegría tenerte aquí en \`Creative Studio\`! 🎉
Espero que disfrutes de tu visita. ¿En qué puedo asistirte hoy?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🌟
Como tu asesor virtual, estoy aquí para hacer que tu experiencia sea lo más satisfactoria posible. ¿En qué puedo ayudarte hoy?`,

        `¡Hola ${names}! ¡Qué bueno verte por aquí en \`Creative Studio\`! 😊
Estoy aquí para ayudarte en todo lo que necesites. ¿En qué puedo colaborar contigo?`,

        `¡Hola ${names}! ¡Bienvenido/a a \`Creative Studio\`! 🚀
Espero que te sientas como en casa aquí. ¿En qué puedo asistirte hoy?`
    ];

    return { response: arrayMessages };
}

export {
    getArrayMessagesWelcome
};