export class McpServerTool {
    registerServerTool(server, parametrized = true) {
        if (parametrized) {
            server.tool(this.toolName, this.toolDescription, this.zodParamDefinition, this.callback.bind(this));
        }
        else {
            server.tool(this.toolName, this.toolDescription, this.callback.bind(this));
        }
        return server;
    }
}
