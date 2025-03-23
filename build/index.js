import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { FreeCurrencyApiTool } from "./integrations/freecurrencyapi/index.js";
import { OpenMeteoTool } from "./integrations/openmeteo/index.js";
import { NewsApiTool } from "./integrations/newsapi/index.js";
// Create server instance
const server = new McpServer({
    name: "interview",
    version: "1.0.0",
});
const currencyTool = new FreeCurrencyApiTool();
const weatherTool = new OpenMeteoTool();
const newsTool = new NewsApiTool();
currencyTool.registerServerTool(server);
weatherTool.registerServerTool(server);
newsTool.registerServerTool(server);
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
