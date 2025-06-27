import { inngest } from "./client";
import { createAgent, gemini, } from "@inngest/agent-kit";
import {Sandbox} from '@e2b/code-interpreter'
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-nextjs-test-maaz1")
      return sandbox.sandboxId
    })

    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert nextjs developer. You write readable, maintanable code. You write simple Next.js & React snippets.",
      model: gemini({
        model: "gemini-2.0-flash-lite",
        apiKey: process.env.GEMINI_API_KEY!
      })
    })

    const { output } = await codeAgent.run(`Write the following snippet: ${event.data.value}`);

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId)
      const host = sandbox.getHost(3000)

      return `https://${host}`

    })

    return {
      output,
      sandboxUrl
    }
  },
);
