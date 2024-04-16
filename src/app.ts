/* eslint-disable no-prototype-builtins */
import { createBot, createProvider, createFlow, addKeyword, utils, EVENTS } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'

import chatwootCtrl from './app/services/chatwoot/chatwoot.controller'
import ChatwootClass from 'src/app/services/chatwoot/chatwoot.class'
import handlerMessage from './app/services/chatwoot'

import { getArrayMessagesWelcome } from './app/helpers/greetingHelpers'
import { DATA_USER } from './utils/globalVariables'
import { generateRandomNumber, sleepTemporary } from './utils/functions'
import Queue from 'queue-promise';
import mimeType from 'mime-types';
import fs from 'node:fs/promises';


import dotenv from 'dotenv';
dotenv.config();
// import { downloadMediaMessage } from '@whiskeysockets/baileys'

const PORT = process.env.PORT ?? 3011

const initFlow = addKeyword<Provider, Database>(EVENTS.WELCOME)
    .addAction(async (ctx, { flowDynamic, endFlow, gotoFlow, state, provider }) => {

        
        if (DATA_USER[ctx.from]?.ASESORCHATWOOT) {
            return;
        }

        await sleepTemporary(generateRandomNumber(1500, 1700));

        const names = ctx.name;
        const { response } = getArrayMessagesWelcome(names);
        const messageWelcome = response[Math.floor(Math.random() * response.length)];
        await flowDynamic(messageWelcome);
        return;

    });


const chatwoot = new ChatwootClass({
    account: process.env.CHATWOOT_ACCOUNT_ID,
    token: process.env.CHATWOOT_TOKEN,
    endpoint: process.env.CHATWOOT_ENDPOINT
})

const queue = new Queue({
    concurrent: 1,
    interval: 500
})

const main = async () => {
    const adapterFlow = createFlow([initFlow])

    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database()

    const bot = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    const { handleCtx, httpServer } = bot;

    httpServer(+PORT)

    adapterProvider.on('message', (payload) => {
        // console.log(`Message Payload:`, { body, from })
        // console.log(payload);

        queue.enqueue(async () => {

            try {

                // preguntamos si escribio asesor
                await sleepTemporary(generateRandomNumber(2500, 3500));
                if (!DATA_USER[payload.from]?.ASESORCHATWOOT) {
                    DATA_USER[payload.from] = {
                        ASESORCHATWOOT: true
                    };
                }
                
                

                // if (DATA_USER[payload.from]?.hasOwnProperty('ASESORCHATWOOT') && DATA_USER[payload.from].ASESORCHATWOOT) {
                    const attachment = []
                    /**
                     * Determinar si el usuario esta enviando una imagen o video o fichero
                     * luego puedes ver los fichero en http://localhost:3001/file.pdf o la extension
                     */
                    if (payload?.body.includes('_event_')) {
                        const mime = payload?.message?.imageMessage?.mimetype ?? payload?.message?.videoMessage?.mimetype ?? payload?.message?.documentMessage?.mimetype;
                        const extension = mimeType.extension(mime);
                        // const buffer = await downloadMediaMessage(payload.message, "buffer", {});
                        // const fileName = `file-${Date.now()}.${extension}`
                        // const pathFile = `${process.cwd()}/public/${fileName}`
                        // await fs.writeFile(pathFile, buffer);
                        // console.log(`[FIECHERO CREADO] http://localhost:3001/${fileName}`)
                        // attachment.push(pathFile)
                    }

                    await handlerMessage({
                        phone: payload.from,
                        name: payload.pushName,
                        message: payload.body,
                        attachment,
                        mode: 'incoming'
                    }, chatwoot)
                // }


            } catch (err) {
                console.log('ERROR', err)
            }
        });

    })

    bot.on('send_message', (payload) => {
        // console.log(`Send Message Payload:`, { answer, from })

        queue.enqueue(async () => {
            // const is_asesor_chatwoot = await state.get('is_asesor_chatwoot');
            if (DATA_USER[payload.from]?.hasOwnProperty('ASESORCHATWOOT') && DATA_USER[payload.from].ASESORCHATWOOT) {
                let messageContent: string;
                if (Array.isArray(payload.answer)) {
                    // Si payload.answer es un array, concatenamos sus elementos en una sola cadena
                    messageContent = payload.answer.join(' '); // Puedes usar otro separador si lo necesitas
                } else {
                    // Si payload.answer es una cadena, simplemente la asignamos
                    messageContent = payload.answer;
                }

                await handlerMessage({
                    phone: payload.from,
                    name: payload.refSerialize,
                    message: messageContent,
                    mode: 'outgoing',
                    attachment: [] // Pasamos un array vacío como valor predeterminado para attachment

                }, chatwoot)
            }

        })
    })


    adapterProvider.server.post('/v1/chatwoot', handleCtx(async (bot, req, res) => {
        req.bot = bot;
        chatwootCtrl(req, res)
    }));


}

main()
