import { Mall, Spot } from "@/types/parking";
import my from "@/public/my.png";
import itec from "@/public/itec.png";
import center from "@/public/vientiane-center.png";
import { initialMqttData } from "@/mqtt/data";

export const initialMalls: Mall[] = [
  {
    id: "my-project",
    image: my,
    name: "My Project",
    icon: "🏠",
    totalSpots: Object.keys(initialMqttData).filter(
      (key) => key.includes("spot") || key.includes("Spot"),
    ).length,
    availableSpots: [
      initialMqttData.spot1,
      initialMqttData.spot2,
      initialMqttData.vipSpot,
    ].filter((s) => s === "available").length,
    vipSpots: Object.keys(initialMqttData).filter(
      (key) => key.includes("vipSpot") || key.includes("VipSpot"),
    ).length,
  },
  {
    id: "itec-mall",
    image: itec,
    name: "ITEC Mall",
    icon: "🏢",
    totalSpots: 3,
    availableSpots: 2,
    vipSpots: 1,
  },
  {
    id: "vientiane-center",
    image: center,
    name: "Vientiane Center",
    icon: "🏬",
    totalSpots: 3,
    availableSpots: 3,
    vipSpots: 1,
  },
];

export const initialSpots: Record<string, Spot[]> = {
  "my-project": [
    { id: 1, type: "normal", status: initialMqttData.spot1, reserved: false },
    { id: 2, type: "normal", status: initialMqttData.spot2, reserved: false },
    { id: 3, type: "vip", status: initialMqttData.vipSpot, reserved: false },
  ],
  "itec-mall": [
    { id: 1, type: "normal", status: "available", reserved: false },
    { id: 2, type: "normal", status: "occupied", reserved: false },
    { id: 3, type: "vip", status: "available", reserved: false },
  ],
  "vientiane-center": [
    { id: 1, type: "normal", status: "available", reserved: false },
    { id: 2, type: "normal", status: "available", reserved: false },
    { id: 3, type: "vip", status: "available", reserved: false },
  ],
};
