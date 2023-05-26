import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AiApisService {
  async openAi(prompt: string) {
    const configuration = new Configuration({
      organization: 'org-6SN1pUVpJQY6mZTzi33xIzhl',
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    //These arrays are to maintain the history of the conversation
    const conversationContext = [];
    const currentMessages = [];

    const model = 'gpt-3.5-turbo';
    const promptText = `J'ai une oeuvre d'art que je veux vendre online, je suis cencé de donner une description courte,
        -avec ces mots clés [${prompt}] donne-moi une description (en Français) qui ne dépasse pas 25 mots au max, ne doit donner aucune dimension ou prix ou quoi que ce soit relatif à ces spécifications variables\n\nResponse:`;

    for (const [inputText, responseText] of conversationContext) {
      currentMessages.push({ role: 'user', content: inputText });
      currentMessages.push({ role: 'assistant', content: responseText });
    }
    // Stores the new message
    currentMessages.push({ role: 'user', content: promptText });

    const result = await openai.createChatCompletion({
      model,
      messages: currentMessages,
    });

    const responseText = result.data.choices.shift().message.content;

    return { response: responseText };
  }
}
