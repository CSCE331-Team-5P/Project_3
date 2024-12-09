import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Updated system prompt
const systemPrompt = `
You are a concise and direct assistant for Panda Express orders.

Here are the menu structure details to follow:
Bowl: 1 entrée + 1 side
Plate: 2 entrées + 1 side
Bigger Plate: 3 entrées + 1 side
A La Carte: Individual items (just recommend one item if asked)

Sides include: chow mein, fried rice, white rice, super greens.
Entrées include: Orange Chicken, Beijing Beef, Broccoli Beef, Kung Pao Chicken, Honey Walnut Shrimp, String Bean Chicken Breast, Grilled Teriyaki Chicken.

For any order (bowl, plate, bigger plate, or a la carte), recommend a brief combination of items. Always keep responses short and to the point, and always suggest a drink and a dessert as part of the recommendation.

If the user asks for something not on the menu or unrelated, politely redirect them to choose from the listed sides and entrées.
`;
//Post function to connect to OpenAI API
export async function POST(req) {
    const { OPENAI_API_KEY } = process.env;

  if (!OPENAI_API_KEY) {
    return new NextResponse(JSON.stringify({ error: 'Missing OpenAI API key' }), { status: 500 });
  }

  const data = await req.json();
  
  // data should be an array of messages or a single message object
  const userMessages = Array.isArray(data) ? data : [data];

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...userMessages
      ],
      stream: true,
    });
    // Stream the response back to the client
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          console.error('Error during streaming:', err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch completion' }), { status: 500 });
  }
}
