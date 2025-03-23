import { McpServerTool } from "../base/mcpintegration.js";
const API_KEY = 'fca_live_qhR9zOUpSxBpE3QakeWrht4np2wAFJBQT8h2Iixm';
const ENDPOINT = 'https://api.freecurrencyapi.com/v1/latest';
export class FreeCurrencyApiTool extends McpServerTool {
    toolName;
    toolDescription;
    zodParamDefinition;
    constructor() {
        super();
        this.toolName = "get-currency-rate";
        this.toolDescription = "Get the current dollar exchange rate";
        this.zodParamDefinition = {};
    }
    formatError(error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Could not fetch dollar currency!\n${error.toString()}`,
                },
            ],
        };
    }
    formatData(data) {
        let currenciesText = "";
        for (let currency in data.data) {
            const key = currency;
            const mappings = new Map(Object.entries(data.data));
            currenciesText += `${currency}: ${mappings.get(key)}\n`;
        }
        return {
            content: [
                {
                    type: "text",
                    text: `Here are the USD exchange rates:\n${currenciesText}`
                }
            ]
        };
    }
    async callback() {
        try {
            // Making the GET request
            const response = await fetch(`${ENDPOINT}?apikey=${API_KEY}`);
            // Check if the response was successful (status code 200-299)
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            // Parse the JSON response
            const data = await response.json();
            return this.formatData(data);
        }
        catch (error) {
            return this.formatError(error);
        }
    }
}
