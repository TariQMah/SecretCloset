import fp from 'fastify-plugin'
import fs from 'fs'
import util from 'util'
import path from 'path'
import { pipeline } from 'stream'


const __dirname = path.resolve();
const pump = util.promisify(pipeline)


function utilities(fastify, options, done) {
    fastify.decorate("formatDateToYYYYMMDD", date => {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`

    })




    // Get the current date
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');



    const uploadDir = path.join(__dirname, 'src', 'uploads', `${year}`, `${month}`);

    async function ensureUploadDir() {
        try {
            await fs.mkdir(uploadDir, { recursive: true }, (err) => err && console.error("err", err));
        } catch (error) {
            console.log('error: ', error);
            if (error && error.code === 'EEXIST') {
                console.log(`Upload directory already exists at ${uploadDir}`);
            } else {
                console.error(`Error creating upload directory: ${error.message}`);
            }
        }
    }


    fastify.decorate("uploadFilesTodirectory", async (files) => {
        console.log('files: ', files);

        try {
            await ensureUploadDir();

            const fileUrls = [];

            for await (const part of files) {


                const timestamp = new Date().getTime(); // Get a unique timestamp
                const filename = `${timestamp}_${part.filename}`;
                const filePath = path.join(uploadDir, filename);

                await pump(part.file, fs.createWriteStream(filePath));
                console.log(`File uploaded to: ${filePath}`);

                // Construct the URL for the uploaded file
                const fileUrl = `${options.baseUrl}/${year}/${month}/${filename}`;
                fileUrls.push(fileUrl);
            }

            // Add the file URLs to the request for further processing
            return fileUrls;

            // Continue processing the request
            // reply.send();
        } catch (error) {
            console.error('Error uploading files:', error);
            return ('Internal Server Error');
        }

    })




    done()
}

export default fp(utilities)
