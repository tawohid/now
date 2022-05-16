import { Context } from "netlify:edge";

export default async (_request: Request, context: Context) => {

    const apiToken = Deno.env.get("TOGGL_API_TOKEN");
    const baseApi = "https://api.track.toggl.com/api/v8/";

    const headers = {
      "headers": {
        "method": "GET",
        "Authorization": `Basic ${apiToken}`
      }
    };

    let resp = {
      "description": "Nothing",
      "project": "None",
      "duration": 0,
      "color": "0",
    }

    const getCurrentTimeEntry = await fetch(`${baseApi}time_entries/current`, headers);
    const jsonCurrentTimeEntry = await getCurrentTimeEntry.json();
    const currentTimeEntry = jsonCurrentTimeEntry.data;

    if (!currentTimeEntry) {
      return context.json(resp);
    }

    const getCurrentProject = await fetch(`${baseApi}projects/${currentTimeEntry.pid}`, headers);
    const jsonCurrentProject = await getCurrentProject.json();
    const currentProject = jsonCurrentProject.data;
    
    resp = {
        "description": currentTimeEntry.description,
        "project": currentProject.name,
        "duration": currentTimeEntry.duration,
        "color": currentProject.hex_color,
    }

    return context.json(resp);

};