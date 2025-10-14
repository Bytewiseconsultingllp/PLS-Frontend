// lib/getUserFormData.ts
export async function getUserFormData() {
  // Fetch from API, DB, or Context
  return {
    name: "John Doe",
    company: "Prime Logic Solutions",
    email: "john@example.com",
    selectedServices: ["Web Development", "App Development"],
    industries: ["E-commerce", "Education"],
    technologies: ["Next.js", "Tailwind CSS", "Node.js"],
    features: ["Responsive Design", "Admin Dashboard"],
    specialOffers: "10% discount for early payment",
    timeline: "4-6 Weeks",
    estimatedBudget: "$2500 - $3500",
    agreement: "All payments are subject to mutual agreement and final proposal terms.",
  };
}
