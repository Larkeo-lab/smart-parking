export const BROKER_CONFIG = {
  URL: "ws://10.230.147.50:9001", // ตัวอย่าง IP Broker ของคุณ
};

export interface MqttParkingData {
  spot1: "available" | "occupied";
  spot2: "available" | "occupied";
  vipSpot: "available" | "occupied";
  gateStatus: "open" | "closed";
}

// Topics สำหรับ MQTT
export const MQTT_TOPICS = {
  PARKING_STATUS: "parking/status",
  GATE_CONTROL: "parking/gate/control",
  GATE_STATUS: "parking/gate/status",
};

// ข้อมูลจำลองสำหรับเริ่มต้น (Mock Data)
export const initialMqttData: MqttParkingData = {
  spot1: "available",
  spot2: "occupied",
  vipSpot: "available",
  gateStatus: "closed",
};
