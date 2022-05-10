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
      "durationH": 0,
      "durationM": 0,
      "durationS": 0,
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

    const duration = Date.now() / 1000 + currentTimeEntry.duration;
    const durationH = Math.floor(duration / 3600);
    const durationM = Math.floor((duration % 3600) / 60);
    const durationS = Math.floor((duration % 3600) % 60);
    
    resp = {
        "description": currentTimeEntry.description,
        "project": currentProject.name,
        "durationH": durationH,
        "durationM": durationM,
        "durationS": durationS,
    }

    return context.json(resp);

};