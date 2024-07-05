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
      des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
      img: "/p1.svg",
      iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
      link: "https://github.com/Era-cell/maze-runner",
    },
    {
      id: 2,
      title: "Yoom - Video Conferencing App",
      des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
      img: "/p2.svg",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
      link: "/ui.yoom.com",
    },
    {
      id: 3,
      title: "AI Image SaaS - Canva Application",
      des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
      img: "/p3.svg",
      iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
      link: "/ui.aiimg.com",
    },
    {
      id: 4,
      title: "Animated Apple Iphone 3D Website",
      des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
      img: "/p4.svg",
      iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
      link: "/ui.apple.com",
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