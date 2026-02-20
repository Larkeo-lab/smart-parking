import mqtt, { MqttClient } from "mqtt";
import { useEffect, useState, useCallback } from "react";
import { BROKER_CONFIG, MQTT_TOPICS, MqttParkingData } from "./data";

export const useMqtt = (mallId: string) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [mqttData, setMqttData] = useState<MqttParkingData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isBoardConnected, setIsBoardConnected] = useState(false);

  console.log("mqttData", mqttData);
  console.log("isConnected", isConnected);
  console.log("isBoardConnected", isBoardConnected);

  useEffect(() => {
    const mqttClient = mqtt.connect(BROKER_CONFIG.URL);

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT Broker");
      setIsConnected(true);
      mqttClient.subscribe(MQTT_TOPICS.PARKING_STATUS);
      mqttClient.subscribe(MQTT_TOPICS.GATE_STATUS);
      mqttClient.subscribe(MQTT_TOPICS.BOARD_STATUS);
      setClient(mqttClient);
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT Connection Error:", err);
      setIsConnected(false);
    });

    mqttClient.on("message", (topic, message) => {
      const payload = message.toString();

      if (topic === MQTT_TOPICS.PARKING_STATUS) {
        try {
          const data: MqttParkingData = JSON.parse(payload);
          setMqttData(data);
        } catch (e) {
          console.error("Error parsing MQTT parking data", e);
        }
      }

      if (topic === MQTT_TOPICS.GATE_STATUS) {
        setMqttData((prev) =>
          prev ? { ...prev, gateStatus: payload as any } : null,
        );
      }

      if (topic === MQTT_TOPICS.BOARD_STATUS) {
        setIsBoardConnected(payload === "online");
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const publishGateCommand = useCallback(
    (command: "open" | "close") => {
      if (client && isConnected) {
        console.log("MQTT client connected, publishing");
        client.publish(MQTT_TOPICS.GATE_CONTROL, command);
        console.log(`MQTT Publish: ${MQTT_TOPICS.GATE_CONTROL} -> ${command}`);
      } else {
        console.warn("MQTT client not connected, cannot publish");
      }
    },
    [client, isConnected],
  );

  return { mqttData, isConnected, isBoardConnected, publishGateCommand };
};
