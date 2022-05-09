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

    const getCurrentTimeEntry = await fetch(`${baseApi}time_entries/current`, headers);
    const jsonCurrentTimeEntry = await getCurrentTimeEntry.json();
    const currentTimeEntry = jsonCurrentTimeEntry.data;

    // will work for now, but should be refactored
    if (!currentTimeEntry) {
      return new Response("Absolutely nothing");
    }

    const getCurrentProject = await fetch(`${baseApi}projects/${currentTimeEntry.pid}`, headers);
    const jsonCurrentProject = await getCurrentProject.json();
    const currentProject = jsonCurrentProject.data;

    // this should definitely be frontend code
    const getCorrectDuration = (duration: number): string => {
      duration = Date.now() / 1000 + duration;
      var duration_h = Math.floor(duration / 3600);
      var duration_m = Math.floor((duration % 3600) / 60);
      var duration_s = Math.floor((duration % 3600) % 60);
      return duration_h + "h " + duration_m + "m " + duration_s + "s";
    }
    const resp = {
        "description": currentTimeEntry.description,
        "project": currentProject.name,
        "duration": currentTimeEntry.duration,
    }

    let resp_string = `${resp.description} - ${resp.project} - ${getCorrectDuration(resp.duration)}`;

    return new Response(resp_string);

};