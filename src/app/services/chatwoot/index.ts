import { MediaData } from 'src/app/types';
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
        const attributeContact = await chatwoot.findOrCreateAttributeContact({ from: dataIn.phone, contact_id: contact.id });
        const attributeConversation = await chatwoot.findOrCreateAttributeConversation({ from: dataIn.phone, contact_id: contact.id });
        const conversationID = await chatwoot.findOrCreateConversation({
            inbox_id: inbox.id,
            contact_id: contact.id,
            phone_number: dataIn.phone
        });


        await chatwoot.createMessage({
            msg: dataIn.message,
            mode: dataIn.mode,
            conversation_id: conversationID,
            attachment: dataIn.attachment
        });
    } catch (error) {
        console.error('[Error handlerMessage]', error);
        // Manejo del error según tu lógica de aplicación
    }
};


const handlerMessageAttachment = async (dataIn: { phone: string, name: string, message: string, media: string, mode: string, mediaData?: any, }, chatwoot: ChatwootClass,bot:any) => {
    try {
        const nameImboxCwt = process.env.CHATWOOT_NAMEINBOX ?? 'BOTWSP'
        const inbox = await chatwoot.findOrCreateInbox({ name: nameImboxCwt });
        const contact = await chatwoot.findOrCreateContact({ from: dataIn.phone, name: dataIn.name });
        // const contact = await chatwoot.findOrCreateContact({ contact_id: contact.id});
        const attributeContact = await chatwoot.findOrCreateAttributeContact({ from: dataIn.phone, contact_id: contact.id });
        const attributeConversation = await chatwoot.findOrCreateAttributeConversation({ from: dataIn.phone, contact_id: contact.id });

        const conversationID = await chatwoot.findOrCreateConversation({
            inbox_id: inbox.id,
            contact_id: contact.id,
            phone_number: dataIn.phone
        });

        await chatwoot.createMessageAttachment({
            msg: null,
            name: dataIn.name,
            mode: dataIn.mode,
            conversation_id: conversationID,
            mediaData: dataIn.mediaData,
            media: dataIn.media,
            botInstance: bot
        });
    } catch (error) {
        console.error('[Error handlerMessageAttachment]', error);
    }
}

export {
    handlerMessage,
    handlerMessageAttachment
};