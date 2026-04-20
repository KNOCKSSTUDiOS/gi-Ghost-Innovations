import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { api } from "../api/client";

export default function TimelineScreen({ route }) {
  const { project } = route.params;
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    api(`/projects/${project.id}/timeline`).then(setTimeline);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Timeline</Text>

      {timeline.map(t => (
        <Text key={t.id}>
          {t.time} — {t.event}
        </Text>
      ))}

      <Button
        title="+ AI Event"
        onPress={() =>
          api("/ai/timeline", "POST", {
            user_id: project.user_id,
            project_id: project.id,
            prompt: "New event"
          }).then(out => alert(out.output))
        }
      />
    </View>
  );
}

