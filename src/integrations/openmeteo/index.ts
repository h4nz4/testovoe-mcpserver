import { McpServerTool } from "../base/mcpintegration.js";
import { fetchWeatherApi } from 'openmeteo';
import { z } from 'zod';


const ENDPOINT = 'https://api.open-meteo.com/v1/forecast';

export class OpenMeteoTool extends McpServerTool {
  toolName: string;
  toolDescription: string;
  zodParamDefinition: any;

  constructor() {
    super();
    this.toolName = "get-weather";
    this.toolDescription = "Get the weather forecast for given location";
    this.zodParamDefinition = {
      latitude: z.number().describe("Latitude of location to get weather forecast of"),
      longitude: z.number().describe("Longitude of location to get weather forecast of")
    };
  }

  protected async callback(params: {latitude: number, longitude: number}): Promise<any> {
    try {

      const responses = await fetchWeatherApi(ENDPOINT, {
        latitude: params.latitude,
        longitude: params.longitude,
        hourly: "temperature_2m"
      });

        // Helper function to form time ranges
        const range = (start: number, stop: number, step: number) =>
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();


        const hourly = response.hourly()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
          },

        };

        let outputString = `The weather forecast is as follows: `;

        // `weatherData` now contains a simple structure with arrays for datetime and weather data
        for (let i = 0; i < weatherData.hourly.time.length; i++) {
          outputString += `${weatherData.hourly.time[i].toISOString()}: ${weatherData.hourly.temperature2m[i]}`;
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