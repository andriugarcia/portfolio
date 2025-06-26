import type { Experience } from "@/types/experience";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function mapExperienceToPDFTableBody(experience: Experience[]) {
    const body: any[] = [];
  
    experience.forEach((exp) => {
      // Row 1: Company and dates
      body.push([
        {
          content: exp.company,
          styles: { fontStyle: "bold", fontSize: 16 },
        },
        {
          content: `${exp.location} | ${exp.startDate} – ${exp.endDate}`,
          styles: { halign: "right" },
        },
      ]);
  
      // Row 2: Role and team (if available)
      const roleText = exp.team
        ? `${exp.role} – ${exp.team}`
        : exp.role;
      body.push([
        {
          content: roleText,
          colSpan: 2,
        },
      ]);
  
      // Row 3: Highlights
      let highlightText = exp.highlights
        .map((h) => `• ${h.content}`)
        .join("\n");

      body.push([
        {
          content: highlightText,
          colSpan: 2,
        },
      ]);

      // Add each project with styled name and description
      exp.projects.forEach((project) => {
        // Project name row
        body.push([
          {
            content: project.name,
            styles: { fontStyle: "bold" },
            colSpan: 2,
          },
        ]);

        // Project description row
        body.push([
          {
            content: project.description,
            colSpan: 2,
          },
        ]);

        // Project highlights row
        if (project.highlights.length > 0) {
          const projectHighlights = project.highlights
            .map((h) => `• ${h.content}`)
            .join("\n");

          body.push([
            {
              content: projectHighlights,
              colSpan: 2,
            },
          ]);
        }
      });

    });
  
    return body;
  }

export default (experience: Experience[]) => {
  const doc = new jsPDF();

  // Font setup
  doc.setFont("helvetica");
  doc.setFontSize(18);
  doc.text("Andriu García", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text("hello@andriugarcia.com | linkedin.com/in/andriugarcia | github.com/andriugarcia", 105, 28, { align: "center" });

  let currentY = 35;

  // SECTION: Experience
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Experience", 15, currentY);
  currentY += 6;

  // Example experience section (add more dynamically)
  autoTable(doc, {
    startY: currentY,
    theme: "plain",
    styles: { fontSize: 10 },
    body: mapExperienceToPDFTableBody(experience)
  });

  currentY = doc.lastAutoTable.finalY + 10;

  // SECTION: Education
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Education", 15, currentY);
  currentY += 6;

  autoTable(doc, {
    startY: currentY,
    theme: "plain",
    styles: { fontSize: 10 },
    body: [
      [
        {
          content: "University of Granada",
          styles: { fontStyle: "bold" }
        },
        {
          content: "Granada, Spain | Sep 2016 – Jul 2022",
          styles: { halign: "right" }
        }
      ],
      [
        {
          content: "Computer Engineering and Business Administration (Information Systems)",
          colSpan: 2
        }
      ],
      [
        {
          content: "• Worked on 20+ projects while studying, with 2 evolving into business",
          colSpan: 2
        }
      ]
    ]
  });

  currentY = doc.lastAutoTable.finalY + 10;

  // SECTION: Technical Skills
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Technical Skills", 15, currentY);
  currentY += 6;

  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.text(
    [
      "Languages: JavaScript, TypeScript, Java, HTML/CSS, SASS, Pug, Python, SQL, PHP",
      "Frontend: Vue.js, Nuxt, React, Next, JAMStack, Tailwind, Bootstrap, Storybook, Webpack, Gulp",
      "Backend: Node.js, Express, REST, GraphQL, Prisma, Swagger, Wordpress, Sockets",
      "Databases: PostgreSQL, Oracle, MySQL, MongoDB, Redis, Firebase, DynamoDB, Neo4j, ElasticSearch",
      "Cloud & Tools: Git, Docker, Kubernetes, Jenkins, AWS, Azure, Heroku, Cloudflare, VSCode, Jira, Asana"
    ],
    15,
    currentY
  );

  // Save
  doc.save("Andriu_Garcia_Resume.pdf");
};
