export interface Feature {
  name: string;
  description: string;
}

export const features: Feature[] = [
  {
    name: 'Sign Up, Login, and Logout',
    description: 'User authentication interface',
  },
  {
    name: 'User Management',
    description: 'Admin-only access for managing users and assigning roles',
  },
  {
    name: 'Document Upload and Management',
    description: 'Interface to upload and manage documents.',
  },
  {
    name: 'Ingestion Management',
    description: 'Interface to trigger and monitor ingestion status',
  },
  {
    name: 'Q&A Interface',
    description:
      'A user-friendly interface for asking questions, receiving answers, and displaying relevant document excerpts (using RAG)',
  },
];
