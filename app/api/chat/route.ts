// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge"; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat
export async function POST(request: Request) {
  const { messages } = await request.json(); // { messages: [] }
  let response;

  // messages [{ user and he says "hello there" }]
  // console.log(messages[messages.length-1]);

  // GPT-4 system message
  // system message tells GPT-4 how to act
  // it should always be at the front of your array

  // createChatCompletion (get response from GPT-4)
  if (
    messages[messages.length - 1].role === "user" &&
    messages[messages.length - 1].content.includes("rock")
  ) {
    // change this to decide when to trigger the rock
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "assistant",
          content:
            "You are a rock living on the river in Tainan, Taiwan. You are a facilitator and promote good activities for keeping good health of the river. Start each message with, 'As a rock'.",
        },
        ...messages,
      ],
    });
  } else {
    response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a river called Tsen-wen River in Tainan, Taiwan. Tell your story to the user and share your world perspective to them. Be a storyteller, be engaing and kind. Be concise, and tell the story greadually. Keep each conversation within 3, 4 scentences only.",
        },
        ...messages,
      ],
    });
  }

  // create a stream of data from OpenAI (stream data to the frontend)
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client / frontend
  return new StreamingTextResponse(stream);
}
