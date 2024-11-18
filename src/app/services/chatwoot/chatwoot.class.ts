import { readFile } from 'fs/promises';
import https from 'https';
import fs from 'fs';
import FormData from "form-data";
import {
    Contact,
    Conversation,
    AttributeDefinition,
    MediaData,
} from "../../types/index";
import { AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface Config {
    account?: string;
    token?: string;
    endpoint?: string;
}

class ChatwootClass {

    config: Config = {};

    /**
     * Recibir todos los parametro de configuracio de conexion con chatwoot
     */
    constructor(_config: Config = {}) {

        if (!_config?.account) {
            throw new Error('ACCOUNT_ERROR')
        }

        if (!_config?.token) {
            throw new Error(`TOKEN_ERROR`)
        }

        if (!_config?.endpoint) {
            throw new Error(`ENDPOINT_ERROR`)
        }

        this.config = _config

    }

    /**
     * [utility]
     * Formateo del formato del numero +34 34
     * @param {*} number 
     * @returns 
     */
    formatNumber = (number: any) => {
        if (!number.startsWith("+")) {
            return `+${number}`
        }
        return number

    }

    formatNumber2 = (number: any) => {
        // if (!number.startsWith("+")) {
        //     return `+${number}`
        // }
        // return number

        if (number.startsWith("+")) {
            return number.slice(1); // Elimina el primer caracter (el "+")
        }
        return number;
    }

    /**
     * [utility]
     * Esta funciona nos ayuda a crear un encabezado con la authorization del token
     * @returns 
     */


    buildHeader = (): HeadersInit => {
        const headers: HeadersInit = new Headers();
        headers.append('api_access_token', this.config.token!);
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    /**
     * [utility]
     * Esto nos ayuda a construir un url base 
     * @param {*} path 
     * @returns 
     */
    buildBaseUrl = (path: string): string => {
        console.log('Base URL');
        console.log(`${this.config.endpoint}/api/v1/accounts/${this.config.account}${path}`);


        return `${this.config.endpoint}/api/v1/accounts/${this.config.account}${path}`;
    }

    /**
     * [CONTACT]
     * https://www.chatwoot.com/developers/api/#tag/Contacts/operation/contactSearch
     * https://chatwoot-production-e265.up.railway.app/api/v1/accounts/1/contacts/search?q=+359987499
     * @param {*} from numero de telefono 
     * @returns [] array
     */
    findContact = async (from: any) => {
        try {
            const url = this.buildBaseUrl(`/contacts/search?q=+${from}`)

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'GET',
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            const data = await dataFetch.json()
            return data.payload[0]

        } catch (error) {
            console.error(`[Error searchByNumber]`, error)
            return []
        }
    }

    /**
     * [CONTACT]
     *  Crear un contacto
     * @param {*} dataIn 
     * @returns 
     */
    createContact = async (dataIn: any = { from: '', name: '', inbox: '' }) => {
        try {

            dataIn.from = this.formatNumber(dataIn.from)

            const data = {
                inbox_id: dataIn.inbox,
                name: dataIn.name,
                phone_number: dataIn.from,
            };

            const url = this.buildBaseUrl(`/contacts`)

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'POST',
                body: JSON.stringify(data),
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            const response = await dataFetch.json()
            return response.payload.contact

        } catch (error) {
            console.error(`[Error createContact]`, error)
            return
        }
    }

    /** 
     * [CONTACT]
     * Buscar o crear contacto
     * @param {*} dataIn 
     * @returns 
     */
    findOrCreateContact = async (dataIn: any = { from: '', name: '', inbox: '' }) => {
        try {
            // dataIn.from = this.formatNumber(dataIn.from)
            const getContact = await this.findContact(dataIn.from)

            if (!getContact) {
                console.log('Contacto no econtrado, se va a crear');
                const contact = await this.createContact(dataIn)
                return contact
            }

            return getContact

        } catch (error) {
            console.error(`[Error findOrCreateContact]`, error)
            return
        }
    }

    findOrCreateAttributeContact = async (dataIn: any = { from: '', contact_id: '' }) => {
        try {

            const getAttributes = await this.findAttributesContact(dataIn.from);
            if (!getAttributes) {
                const result = await this.createAttributesContact(
                    dataIn.contact_id,
                    "is_active_chatbot",
                    "OFF"
                );
                if (result) {
                    console.log("Atributo actualizado con éxito.");
                }
            }

            return true;

        } catch (error) {
            console.error(`[Error findOrCreateAttribute]`, error)
            return
        }
    }

    findOrCreateAttributeConversation = async (dataIn: any = { from: '', contact_id: '' }) => {
        try {

            const getAttributes = await this.findAttributesConversation(dataIn.from);
            if (!getAttributes) {
                console.log('Creando atributo de conversacion');
                
                const result = await this.createAttributesConversation(
                    "is_active_chatbot"
                );
                if (result) {
                    console.log("Atributo de conversación actualizado con éxito.");
                }
            }
            console.log('atributo de conversacion ya existe');
            return true;

        } catch (error) {
            console.error(`[Error findOrCreateAttribute]`, error)
            return
        }
    }


    /**
     * [CONVERSATION]
     * Importante crear este atributo personalizado en el chatwoot
     * Crear conversacion
     * @param {*} dataIn 
     * @returns 
     */
    createConversation = async (dataIn: any = { inbox_id: '', contact_id: '', phone_number: '' }) => {
        try {

            dataIn.phone_number = this.formatNumber2(dataIn.phone_number)

            const payload = {
                custom_attributes: { phone_number: dataIn.phone_number, inbox_id: dataIn.inbox_id },
            };

            const url = this.buildBaseUrl(`/conversations`)
            const dataFetch = await fetch(url,
                {
                    method: "POST",
                    headers: this.buildHeader(),
                    body: JSON.stringify({ ...dataIn, ...payload }),
                    // Desactivar la verificación del certificado SSL
                    // @ts-ignore
                    agent: new https.Agent({ rejectUnauthorized: false })
                }
            );
            const data = await dataFetch.json();
            return data.id
        } catch (error) {
            console.error(`[Error createConversation]`, error)
            return
        }
    }

    /**
     * [CONVERSATION]
     * Buscar si existe una conversacion previa
     * @param {*} dataIn 
     * @returns 
     */
    findConversation = async (dataIn: any = { phone_number: '', contact_id: '', inbox_id: '' }) => {
        // METHOD 1
        // try {
        //     dataIn.phone_number = this.formatNumber2(dataIn.phone_number)

        //     const url = this.buildBaseUrl(`/contacts/${dataIn.contact_id}/conversations`)

        //     const dataFetch = await fetch(url,
        //         {
        //             method: "GET",
        //             headers: this.buildHeader(),
        //             // Desactivar la verificación del certificado SSL
        //             // @ts-ignore
        //             agent: new https.Agent({ rejectUnauthorized: false })
        //         }
        //     );


        //     const data = await dataFetch.json();
        //     // console.log(data);
        //     return data.payload
        // } catch (error) {
        //     console.error(`[Error findConversation]`, error)
        //     return
        // }


        // METHOD 2
        try {
            // dataIn.phone_number = this.formatNumber2(dataIn.phone_number)

            const payload = [
                {
                    attribute_key: "phone_number",
                    attribute_model: "standard",
                    filter_operator: "equal_to",
                    values: [dataIn.phone_number],
                    custom_attribute_type: "",
                    query_operator: "AND"
                },
                {
                    attribute_key: "inbox_id",
                    attribute_model: "standard",
                    filter_operator: "equal_to",
                    values: [dataIn.inbox_id],
                    custom_attribute_type: "",
                    query_operator: null,

                },
            ];

            // const url = this.buildBaseUrl(`/conversations/filter`)
            // const dataFetch = await fetch(url,
            //     {
            //         method: "POST",
            //         headers: this.buildHeader(),
            //         body: JSON.stringify({ payload }),
            //     }
            // );

            // const data = await dataFetch.json();
            // // console.log(data);
            // return data.payload

            const url = this.buildBaseUrl(`/contacts/${dataIn.contact_id}/conversations`)

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'GET',
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            const data = await dataFetch.json();
            const conversation = data.payload.find(
                (c) => c.inbox_id == (dataIn.inbox_id as number)
            );

            const conversationId = conversation?.messages?.[0]?.conversation_id;

            return conversationId || null;

        } catch (error) {
            console.error(`[Error findConversation]`, error)
            return
        }
    }

    /**
     * [CONVERSATION]
     * Buscar o Crear conversacion
     * @param {*} dataIn 
     * @returns 
     */
    findOrCreateConversation = async (dataIn: any = { inbox_id: '', contact_id: '', phone_number: '' }) => {
        try {
            // dataIn.phone_number = this.formatNumber(dataIn.phone_number)
            const getId = await this.findConversation(dataIn)
            if (!getId) {
                const conversationId = await this.createConversation(dataIn)
                return conversationId
            }

            return getId
        } catch (error) {
            console.error(`[Error findOrCreateInbox]`, error)
            return
        }
    }

    /**
     * Esta funcion ha sido modificada para poder enviar archivos multimedia y texto
     * [messages]
     * @param {mode}  "incoming" | "outgoing"
     * @param {*} dataIn 
     * @returns 
     */
    createMessage = async (dataIn: any = { msg: '', mode: '', conversation_id: '', attachment: [] }) => {
        try {
            const url = this.buildBaseUrl(`/conversations/${dataIn.conversation_id}/messages`)
            const form = new FormData();

            form.append("content", dataIn.msg);
            form.append("message_type", dataIn.mode);
            form.append("private", "true");

            // if (dataIn.attachment?.length) {
            //     const fileName = `${dataIn.attachment[0]}`.split('/').pop()
            //     const blob = new Blob([await readFile(dataIn.attachment[0])]);

            //     form.append("attachments[]", blob, fileName);
            //     form.append("content", "Adjunto...");
            //     form.append("file_type", "image");
            // }


            const myHeaders = new Headers();
            myHeaders.append("api_access_token", this.config.token);


            const response = await axios.post(url, form, {
                headers: {
                    'api_access_token': this.config.token,
                },
            });

            return response.data

            // const dataFetch = await fetch(url,
            //     {
            //         method: "POST",
            //         headers: myHeaders,
            //         body: form,
            //         // Desactivar la verificación del certificado SSL
            //         // @ts-ignore
            //         agent: new https.Agent({ rejectUnauthorized: false })
            //     }
            // );

            // const data = await dataFetch.json();
            // return data
        } catch (error) {
            console.error(`[Error createMessage]`, error)
            return
        }
    }

    handleMediaData = async (MediaData: MediaData, form: FormData, botInstance: any) => {
        try {
            for (const typeKey in MediaData.message) {
                const mediaType = MediaData.message[typeKey];
                if (!mediaType || !mediaType.mimetype) {
                    continue;
                }
                const { caption, mimetype, filename } = mediaType;

                const filePath = await botInstance.provider.saveFile(MediaData);
                const safeFilename = filename || `file.${mimetype.split("/")[1]}`;
                if (fs.existsSync(filePath)) {
                    const stream = await fs.createReadStream(filePath);
                    form.append("attachments[]", stream, {
                        filename: safeFilename,
                        contentType: mimetype,
                    });

                    if (caption) {
                        form.append("content", caption);
                    }
                } else {
                    console.error("File does not exist:", filePath);
                }
            }
        } catch (error) {
            console.error("Error handling media data:", error);
        }
    }

    async downloadMedia(mediaUrl: string): Promise<any> {
        try {
            const response = await axios.get(mediaUrl, {
                responseType: "stream",
            });
            return {
                data: response.data,
                contentType: response.headers["content-type"],
            };


        } catch (error) {
            console.error("Error downloading media:", error);
            return null; // O maneja el error de otra manera
        }
    }

    private extractFileName(url: string, contentType: string): string {
        // Extracts a file name from the URL or creates a generic one based on content type
        const urlParts = url.split("/");
        const lastSegment = urlParts[urlParts.length - 1];
        if (lastSegment && lastSegment.includes(".")) {
            return lastSegment; // Use the original file name if present
        } else {
            // Create a generic file name if URL does not include one
            const extension = contentType.split("/")[1] || "bin"; // Default to 'bin' if no extension is detectable
            return `file.${extension}`;
        }
    }

    handleURLMedia = async (url: string, form: FormData) => {
        try {
            if (url.includes("http://") || url.includes("https://")) {
                const { data, contentType } = await this.downloadMedia(url);
                const fileName = this.extractFileName(url, contentType);
                form.append("attachments[]", data, {
                    filename: fileName,
                });
            } else if (fs.existsSync(url)) {
                const fileName = url.substring(url.lastIndexOf("/"));
                const stream = fs.createReadStream(url);
                form.append("attachments[]", stream, {
                    filename: fileName,
                });
            } else {
                console.warn(
                    "The URL does not start with http or https and is not a valid file path:",
                    url
                );
            }
        } catch (error) {
            console.error("Error handling URL media:", error);
        }
    }

    createMessageAttachment = async (dataIn: any = { msg: '', name: '', mode: '', conversation_id: '', mediaData: null, media: null, botInstance: null }) => {
        try {
            const url = this.buildBaseUrl(`/conversations/${dataIn.conversation_id}/messages`)
            const form = new FormData();

            if (dataIn.msg) {
                form.append("content", dataIn.msg);
            }

            if (dataIn.mediaData) {
                await this.handleMediaData(dataIn.mediaData, form, dataIn.botInstance);
            }

            if (dataIn.media) {
                await this.handleURLMedia(dataIn.media, form);
            }

            form.append("message_type", dataIn.mode);
            form.append("private", "true");

            if (dataIn.name) form.append("name", dataIn.name);

            // const myHeaders = new Headers();
            // myHeaders.append("api_access_token", this.config.token);

            const response = await axios.post(url, form, {
                headers: {
                    ...form.getHeaders(),
                    'api_access_token': this.config.token,
                    'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido adecuado para FormData
                },
            });

            return response.data

        } catch (error) {
            console.error(`[Error createMessageAttachment]`, error)
            return
        }
    }

    /**
     * [inboxes]
     * Crear un inbox si no existe
     * @param {*} dataIn 
     * @returns 
     */
    createInbox = async (dataIn: any = { name: '' }) => {
        try {
            const payload = {
                name: dataIn.name,
                channel: {
                    type: "api",
                    webhook_url: "",
                },
            };

            const url = this.buildBaseUrl(`/inboxes`)
            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'POST',
                body: JSON.stringify(payload),
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            const data = await dataFetch.json();
            return data;

        } catch (error) {
            console.error(`[Error createInbox]`, error)
            return
        }
    }

    /**
     * [inboxes]
     * Buscar si existe un inbox creado
     * @param {*} dataIn 
     * @returns 
     */
    findInbox = async (dataIn: any = { name: '' }) => {
        try {

            const url = this.buildBaseUrl(`/inboxes`)
            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'GET',
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            const data = await dataFetch.json();
            const payload = data.payload

            const checkIfExist = payload.find((o) => o.name === dataIn.name)

            if (!checkIfExist) {
                return
            }

            return checkIfExist;
        } catch (error) {
            console.error(`[Error findInbox]`, error)
            return
        }
    }

    /**
     * [inboxes]
     * Buscar o crear inbox
     * @param {*} dataIn 
     * @returns 
     */
    findOrCreateInbox = async (dataIn: any = { name: '' }) => {
        try {
            const getInbox = await this.findInbox(dataIn)
            if (!getInbox) {
                const idInbox = await this.createInbox(dataIn)
                return idInbox
            }
            return getInbox

        } catch (error) {
            console.error(`[Error findOrCreateInbox]`, error)
            return
        }
    }

    findAttributesContact = async (from: any) => {
        try {
            const url = this.buildBaseUrl(`/contacts/search?q=+${from}`)

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'GET',
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            const data = await dataFetch.json()
            // return data.payload[0]

            const contact = data.payload[0];
            // Verificamos si existe custom_attributes y is_active_chatbot
            if (!contact.custom_attributes || !contact.custom_attributes.is_active_chatbot) {
                return false;
            }

            return true;

        } catch (error) {
            console.error(`[Error findAttributes]`, error)
            return []
        }
    }

    createAttributesContact = async (contactID: string, field: string, attributes: any): Promise<boolean> => {
        try {
            const data = {
                custom_attributes: {
                    [field]: attributes
                }
            };

            const url = this.buildBaseUrl(`/contacts/${contactID}`)

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'PUT',
                body: JSON.stringify(data),
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            return true;

        } catch (error) {
            console.error(`[Error createContact]`, error)
            return
        }
    }

    findAttributesConversation = async (from: any) => {
        try {
            const url = this.buildBaseUrl(`/custom_attribute_definitions`)
            const targetAttributeKey = "is_active_chatbot";

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'GET',
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            const data = await dataFetch.json()
            // return data.payload[0]

            if (data && data.length > 0) {
                for (const attribute of data) {
                    if (attribute.attribute_key === targetAttributeKey) {
                        return true;
                    }
                }
            }

            return false;

        } catch (error) {
            console.error(`[Error findAttributes]`, error)
            return []
        }
    }

    createAttributesConversation = async ( field: string): Promise<boolean> => {
        try {
            const data = {
                attribute_display_name: "Funciones del ChatBot", // Nombre visible del atributo.
                attribute_display_type: 6, // Tipo de visualización: Lista.
                attribute_description: "Desactiva el chatbot a un cliente", // Descripción del atributo.
                attribute_key: field, // Clave única para el atributo.
                attribute_values: ["ON", "OFF"], // Posibles valores para el atributo.
                //attribute_model: 1, // Tipo de modelo: Contacto.
            };

            const url = this.buildBaseUrl(`/custom_attribute_definitions`)

            const dataFetch = await fetch(url, {
                headers: this.buildHeader(),
                method: 'POST',
                body: JSON.stringify(data),
                // Desactivar la verificación del certificado SSL
                // @ts-ignore
                agent: new https.Agent({ rejectUnauthorized: false })
            })

            return true;

        } catch (error) {
            console.error(`[Error createContact]`, error)
            return
        }
    }

}


export default ChatwootClass