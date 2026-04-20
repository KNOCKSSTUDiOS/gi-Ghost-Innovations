import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { api } from "../api/client";

export default function ProjectListScreen({ route, navigation }) {
  const { user_id } = route.params;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api(`/projects/list?user_id=${user_id}`).then(setProjects);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Projects</Text>
      {projects.map(p => (
        <Button
          key={p.id}
          title={p.name}
          onPress={() => navigation.navigate("Scenes", { project: p })}
        />
      ))}
    </View>
  );
}

