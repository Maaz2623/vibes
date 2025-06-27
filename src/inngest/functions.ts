import { inngest } from "./client";
import { createAgent, gemini, } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert nextjs developer. You write readable, maintanable code. You write simple Next.js & React snippets.",
      model: gemini({
        model: "gemini-2.0-flash-lite",
        apiKey: process.env.GEMINI_API_KEY!
      })
    })

    const { output } = await codeAgent.run(`Write the following snippet: ${event.data.value}`);

    console.log(output);

    return {
      message: output
    }
  },
);
