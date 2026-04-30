// app/api/debug-als/route.ts
export const runtime = "nodejs";

import { AsyncLocalStorage } from "async_hooks";

export async function GET() {
  const als = new AsyncLocalStorage();

  let value: any = null;

  als.run({ hello: "world" }, () => {
    value = als.getStore();
  });

  return Response.json({
    store: value,
    hasGetStore: typeof als.getStore === "function",
  });
}
