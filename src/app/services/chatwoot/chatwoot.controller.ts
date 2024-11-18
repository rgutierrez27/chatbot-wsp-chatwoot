import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { DATA_USER } from 'src/utils/globalVariables';


const isBotFunctionEnabled = (body: any) => {

    console.log('--isBotFunctionEnabled--');

    console.log(body);

    const functionsAttrPaths = [
        "custom_attributes.is_active_chatbot",
        "sender.custom_attributes.is_active_chatbot",
        "conversation.meta.sender.custom_attributes.is_active_chatbot",
    ];

    const getNestedProperty = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    return functionsAttrPaths.some((path) => getNestedProperty(body, path) === "ON");

    // return functionsAttrPaths.some((path) => _.get(body, path) === "ON");
}

const processBotFunctions = async (body: any, bot: any) => {

    let numberOrId = "";

    // console.log(JSON.stringify(body)); 
    // console.log(body?.event);

    const mapperAttributes = body?.changed_attributes?.map((a: any) => Object.keys(a)).flat(2);
    // console.log(mapperAttributes);


    // if (body?.event === "contact_updated" && mapperAttributes.includes('custom_attributes')) { //  <-- cuando sea atributo de contacto
    //     const phone = body?.phone_number.replace('+', '');
    //     numberOrId = phone;

    //     const currentValue = body?.changed_attributes[1]?.custom_attributes?.current_value?.is_active_chatbot;

    //     console.log('numberOrId ' + numberOrId);

    //     // bot.blacklist.checkIf(numberOrId)
    //     const getBlacklistSnapshot = await bot.blacklist.getList();
    //     if (currentValue == 'OFF') { //  getBlacklistSnapshot.includes(numberOrId)

    //         console.log("Adding to blacklist:", numberOrId);
    //         bot.blacklist.add(numberOrId);

    //         // Verificar si la propiedad no existe, y asignarla si es necesario
    //         if (!DATA_USER[numberOrId]) {
    //             DATA_USER[numberOrId] = {};  // Inicializa el objeto si no existe
    //         }

    //         DATA_USER[numberOrId].ASESORCHATWOOT = true;
    //         return 1;
    //     } else {
    //         console.log("Removing from blacklist:", numberOrId);

    //         const dataCheck = bot.blacklist.checkIf(phone)

    //         if (dataCheck) {
    //             bot.blacklist.remove(numberOrId);

    //             // Verificar si la propiedad no existe, y asignarla si es necesario
    //             if (!DATA_USER[numberOrId]) {
    //                 DATA_USER[numberOrId] = {};  // Inicializa el objeto si no existe
    //             }

    //             DATA_USER[numberOrId].ASESORCHATWOOT = false;
    //         }


    //     }
    // }

    if (body?.event === "conversation_updated" && mapperAttributes.includes('custom_attributes')) {
        const phone = body?.meta?.sender?.phone_number.replace('+', '');
        numberOrId = phone;

        const currentValue = body?.changed_attributes[1]?.custom_attributes?.current_value?.is_active_chatbot;

        // console.log('numberOrId ' + numberOrId);

        // bot.blacklist.checkIf(numberOrId)
        const getBlacklistSnapshot = await bot.blacklist.getList();
        if (currentValue == 'OFF') { //  getBlacklistSnapshot.includes(numberOrId)

            // console.log("Adding to blacklist:", numberOrId);
            bot.blacklist.add(numberOrId);

            // Verificar si la propiedad no existe, y asignarla si es necesario
            if (!DATA_USER[numberOrId]) {
                DATA_USER[numberOrId] = {};  // Inicializa el objeto si no existe
            }

            DATA_USER[numberOrId].ASESORCHATWOOT = true;
            return 1;
        } else {
            // console.log("Removing from blacklist:", numberOrId);

            const dataCheck = bot.blacklist.checkIf(phone)

            if (dataCheck) {
                bot.blacklist.remove(numberOrId);

                // Verificar si la propiedad no existe, y asignarla si es necesario
                if (!DATA_USER[numberOrId]) {
                    DATA_USER[numberOrId] = {};  // Inicializa el objeto si no existe
                }

                DATA_USER[numberOrId].ASESORCHATWOOT = false;
            }


        }
    }
    return 2;

}

/**
 * Este es el controlador de los eventos de Chatwoot
 * @param {*} req 
 * @param {*} res 
 */
