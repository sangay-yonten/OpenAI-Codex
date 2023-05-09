import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

// to use .env variables
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// instance of openai
const openai = new OpenAIApi(configuration);
// initialize express application and middlewares
const app = express();
app.use(cors());
app.use(express.json());

// set dummy route
app.get('/', async(req, res) => {
    res.status(200).send({
        message: 'Hello from Codex'
    });
});
app.post('/', async(req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-001",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
});

// server always listens
app.listen(4200, () => console.log('Server is running at http://localhost:4200'))
