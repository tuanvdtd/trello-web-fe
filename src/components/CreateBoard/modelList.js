import Kanban from "~/assets/modelBoard/kanban.png";
import Scrum from "~/assets/modelBoard/scrum.png";
import Extreme from "~/assets/modelBoard/extreme.png";
import Kanban1 from "~/assets/modelBoard/kanban1.png";
import Kanban2 from "~/assets/modelBoard/kanban2.png";
import Scrum1 from "~/assets/modelBoard/scrum1.svg";
import Scrum2 from "~/assets/modelBoard/scrum2.png";
import Extreme1 from "~/assets/modelBoard/extreme1.png";
import Extreme2 from "~/assets/modelBoard/extreme2.png";
import Custom from "~/assets/modelBoard/custom.png";
import { TEMPLATE_TYPES } from "~/utils/constants";

const modelList = [
  {
    id: 1,
    name: TEMPLATE_TYPES.KANBAN,
    icon: Kanban,
    description:
      "Kanban is all about helping teams visualize their work, limit work currently in progress, and maximize efficiency. Use the Kanban template to increase planning flexibility, reduce bottlenecks and promote transparency throughout the development cycle.",
    inform1: "Track work using a simple board",
    description1:
      "The Kanban model is a visual workflow method that organizes tasks into columns to enhance productivity and track progress efficiently.",
    image1: Kanban1,
    inform2: "Use the board to limit work in progress",
    image2: Kanban2,
    workflow: ['Backlog','To do', 'In Progress','Review' ,'Done'],
   
    recommend: [
      "Teams that control work volume from a backlog",
      "DevOps teams that want to connect work across their tools",
    ],
  },
  {
    id: 2,
    name: TEMPLATE_TYPES.SCRUM,
    icon: Scrum,
    description:
      "The Scrum template helps teams work together using sprints to break down large, complex projects into bite-sized pieces of value. Encourage your team to learn through incremental delivery, self-organize while working on a problem, and regularly reflect on their wins and losses to continuously improve.",
    inform1: "Plan upcoming work in a backlog",
    description1:
      "Scrum is an agile framework for managing complex projects, focusing on iterative progress, collaboration, and continuous improvement.",
    inform2: "Organize cycles of work into sprints",
    image1: Scrum1,
    image2: Scrum2,
    workflow: ["To do", "In progress", " Done"],
    recommend: [
      "Teams that deliver work on a regular cadence",
      "DevOps teams that want to connect work across their tools",
    ],
  },
  {
    id: 3,
    name: TEMPLATE_TYPES.EXTREME,
    icon: Extreme,
    description:
      "Extreme Programming (XP) is an Agile software development methodology that focuses on delivering high-quality software through frequent and continuous feedback, collaboration, and adaptation.",
    description1:
      "Extreme Programming (XP) is an agile software development methodology that focuses on delivering high-quality software through frequent and continuous feedback, collaboration, and adaptation.",
    inform1: "Allowing open and frequent communication",
    inform2: "Keeping things as simple as possible",
    image1: Extreme1,
    image2: Extreme2,
    workflow: ['Planning', 'Design', 'Coding', 'Testing', 'Listening'],
    recommend: [
      "The Dev team should be small, and share the same headquarters.",
      "The project uses new technology and carries many risks.",
    ],
  },
  {
    id: 4,
    name: TEMPLATE_TYPES.CUSTOM,
    icon: Custom,
    description:
      "Create a custom workflow that fits your team's unique process. Use the board to limit work in progress",
    description1:
      "Create a custom workflow that fits your team's unique process.",
    inform1: "Track work using a simple board",
    image1: Kanban1,
    inform2: "Create custom board to limit work in progress",
    image2: Kanban2,
    workflow: ["You define"],
    recommend: [""],
  },
];
export default modelList;
