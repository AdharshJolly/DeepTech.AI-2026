export interface OfficialAgendaItem {
  order: number;
  time: string;
  title: string;
  description?: string;
  track?: string;
  speakerName?: string;
  type:
    | "keynote"
    | "panel"
    | "workshop"
    | "networking"
    | "break"
    | "talk"
    | "spotlight"
    | "activity"
    | "closing";
}

export const OFFICIAL_AGENDA_DATA: OfficialAgendaItem[] = [
  {
    order: 1,
    time: "08:30 AM - 10:00 AM",
    title: "Opening Keynote: The Dawn of Physical AI",
    description:
      "Bridging Foundation Models, World Models, and Spatial Computing",
    type: "keynote",
  },
  {
    order: 2,
    time: "10:00 AM - 10:30 AM",
    title: "From Models to Motion",
    description:
      "• Bridging LLMs/World Models with physical kinematics\n• Code, simulators (NVIDIA Isaac, Gazebo), and entry pathways",
    type: "workshop",
  },
  {
    order: 3,
    time: "10:30 AM - 11:00 AM",
    title: "Physical AI in Industrial Automation",
    description: "",
    type: "talk",
  },
  {
    order: 4,
    time: "11:00 AM - 11:30 AM",
    title: "Physical AI in Healthcare & Surgical Robotics",
    description: "",
    type: "talk",
  },
  {
    order: 5,
    time: "11:30 AM - 12:15 PM",
    title: "Panel 1 : Architecture & Hardware for Embodied AI",
    description:
      "• Edge compute, sensor fusion, LiDAR & real-time control loops\n• Technical bottlenecks and core skill sets needed in R&D",
    type: "panel",
  },
  {
    order: 6,
    time: "12:15 PM - 12:30 PM",
    title: "Networking",
    description: "",
    track: "Lounge, Photo Booth",
    type: "networking",
  },
  {
    order: 7,
    time: "12:30 PM - 01:00 PM",
    title: "LUNCH",
    description: "",
    track: "Dining Area",
    type: "break",
  },
  {
    order: 8,
    time: "01:00 PM - 01:30 PM",
    title: "Games with Prizes",
    description: "",
    type: "activity",
  },
  {
    order: 9,
    time: "02:00 PM - 02:45 PM",
    title: "Panel 2: Deploying Physical AI – From Lab to Real-World Scale",
    description:
      "• Overcoming Safety, Reliability, and Edge Fail-Safes\n• Business Case, Scaling Infrastructure, and Hardware Unit Economics\n• Workforce Integration, Safety Standards, and Regulatory Frameworks",
    type: "panel",
  },
  {
    order: 10,
    time: "02:45 PM - 03:15 PM",
    title: "Enterprise perspective on physical AI deployment at scale",
    description: "Enterprise perspective on physical AI deployment at scale",
    type: "talk",
  },
  {
    order: 11,
    time: "03:15 PM - 03:30 PM",
    title: "Networking , Tea break",
    description: "",
    track: "Lounge, Photo Booth",
    type: "break",
  },
  {
    order: 12,
    time: "03:30 PM - 04:00 PM",
    title: "Career Pathways in Deep Tech & Physical AI",
    description:
      "• Transitioning from software/hardware engineering to Physical AI\n• Research vs. Industry roles, higher studies, and startup founding",
    type: "workshop",
  },
  {
    order: 13,
    time: "04:00 PM - 04:30 PM",
    title:
      "Agentic Control in Embedded Systems OR Combining LLM Reasoners with Low-Latency Motion Planning",
    description: "",
    type: "talk",
  },
  {
    order: 14,
    time: "04:30 PM - 05:00 PM",
    title: "Founders & Researchers Spotlight: Frontier Innovations",
    description:
      "Highlighting Breakthrough Startups in Embodied & Physical AI",
    type: "spotlight",
  },
  {
    order: 15,
    time: "05:00 PM - 05:15 PM",
    title: "Closing Remarks & Future Outlook",
    description:
      "Building the Next Generation of Physical AI Engineers & IEEE Roadmap",
    type: "closing",
  },
];
