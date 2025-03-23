import { McpServerTool } from "../base/mcpintegration.js";
import { fetchWeatherApi } from 'openmeteo';
import { z } from 'zod';
import { NewsFeedResponse } from "./types.js";


const API_KEY = '2c1341e92e8c4f13af76d13358064c68';
const ENDPOINT = 'https://newsapi.org/v2/top-headlines';

export class NewsApiTool extends McpServerTool {
  toolName: string;
  toolDescription: string;
  zodParamDefinition: any;

  constructor() {
    super();
    this.toolName = "get-news";
    this.toolDescription = "Get the news feed for last week";
    this.zodParamDefinition = {};
  }

  protected async callback(params: {latitude: number, longitude: number}): Promise<any> {
    try {

      let outputString = 'Here are the latest news:\n';

      const response = await fetch(`${ENDPOINT}?apiKey=${API_KEY}&country=us&pageSize=100`);

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data: NewsFeedResponse = await response.json();

      for (const article of data.articles) {
        outputString += `Date: ${article.publishedAt}\nAuthor: ${article.author}\nTitle: ${article.title}\nContent: ${article.content}\n`;
      }

      return {
        content: [
          {
            type: "text",
            text: outputString,
          },
        ],
      };


    } catch (error: unknown) {
      return {
        content: [
          {
            type: "text",
            text: `${(error as Error).toString()}`,
          },
        ],
      };
    }
  }

}