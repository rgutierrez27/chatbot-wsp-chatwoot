import ChatwootClass from './chatwoot.class';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Es la funciona que importa para guardar los mensajes y crear lo que sea necesario
 * @param {*} dataIn pasando los datos del contacto + el mensaje
 * @param {*} chatwoot la dependencia del chatwoot...(create, buscar...)
 */
const handlerMessage = async (dataIn: { phone: string; name: string; message: string; mode: string; attachment: string[] }, chatwoot: ChatwootClass) => {
    try {

        const nameImboxCwt = process.env.CHATWOOT_NAMEINBOX ?? 'BOTWSP'
        const inbox = await chatwoot.findOrCreateInbox({ name: nameImboxCwt });
        const contact = await chatwoot.findOrCreateContact({ from: dataIn.phone, name: dataIn.name });
        const conversation = await chatwoot.findOrCreateConversation({
            inbox_id: inbox.id,
            contact_id: contact.id,
            phone_number: dataIn.phone
        });


        await chatwoot.createMessage({
            msg: dataIn.message,
            mode: dataIn.mode,
            conversation_id: conversation.id,
            attachment: dataIn.attachment
        });
    } catch (error) {
        console.error('[Error handlerMessage]', error);
        // Manejo del error según tu lógica de aplicación
    }
};

export default handlerMessage;