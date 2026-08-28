export interface EducationItem {
  passing: string
  period: string
  startDate: string
  endDate: string
  degree: string
  /** Short credential name used by JSON-LD (`educationalCredentialAwarded`). */
  credential: string
  dept?: string
  institute: string
  link: string
  description: string
}

export const education: EducationItem[] = [
  {
    passing: '2022',
    period: '2018 – 2022',
    startDate: '2018',
    endDate: '2022',
    degree: 'Bachelor of Science (BSc)',
    credential: 'BSc in Computer Science and Engineering',
    dept: 'Computer Science and Engineering',
    institute: 'University of Asia Pacific',
    link: 'https://www.uap-bd.edu/',
    description:
      'Specialized in software engineering, web & mobile development, cloud computing, and team-based projects. Completed capstone projects in full-stack web applications and cloud deployment.',
  },
  {
    passing: '2016',
    period: '2014 – 2016',
    startDate: '2014',
    endDate: '2016',
    degree: 'Higher Secondary Certificate (HSC)',
    credential: 'Higher Secondary Certificate, Science',
    dept: 'Science',
    institute: 'Govt Science College, Dhaka',
    link: 'https://www.gsctd.edu.bd/',
    description:
      'Focused on mathematics, physics, and computer science fundamentals. Participated in programming competitions and science fairs, strengthening analytical and problem-solving skills.',
  },
  {
    passing: '2014',
    period: '2012 – 2014',
    startDate: '2012',
    endDate: '2014',
    degree: 'Secondary School Certificate (SSC)',
    credential: 'Secondary School Certificate, Science',
    dept: 'Science',
    institute: 'Dashani Mohanpur High School, Chandpur',
    link: 'https://dmhighschool.edu.bd/',
    description:
      'Graduated with honors in science subjects. Developed a strong foundation in mathematics and logical thinking through STEM activities and academic competitions.',
  },
]
