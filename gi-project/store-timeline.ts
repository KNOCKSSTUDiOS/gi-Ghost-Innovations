import { GiTimelineEvent } from "./schema";

const timeline: GiTimelineEvent[] = [];

export function addTimelineEvent(project_id: string, time: string, event: string) {
  const t: GiTimelineEvent = {
    id: "time-" + Math.random().toString(36).substring(2, 10),
    project_id,
    time,
    event,
    created: Date.now()
  };
  timeline.push(t);
  return t;
}

export function listTimeline(project_id: string) {
  return timeline.filter(t => t.project_id === project_id);
}

