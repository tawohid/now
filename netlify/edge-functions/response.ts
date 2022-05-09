import { Context } from "netlify:edge";

export default async (_request: Request, context: Context) => {

  const apiToken = Deno.env.get("TOGGL_API_TOKEN");

  const response = await fetch("https://api.track.toggl.com/api/v8/time_entries/current", {
    "headers": {
      "Authorization": `Basic ${apiToken}`
    }
  });
  
  const jsonData = await response.json();
  return context.json(jsonData.data);

};