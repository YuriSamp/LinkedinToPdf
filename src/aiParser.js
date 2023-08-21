import * as dotenv from 'dotenv';

dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function parser(text) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-0301',
    messages: [
      {
        role: 'user',
        content: { text },
      },
    ],
    temperature: 0.1,
    max_tokens: 3000,
  });
  return response;
}
