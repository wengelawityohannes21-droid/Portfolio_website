import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function j(data: unknown) {
  return JSON.stringify(data);
}

async function main() {
  const email = process.env.ADMIN_EMAIL || "Wengelawityohannes21@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@2026!";

  // Vercel runs the seed with --if-empty during deployment. This makes the
  // initial production bootstrap safe without overwriting later CMS edits.
  if (process.argv.includes("--if-empty")) {
    const existingProfiles = await prisma.profile.count();
    if (existingProfiles > 0) {
      console.log("Database already contains portfolio content; skipping seed.");
      return;
    }
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: "Wengelawit Yohannes" },
    create: {
      email,
      name: "Wengelawit Yohannes",
      passwordHash,
      role: "admin",
    },
  });

  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      fullName: "Wengelawit Yohannes Shewatatek",
      headline: "Nutrition & Food Science Researcher · Youth Leader · Entrepreneur",
      tagline:
        "Building food systems that nourish communities, empower youth, and drive evidence-based impact across Ethiopia and Africa.",
      typingPhrases: j([
        "Nutrition & Food Science Researcher",
        "Youth Leader & Founder",
        "Public Health Data Advocate",
        "AgriData Connect Co-founder",
        "Community Impact Builder",
      ]),
      bio: `Nutrition and Food Science student, researcher, and youth leader passionate about food systems transformation, nutrition advocacy, and community impact. Founder and President of the Hawassa University Nutrition and Food Science Students Association (HU-NaFSSA), Founding Coordinator of the Ethiopian Nutrition and Food Science Students Association, and Treasurer of the African Association of Nutrition and Dietetics Students.`,
      passion:
        "I am driven by the belief that better nutrition and smarter food systems can unlock healthier lives and stronger communities—especially for young people across Africa.",
      mission:
        "To advance nutrition research, youth leadership, and data-driven agricultural solutions that strengthen food system resilience and public health decision-making.",
      careerGoals:
        "To become a leading researcher, entrepreneur, and industry voice at the intersection of nutrition science, public health, and agricultural intelligence—bridging evidence, policy, and community action.",
      researchInterests:
        "Food systems transformation, clinical & community nutrition, rural nutrition research, public health data, sustainable diets, and agricultural decision-support systems.",
      photoUrl: "/uploads/profile.png",
      cvUrl: "/uploads/cv.docx",
      email: "Wengelawityohannes21@gmail.com",
      phone: "+251 967 295 398",
      location: "Hawassa, Ethiopia",
      linkedinUrl: "https://www.linkedin.com/in/wengelawit-yohannes",
      githubUrl: "https://github.com",
      websiteUrl: "",
    },
  });

  await prisma.siteSettings.deleteMany();
  await prisma.siteSettings.create({
    data: {
      siteName: "Wengelawit Yohannes",
      siteUrl: "http://localhost:3000",
      seoTitle:
        "Wengelawit Yohannes | Nutrition Researcher, Youth Leader & Entrepreneur",
      seoDescription:
        "Portfolio of Wengelawit Yohannes Shewatatek — Nutrition & Food Science researcher, founder of HU-NaFSSA, and co-founder of AgriData Connect.",
      seoKeywords:
        "nutrition, food science, Hawassa University, youth leadership, AgriData Connect, Ethiopia, public health, research",
      primaryColor: "#16A34A",
      accentColor: "#1F2937",
      backgroundColor: "#F9FAFB",
      resumeUrl: "/uploads/cv.docx",
    },
  });

  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        institution: "Hawassa University",
        degree: "BSc Nutrition and Food Science",
        field: "Nutrition and Food Science",
        endDate: "Current",
        current: true,
        description:
          "Developing expertise in nutrition science, food systems, and applied public health research.",
        achievements: j([
          "Founder & President, HU-NaFSSA",
          "Health Head, Hawassa University Student Union (2024–2025)",
          "Active researcher in rural food systems and nutrition",
        ]),
        sortOrder: 0,
      },
      {
        institution: "Infolink University",
        degree: "BSc Marketing Management",
        field: "Marketing Management",
        endDate: "Current",
        current: true,
        description:
          "Building business, marketing, and strategic communication capabilities to complement scientific training.",
        achievements: j([
          "Cross-disciplinary foundation for entrepreneurship and stakeholder engagement",
        ]),
        sortOrder: 1,
      },
    ],
  });

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        title: "Nutrition Intern",
        organization: "Black Lion Hospital",
        location: "Ethiopia",
        endDate: "Current",
        current: true,
        description:
          "Supporting clinical nutrition assessment and dietary management in a multidisciplinary healthcare setting.",
        responsibilities: j([
          "Support clinical nutrition assessment and dietary management activities",
          "Apply nutrition knowledge in patient care contexts",
          "Collaborate within multidisciplinary healthcare teams",
        ]),
        achievements: j([
          "Gaining hands-on clinical nutrition experience in a major referral hospital",
        ]),
        sortOrder: 0,
      },
      {
        title: "Data Collector & Data Analysis Intern",
        organization: "Ethiopian Public Health Institute (EPHI)",
        location: "Ethiopia",
        endDate: "Current",
        current: true,
        description:
          "Supporting nutrition and public health research through field data collection, management, and analysis.",
        responsibilities: j([
          "Field data collection for nutrition and public health studies",
          "Data management and analysis support",
          "Contribute to evidence generation for health and nutrition decision-making",
        ]),
        achievements: j([
          "Contributing to national-level public health evidence generation",
        ]),
        sortOrder: 1,
      },
      {
        title: "Student Researcher",
        organization: "Rural Food Systems and Nutrition Research, Sidama Region",
        location: "Sidama Region, Ethiopia",
        current: false,
        description:
          "Supported data management, analysis, and interpretation of nutrition-related findings in rural food systems research.",
        responsibilities: j([
          "Data management and analysis",
          "Interpretation of nutrition-related research findings",
        ]),
        achievements: j([
          "Strengthened applied research skills in rural nutrition contexts",
        ]),
        sortOrder: 2,
      },
      {
        title: "Cofounder & Business Operations Lead",
        organization: "AgriData Connect",
        location: "Ethiopia",
        current: true,
        endDate: "Current",
        description:
          "Business Operations Lead for AgriData Connect, a data-driven agricultural intelligence platform supporting improved decision-making in Ethiopia's agricultural ecosystem.",
        responsibilities: j([
          "Lead business strategy, stakeholder engagement, and market validation",
          "Support partnership development",
          "Collaborate with data engineers, product developers, and researchers",
          "Translate agricultural data into practical solutions for smallholder support",
        ]),
        achievements: j([
          "Selected among the Top 20 startups from more than 375 applicants in the ATI Innovation Competition",
        ]),
        sortOrder: 3,
      },
    ],
  });

  await prisma.leadership.deleteMany();
  await prisma.leadership.createMany({
    data: [
      {
        title: "Founder & President",
        organization:
          "Hawassa University Nutrition and Food Science Students Association (HU-NaFSSA)",
        startDate: "2025",
        endDate: "Present",
        current: true,
        description:
          "Established a student platform promoting nutrition advocacy, professional development, community engagement, and food systems awareness.",
        achievements: j([
          "Founded and lead HU-NaFSSA",
          "Coordinate teams and stakeholder engagement",
          "Strengthen youth participation in nutrition initiatives",
        ]),
        sortOrder: 0,
      },
      {
        title: "Founding Coordinator",
        organization: "Ethiopian Nutrition and Food Science Students Association",
        endDate: "Current",
        current: true,
        description:
          "Coordinate the establishment of a national network connecting nutrition and food science students across Ethiopia.",
        achievements: j([
          "Promote collaboration and leadership development",
          "Advance research engagement and nutrition advocacy nationally",
        ]),
        sortOrder: 1,
      },
      {
        title: "Treasurer",
        organization: "African Association of Nutrition and Dietetics Students",
        endDate: "Current",
        current: true,
        description:
          "Support organizational financial management and contribute to youth-led nutrition initiatives across Africa.",
        achievements: j([
          "Contribute to continental youth-led nutrition initiatives",
        ]),
        sortOrder: 2,
      },
      {
        title: "Community Service Director",
        organization: "Rotaract Club of Hawassa",
        endDate: "Current",
        current: true,
        description:
          "Lead community service planning, volunteer coordination, and implementation of projects addressing community needs.",
        achievements: j([
          "Lead planning and delivery of community service projects",
        ]),
        sortOrder: 3,
      },
      {
        title: "Health Head",
        organization: "Hawassa University Student Union",
        startDate: "2024",
        endDate: "2025",
        current: false,
        description:
          "Supported student health promotion activities and strengthened communication between students and university stakeholders.",
        achievements: j([
          "Advanced student health promotion on campus",
        ]),
        sortOrder: 4,
      },
      {
        title: "Secretary & Public Relations Officer",
        organization: "YCDF Hawassa Youth Coalition",
        endDate: "Current",
        current: true,
        description:
          "Support youth coalition communications, coordination, and public engagement.",
        achievements: j(["Strengthen youth coalition visibility and coordination"]),
        sortOrder: 5,
      },
    ],
  });

  await prisma.research.deleteMany();
  await prisma.research.createMany({
    data: [
      {
        title: "Rural Food Systems and Nutrition Research — Sidama Region",
        abstract:
          "Research supporting the understanding of rural food systems and nutrition outcomes in the Sidama Region of Ethiopia.",
        description:
          "Supported data management, analysis, and interpretation of nutrition-related findings within rural food systems research.",
        objective:
          "Generate evidence on rural food systems and nutrition to inform local and national decision-making.",
        authors: j(["Wengelawit Yohannes Shewatatek"]),
        institution: "Sidama Region Research Collaboration",
        status: "Completed",
        keywords: j(["Food systems", "Rural nutrition", "Sidama", "Data analysis"]),
        methods: j(["Data management", "Statistical analysis", "Field research support"]),
        featured: true,
        sortOrder: 0,
      },
      {
        title: "Public Health Nutrition Evidence Generation — EPHI",
        abstract:
          "Internship-based contribution to nutrition and public health research through field data collection and analysis at the Ethiopian Public Health Institute.",
        description:
          "Support nutrition and public health research through structured field data collection, data management, and analysis.",
        objective:
          "Contribute high-quality data and analysis to strengthen evidence for health and nutrition policy.",
        authors: j(["Wengelawit Yohannes Shewatatek"]),
        institution: "Ethiopian Public Health Institute (EPHI)",
        status: "Ongoing",
        keywords: j(["Public health", "Nutrition", "Data collection", "Evidence generation"]),
        methods: j(["Field data collection", "Data management", "Analysis"]),
        featured: true,
        sortOrder: 1,
      },
      {
        title: "AgriData Connect — Agricultural Intelligence for Food System Resilience",
        abstract:
          "Entrepreneurial research-and-product initiative building a data-driven agricultural intelligence platform for Ethiopia.",
        description:
          "Developing solutions that connect agricultural data, market information, and risk insights to strengthen smallholder farmer support and food system resilience.",
        objective:
          "Translate agricultural data into practical decision-support tools for Ethiopia's agricultural ecosystem.",
        authors: j(["Wengelawit Yohannes Shewatatek", "AgriData Connect Team"]),
        institution: "AgriData Connect",
        status: "Ongoing",
        keywords: j([
          "Agricultural intelligence",
          "Food systems",
          "Smallholder farmers",
          "Market data",
        ]),
        methods: j([
          "Market validation",
          "Stakeholder engagement",
          "Product development collaboration",
        ]),
        featured: true,
        sortOrder: 2,
      },
    ],
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "AgriData Connect",
        slug: "agridata-connect",
        description:
          "A data-driven agricultural intelligence platform supporting improved decision-making in Ethiopia's agricultural ecosystem. Connects agricultural data, market information, and risk insights to strengthen smallholder farmer support and food system resilience. Selected Top 20 of 375+ applicants in the ATI Innovation Competition.",
        techStack: j([
          "Agricultural Data",
          "Business Strategy",
          "Market Intelligence",
          "Partnership Development",
        ]),
        githubUrl: "",
        liveUrl: "",
        thumbnailUrl: "/uploads/projects/agridata.jpg",
        gallery: j([]),
        featured: true,
        sortOrder: 0,
      },
      {
        title: "HU-NaFSSA Platform",
        slug: "hu-nafssa",
        description:
          "Founded a student association platform at Hawassa University to advance nutrition advocacy, professional development, community engagement, and food systems awareness among Nutrition and Food Science students.",
        techStack: j([
          "Leadership",
          "Community Engagement",
          "Nutrition Advocacy",
          "Program Design",
        ]),
        thumbnailUrl: "/uploads/projects/hu-nafssa.jpg",
        featured: true,
        sortOrder: 1,
      },
      {
        title: "National Nutrition Students Network",
        slug: "ethiopian-nutrition-students-association",
        description:
          "Founding coordination of a national network connecting nutrition and food science students across Ethiopia to promote collaboration, leadership, research, and advocacy.",
        techStack: j(["Network Building", "Advocacy", "Research Engagement"]),
        thumbnailUrl: "/uploads/projects/national-network.jpg",
        featured: false,
        sortOrder: 2,
      },
    ],
  });

  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();

  const categories = [
    {
      name: "Nutrition & Food Systems",
      skills: [
        ["Food Systems Transformation", 90],
        ["Nutrition Research", 88],
        ["Clinical Nutrition", 82],
        ["Sustainable Diets", 80],
      ],
    },
    {
      name: "Research & Data",
      skills: [
        ["Data Collection", 90],
        ["Data Analysis", 85],
        ["Public Health Research", 86],
        ["Evidence Generation", 84],
      ],
    },
    {
      name: "Leadership & Business",
      skills: [
        ["Youth Leadership", 92],
        ["Stakeholder Engagement", 88],
        ["Project Coordination", 87],
        ["Business Operations", 84],
        ["Public Speaking", 85],
      ],
    },
    {
      name: "Digital & Creative Tools",
      skills: [
        ["Microsoft Office", 90],
        ["Google Workspace", 88],
        ["Excel", 86],
        ["Notion", 82],
        ["Canva", 88],
        ["CapCut", 80],
      ],
    },
    {
      name: "Marketing & Communication",
      skills: [
        ["Social Media Management", 84],
        ["Digital Marketing", 80],
        ["Community Outreach", 88],
      ],
    },
  ] as const;

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    await prisma.skillCategory.create({
      data: {
        name: cat.name,
        sortOrder: i,
        skills: {
          create: cat.skills.map(([name, proficiency], idx) => ({
            name,
            proficiency,
            sortOrder: idx,
          })),
        },
      },
    });
  }

  await prisma.certification.deleteMany();
  await prisma.certification.createMany({
    data: [
      {
        title: "Climate Smart Agriculture",
        issuer: "UNITAR",
        sortOrder: 0,
      },
      {
        title: "Sustainable Diets & Food Waste",
        issuer: "UNITAR",
        sortOrder: 1,
      },
      {
        title: "Virtual Assistant Training",
        issuer: "ALX",
        imageUrl: "/uploads/certificates/virtual-assistant.png",
        sortOrder: 2,
      },
      {
        title: "Social Media Management",
        issuer: "Kihilx Academy",
        sortOrder: 3,
      },
      {
        title: "Canva for Work",
        issuer: "Canva Academy",
        sortOrder: 4,
      },
      {
        title: "African Youth Leadership Forum — Participant",
        issuer: "African Young Leaders Foundation (AYLF)",
        issueDate: "December 2025",
        imageUrl: "/uploads/certificates/aylf.jpg",
        sortOrder: 5,
      },
      {
        title: "Youth Leadership Management & Life Skills Training",
        issuer: "Leadership Program",
        sortOrder: 6,
      },
      {
        title: "Digital Marketing Certificate",
        issuer: "Rhobot",
        sortOrder: 7,
      },
      {
        title: "Gig-101 Certificate",
        issuer: "Training Program",
        sortOrder: 8,
      },
      {
        title: "International Black Belt Certificate",
        issuer: "Taekwondo",
        sortOrder: 9,
      },
    ],
  });

  await prisma.award.deleteMany();
  await prisma.award.createMany({
    data: [
      {
        title: "Top 20 Startup — ATI Innovation Competition",
        issuer: "ATI Innovation Competition",
        description:
          "AgriData Connect selected among the Top 20 startups from more than 375 applicants for its potential to address agricultural and food system challenges.",
        sortOrder: 0,
      },
      {
        title: "Certificate of Appreciation",
        issuer: "Community & Professional Engagement",
        description: "Recognition for contributions to community and professional initiatives.",
        sortOrder: 1,
      },
    ],
  });

  await prisma.volunteer.deleteMany();
  await prisma.volunteer.createMany({
    data: [
      {
        title: "Community Service Director",
        organization: "Rotaract Club of Hawassa",
        current: true,
        endDate: "Current",
        description:
          "Lead community service planning, volunteer coordination, and project implementation.",
        sortOrder: 0,
      },
      {
        title: "Former Assistant Director, International Service",
        organization: "Rotaract Club of Hawassa",
        description: "Supported international service initiatives and club coordination.",
        sortOrder: 1,
      },
      {
        title: "Volunteer & Youth Organizer",
        organization: "Rotaract Club of Hawassa",
        description: "Organized youth engagement and volunteer activities.",
        sortOrder: 2,
      },
      {
        title: "Sunday School Youth Organizer",
        organization: "Community Faith Program",
        description: "Youth organizing and mentorship within Sunday School programs.",
        sortOrder: 3,
      },
      {
        title: "Teaching Assistant — Begena Class",
        organization: "Community Education",
        description: "Assisted instruction and mentoring in Begena class.",
        sortOrder: 4,
      },
      {
        title: "Taekwondo Instructor",
        organization: "Community Sports",
        description: "Instructed and mentored students in Taekwondo.",
        sortOrder: 5,
      },
      {
        title: "Volunteer Participant",
        organization: "Ethiopian Great Run",
        description: "Community participation and volunteer support.",
        sortOrder: 6,
      },
      {
        title: "Member / Engagement",
        organization: "Food and Nutrition Society of Ethiopia",
        description: "Professional community engagement in food and nutrition.",
        sortOrder: 7,
      },
    ],
  });

  await prisma.galleryItem.deleteMany();
  await prisma.galleryItem.createMany({
    data: [
      {
        title: "Professional Portrait",
        description: "Portfolio profile photo",
        imageUrl: "/uploads/profile.jpg",
        category: "Professional",
        sortOrder: 0,
      },
      {
        title: "AYLF Virtual Summit 2025",
        description: "African Young Leaders Foundation End of Year Virtual Summit",
        imageUrl: "/uploads/certificates/aylf.jpg",
        category: "Conferences",
        sortOrder: 1,
      },
      {
        title: "Leadership & Community Work",
        description: "Placeholder for future event photography",
        imageUrl: "/uploads/gallery/placeholder-1.svg",
        category: "Community",
        sortOrder: 2,
      },
      {
        title: "Research & Fieldwork",
        description: "Placeholder for research and fieldwork moments",
        imageUrl: "/uploads/gallery/placeholder-2.svg",
        category: "Research",
        sortOrder: 3,
      },
    ],
  });

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Recommendation Coming Soon",
        role: "Mentor / Collaborator",
        company: "To be added",
        content:
          "This space is reserved for professional recommendations. Add testimonials from mentors, collaborators, and partners through the admin dashboard.",
        published: false,
        sortOrder: 0,
      },
    ],
  });

  await prisma.blogPost.deleteMany();
  await prisma.blogPost.create({
    data: {
      title: "Why Youth Leadership Matters in Africa’s Food Systems",
      slug: "youth-leadership-food-systems",
      excerpt:
        "A short reflection on why young nutrition professionals must help shape food systems transformation across Africa.",
      content: `<p>Food systems transformation will not happen without young people at the table. As a nutrition and food science student, youth leader, and entrepreneur, I believe the next decade of African nutrition progress depends on bridging research, community action, and practical innovation.</p>
<p>Through HU-NaFSSA, national student coordination, and AgriData Connect, I am learning that evidence alone is not enough—we also need networks, leadership, and tools that reach farmers, students, and decision-makers.</p>
<p><em>This is a starter article. Edit or replace it from the Admin Dashboard → Blog.</em></p>`,
      categories: j(["Leadership", "Food Systems"]),
      tags: j(["youth", "nutrition", "Africa", "leadership"]),
      status: "published",
      publishedAt: new Date(),
      seoTitle: "Why Youth Leadership Matters in Africa’s Food Systems",
      seoDescription:
        "Reflections from Wengelawit Yohannes on youth leadership, nutrition advocacy, and food systems transformation.",
      coverImage: "/uploads/gallery/placeholder-1.svg",
    },
  });

  console.log("✅ Database seeded with Wengelawit Yohannes portfolio content");
  console.log(`🔐 Admin account created for ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
