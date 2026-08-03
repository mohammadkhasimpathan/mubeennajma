// ============================================================
// Global TypeScript types for the portfolio
// ============================================================

export interface Profile {
  name: string;
  tagline: string;
  roles: string[];
  email: string;
  phone: string;
  location: string;
  bio: string;
  shortBio: string;
  resumeUrl: string;
  profileImage: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
    twitter: string;
  };
  stats: Stat[];
  currentlyLearning: string[];
  availability: string;
  yearsOfExperience: number;
  siteUrl: string;
  googleAnalyticsId: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  images: string[];
  technologies: string[];
  category: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  features: string[];
  challenges: string;
  status: string;
  year: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  logoColor: string;
  color: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  shortInstitution: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
  highlights: string[];
  type: string;
  color: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  credentialUrl: string;
  skills: string[];
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  testimonial: string;
  relation: string;
}

export interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  theme: string;
  date: string;
  result: string;
  description: string;
  techUsed: string[];
  teamSize: number;
  achievement: string;
  certificate: boolean;
  color: string;
  badge: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  icon: string;
  description: string;
  stat: string;
  statLabel: string;
  color: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  color: string;
  technologies: string[];
}

export interface TechItem {
  name: string;
  icon: string;
  color: string;
  category: string;
  url: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  coverImage: string;
}

export type Theme = 'dark' | 'light';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface CommandItem {
  id: string;
  title: string;
  href: string;
  section?: string;
  icon?: string;
}
