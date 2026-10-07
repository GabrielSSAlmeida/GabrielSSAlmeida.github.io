// Everything personal about the site lives here: edit this file, not the components.

export const site = {
  name: 'Gabriel Almeida',
  tagline: 'Technical writing on software, embedded systems and the tools I use.',
  githubUser: 'GabrielSSAlmeida',
  linkedin: 'https://www.linkedin.com/in/your-profile/', // TODO
  email: '', // optional; leave empty to hide
}

export const githubUrl = `https://github.com/${site.githubUser}`
// GitHub serves the current profile picture at this URL, so the About page always shows the latest one.
export const avatarUrl = `https://github.com/${site.githubUser}.png?size=400`

export interface TimelineItem {
  title: string
  place: string
  period: string
  description?: string
}

// TODO: fill in with your own text and résumé.
export const about = {
  role: 'Software Engineer',
  location: 'Brazil',
  bio: [
    "Hi, I'm Gabriel. Write a short paragraph here about who you are and what you work on.",
    'Use a second paragraph for what you write about on this blog and why.',
  ],
  experience: [
    {
      title: 'Your current role',
      place: 'Company',
      period: '2024 — Present',
      description: 'One or two lines about what you do there.',
    },
    {
      title: 'Previous role',
      place: 'Company',
      period: '2022 — 2024',
      description: 'One or two lines about what you did there.',
    },
  ] satisfies TimelineItem[],
  education: [
    {
      title: 'Your degree',
      place: 'University',
      period: '2019 — 2024',
    },
  ] satisfies TimelineItem[],
  skills: ['C', 'C++', 'Python', 'TypeScript', 'Linux', 'Git'],
}
