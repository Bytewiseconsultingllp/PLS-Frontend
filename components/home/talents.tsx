"use client"

import { motion } from "framer-motion"
import { Briefcase, Globe, Server, Star, User } from "lucide-react"
import Link from "next/link"

const talents = [
  {
    name: "Jane Doe",
    title: "Software Engineer",
    rate: "$40 per hour",
    rating: 4.8,
    jobs: "45 projects",
    image: "/assets/dummy7.jpg",
    iconColor: "#FF6B35",
    availability: "Available in 2 weeks",
    experience: "10 years experience",
    industries: ["EdTech", "Travel", "Logistics"],
    frontend: ["Vue.js", "JavaScript", "Nuxt.js", "Bootstrap"],
    backend: ["Ruby on Rails", "Go", "REST API"],
    database: ["MySQL", "SQLite", "Cassandra"],
    cloudDevOps: ["Azure", "Terraform", "Jenkins"],
    certifications: "Azure Certified Developer, Google Cloud Certified",
  },
  {
    name: "John Smith",
    title: "Backend Developer",
    rate: "$50 per hour",
    rating: 4.5,
    jobs: "32 projects",
    image: "/assets/dummy8.jpg",
    iconColor: "#003087",
    availability: "Available in 3 weeks",
    experience: "15 years experience",
    industries: ["Healthcare", "Finance", "E-Commerce"],
    frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    backend: ["Node.js", "Express", "GraphQL"],
    database: ["PostgreSQL", "MongoDB", "Redis"],
    cloudDevOps: ["AWS", "Docker", "Kubernetes"],
    certifications: "AWS Certified Solutions Architect, Docker Certified Associate",
  },
  {
    name: "Alice Green",
    title: "Full Stack Developer",
    rate: "$55 per hour",
    rating: 4.9,
    jobs: "57 projects",
    image: "/assets/dummy4.jpg",
    iconColor: "#FF6B35",
    availability: "Available in 1 week",
    experience: "9 years experience",
    industries: ["E-Commerce", "SaaS", "FinTech"],
    frontend: ["Angular", "JavaScript", "Tailwind CSS", "Vue.js"],
    backend: ["Java", "Spring Boot", "GraphQL"],
    database: ["Oracle", "MongoDB", "CouchDB"],
    cloudDevOps: ["Google Cloud", "Terraform", "GitLab CI"],
    certifications: "Google Cloud Certified, Oracle Certified Professional",
  },
]

export default function Talents() {
  return (
    <div className="bg-white w-full">
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Top Tech Masters of PLS – Innovators, Builders, Problem-Solvers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {talents.map((talent, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 flex flex-col w-full max-w-md mx-auto border-4 border-[#003087]"
              >
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-gray-100">
                    <User size={40} color={talent.iconColor} strokeWidth={1.5} />
                  </div>
                  <div className="text-right">
                    <h2 className="text-lg font-semibold text-black">{talent.name}</h2>
                    <p className="text-gray-600 text-sm">{talent.title}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center text-black">
                    <Star className="w-5 h-5" />
                    <span className="ml-2 text-lg font-semibold">{talent.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({talent.jobs})</span>
                </div>
                <div className="mt-4 text-gray-600">
                  <Briefcase className="w-5 h-5 inline-block mr-2" />
                  {talent.experience}
                </div>
                <div className="mt-4">
                  <p className="text-black font-semibold">Technology Stack</p>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-black" />
                      <span className="ml-2 font-medium text-black">Frontend</span>
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {talent.frontend.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium text-black bg-gray-200 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <Server className="w-5 h-5 text-black" />
                      <span className="ml-2 font-medium text-black">Backend</span>
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {talent.backend.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium text-black bg-gray-200 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link href="/contact-us" className="block mt-6">
                  <button className="bg-[#003087] text-white w-full py-3 rounded-lg hover:bg-[#FF6B35] hover:text-white">
                    Contact Us
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}