const chatwootCtrl = async (req: any, res: any) => {

    const body = req.body;
    const attachments = body?.attachments;
    const bot = req.bot;

    // console.log(bot.provider);
    // return;


    try {
        // Llamar correctamente a la función y obtener el resultado
        // const isFunctionEnabled = isBotFunctionEnabled(body);
        // console.log('isFunctionEnabled ' + isFunctionEnabled);



        // Puedes utilizar el resultado como desees, por ejemplo:
        const rpt = await processBotFunctions(body, bot)
        if (rpt == 1) {
            return;
        }

        // if (!isFunctionEnabled) { // si isFunctionEnabled es true, significa que esta activo chatbot
        //     return await processBotFunctions(body, bot)
        // } else {
        //     const phone = body.conversation?.meta?.sender?.phone_number.replace('+', '');

        //     const dataCheck = bot.blacklist.checkIf(phone)
        //     if (dataCheck) {
        //         bot.blacklist.remove(phone);
        //         // Verificar si la propiedad no existe, y asignarla si es necesario
        //         if (!DATA_USER[phone]) {
        //             DATA_USER[phone] = {};  // Inicializa el objeto si no existe
        //         }

        //         DATA_USER[phone].ASESORCHATWOOT = false;
        //     }

        // }



        //const mapperAttributes = body?.changed_attributes?.map((a: any) => Object.keys(a)).flat(2);


        //CAMBIAR A CHATBOT O ASESOR SI CAMBIO DE AGENTE EN CHATWOOT
        // if (body?.event === 'conversation_updated' && mapperAttributes.includes('assignee_id')) {
        //     const phone = body?.meta?.sender?.phone_number.replace('+', '');
        //     const idAssigned = body?.changed_attributes[0]?.assignee_id?.current_value ?? null;

        //     if (idAssigned) {
        //         console.log('idAssigned');

        //         bot.blacklist.add(phone);
        //         DATA_USER[phone].ASESORCHATWOOT = true;
        //     } else {
        //         console.log('Not assigned');

        //         bot.blacklist.remove(phone);
        //         DATA_USER[phone].ASESORCHATWOOT = false;
        //     }
        //     // res.send('ok');
        //     // res.status(200).send('ok'); // Enviar una respuesta con estado 200
        //     return;
        // }

        const checkIfMessage = body?.private == false && body?.event == "message_created" && body?.message_type === "outgoing" && body?.conversation?.channel.includes("Channel::Api");
        if (checkIfMessage) {
            const phone = body.conversation?.meta?.sender?.phone_number.replace('+', '');
            const content = body?.content ?? '';

            const file = attachments?.length ? attachments[0] : null;

            // console.log('******');

            // console.log(body.attachments[0].file_type);
            // console.log(body.attachments[0]);
            // console.log(file.data_url);



            if (body?.content == null && body.attachments[0].file_type == "audio") { /* Para comprobar si es audio */
                await bot.provider.sendAudio(`${phone}@c.us`, file.data_url)
                return
            }

            if (body?.content == null && body.attachments[0].file_type == "file") { /* Para comprobar si es documento */

                const sock = await bot.provider.getInstance();
                await sock.sendMessage(
                    `${phone}@c.us`,
                    {
                        document: {
                            url: file.data_url
                        },
                        mimetype: 'application/pdf',
                        fileName: 'documento.pdf'
                    }
                );

                return
            }

            if (body?.content == null && body.attachments[0].file_type == "video") { /* Para comprobar si es video */

                const sock = await bot.provider.getInstance();
                await sock.sendMessage(
                    `${phone}@c.us`,
                    {
                        video: { url: file.data_url },
                        caption: '',
                        gifPlayback: true,
                    }

                    // {
                    //     video: "./Media/ma_gif.mp4",
                    //     caption: "hello!",
                    //     gifPlayback: true
                    // }

                );

                return
            }


            if (file) {
                console.log(`Este es el archivo adjunto...`, file.data_url);
                // await bot.sendMedia(
                //     `${phone}@c.us`,
                //     file.data_url,
                //     content,
                // );

                console.log('es un archivo');
                console.log(file.data_url);

                await bot.sendMessage(
                    `${phone}@c.us`,
                    content,
                    { media: file.data_url ?? null }
                );

                return;
            }

            await bot.provider.sendMessage(
                `${phone}`,
                content,
                {}
            );

            // res.status(200).send('ok'); // Enviar una respuesta con estado 200

            return;

        }
        // res.status(200).send('ok'); // Enviar una respuesta con estado 200 si no se cumple ninguna condición
        // res.send('ok');
    } catch (error) {
        console.log(error);
        // res.status(500).send('Error');
        // return res.status(405).send('Error');
    }
}



export default chatwootCtrl