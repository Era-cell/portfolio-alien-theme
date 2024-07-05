import { meta, toriox, gsoc, myntra } from "./assets/images";
import {
    leetcode,
    codeforces,
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    nodejs,
    pricewise,
    react,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    github2
} from "./assets/icons";
  
export const skills = [
  {
      imageUrl: css,
      name: "CSS",
      type: "Frontend",
  },
  {
      imageUrl: express,
      name: "Express",
      type: "Backend",
  },
  {
      imageUrl: git,
      name: "Git",
      type: "Version Control",
  },
  {
      imageUrl: github,
      name: "GitHub",
      type: "Version Control",
  },
  {
      imageUrl: html,
      name: "HTML",
      type: "Frontend",
  },
  {
      imageUrl: javascript,
      name: "JavaScript",
      type: "Frontend",
  },
  {
      imageUrl: nodejs,
      name: "Node.js",
      type: "Backend",
  },
  {
      imageUrl: react,
      name: "React",
      type: "Frontend",
  },
  {
      imageUrl: sass,
      name: "Sass",
      type: "Frontend",
  },
  {
      imageUrl: tailwindcss,
      name: "Tailwind CSS",
      type: "Frontend",
  }
];

export const experiences = [
  {
    title: "Contributor@Postman",
    company_name: "Google Summer of Code",
    icon: gsoc,
    iconBg: "#accbe1",
    date: "May 2024 - August 2024",
    points: [
        "JSON Schema Updrade and Downgrade across all the dialects",
        "Analyze all the edge cases which needs extensive research over the 9 dialects and find appropriate solution using DSL",
        "Build a declarative transformation language such that the rules formed using the DSL will be lannguage agnostic"
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "Myntra",
    icon: myntra,
    iconBg: "#fbc3bc",
    date: "Feb 2024 - May 2024",
    points: [
        "Write and debug scripts of competitive websites to crawl the data"
    ],
  },
  {
      title: "Web Developer Intern",
      company_name: "Toriox pvt",
      icon: toriox,
      iconBg: "#b7e4c7",
      date: "Sept 2023 - Nov 2023",
      points: [
          "Build the landing home page of the company"
      ],
  }
];

export const projects = [
    {
      id: 1,
      title: "Maze Runner game",
      des: "A unique game inspired by maze runner movie, creates random maze every T seconds and goal is to solve maze and reach exit in a small time",
      img: "/p1.png",
      iconLists: ["/cpp.png", "/sdl.png", "/visualstudio.png"],
      link: "https://github.com/Era-cell/maze-runner",
    },
    {
      id: 2,
      title: "Agriculture Video Assistant",
      des: "Crop health analysis and water level assessment using LLM.",
      img: "/p2.png",
      iconLists: ["/python.png", "/jira.webp", "/huggingface.webp", "/keras.webp", "/gradio.png"],
      link: "https://github.com/Era-cell/Agriculture-Video-Assistant",
    },
    {
      id: 3,
      title: "AI driven dropshipping website",
      des: "Prototype of single page website, with Contextual bandit for feature control.",
      img: "/p3.png",
      iconLists: ["/lit.webp", "/netlify.png", "/gitlab.png", "/render.png"],
      link: "https://poetic-treacle-0bb964.netlify.app/",
    },
    {
      id: 4,
      title: "Personal Desktop Assistant",
      des: "Major features: Auto job search, Sentiment analysys on website.",
      img: "/p4.svg",
      iconLists: ["/selenium.png", "/nltk.png", "/pycharm.jpeg"],
      link: "https://github.com/Era-cell/Automated-Assistant",
    },
  ];
  
export const workExperience = [
  {
    id: 1,
    title: "Knight @Leetcode",
    desc: "Grinding problem solving using DSA",
    className: "md:col-span-2 w-1 h-1",
    thumbnail: leetcode,
  },
  {
    id: 2,
    title: "Codeforces",
    desc: "Most competitive coding platform in which I have just started, have great respect",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: codeforces,
  },
  {
    id: 3,
    title: "Freelance",
    desc: "Led the dev of a single page website whose features are controlled using AI",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp1.svg",
  },
  {
    id: 4,
    title: "Open Source Contributor",
    desc: "Solve and raise issues to get an opprtunity easily to work under other experinced open source contributors.",
    className: "md:col-span-2",
    thumbnail: github2,
  },
];

export const socialLinks = [
  {
      name: 'Contact',
      iconUrl: contact,
      link: '/contact',
  },
  {
      name: 'GitHub',
      iconUrl: github,
      link: 'https://github.com/Era-cell',
  },
  {
      name: 'LinkedIn',
      iconUrl: linkedin,
      link: 'https://www.linkedin.com/in/suprith-kg-284a341ba/',
  }
];