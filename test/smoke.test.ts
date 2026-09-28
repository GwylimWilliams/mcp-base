import { expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { createServer } from "../src/server.js";

it("completes the handshake and lists zero tools", async () => {
  const server = createServer();
  const client = new Client({ name: "smoke", version: "0.1.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await Promise.all([
    server.connect(serverTransport),
    client.connect(clientTransport),
  ]);

  const { tools } = await client.listTools();
  expect(tools).toEqual([]);

  await client.close();
  await server.close();
});
