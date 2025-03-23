import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export abstract class McpServerTool {

  // Называние тула для интеграции
  protected abstract toolName: string;

  // Описание тула для интеграции MCP сервера
  protected abstract toolDescription: string;

  // Дефиниция объекта входных параметров
  protected abstract zodParamDefinition: any;

  // Колбек тула
  protected abstract callback(input: any): Promise<any>;

  registerServerTool(server: McpServer, parametrized: boolean = true) {
    if (parametrized) {
      server.tool(this.toolName, this.toolDescription, this.zodParamDefinition, this.callback.bind(this));
    } else {
      server.tool(this.toolName, this.toolDescription, this.callback.bind(this));
    }
    return server;
  }


}