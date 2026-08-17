export interface Experience {
  company: string
  location: string
  role: string
  period: string
  bullets: string[]
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Certification {
  name: string
  abbr: string
  issued: string | null
  expires: string | null
  issuer?: string
  url?: string
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'HashedIn by Deloitte',
    location: 'Bengaluru',
    role: 'Software Engineer 3',
    period: 'Jun 2026 – Present',
    bullets: [],
  },
  {
    company: 'AntStack Technologies',
    location: 'Bangalore',
    role: 'Principal Solutions Architect',
    period: 'Jul 2021 – Jun 2026',
    bullets: [
      'Lead teams across projects, drive architectural decisions, and help organizations modernize with serverless and AI-powered solutions.',
      'Built and shipped full-stack serverless applications using AWS Lambda, API Gateway, Amplify, and DynamoDB across multiple client projects.',
      'Designed and implemented data pipelines on AWS using Glue, Athena, and S3. Built production-ready analytics pipelines on Databricks.',
    ],
  },
  {
    company: '9Logic Technologies Pvt Ltd',
    location: 'Hyderabad',
    role: 'Cloud Engineer',
    period: 'Oct 2020 – Jul 2021',
    bullets: [
      'Managed end-to-end AWS infrastructure for a full-stack application, including load balancers, ECS, and CloudFront.',
      'Built automated monitoring and compliance pipelines using AWS Config and CloudTrail.',
    ],
  },
  {
    company: 'Neudesic',
    location: 'Bangalore',
    role: 'Intern — Full Stack Developer',
    period: 'Jan 2020 – Apr 2020',
    bullets: [
      'Built full-stack applications using Angular and ASP.NET, focusing on scalable architecture and clean code practices.',
    ],
  },
]

export const SKILLS: SkillCategory[] = [
  {
    category: 'AWS',
    items: ['Lambda', 'DynamoDB', 'SQS', 'EventBridge', 'API Gateway', 'OpenSearch', 'S3', 'Bedrock', 'Step Functions', 'Amplify', 'CloudFront', 'ECS', 'Glue', 'Athena', 'QuickSight', 'SageMaker'],
  },
  {
    category: 'Data',
    items: ['Databricks', 'PySpark', 'Apache Hudi', 'Apache Iceberg', 'Kafka', 'Debezium', 'Lakehouse'],
  },
  {
    category: 'Languages & Frameworks',
    items: ['TypeScript', 'Python', 'React', 'express'],
  },
  {
    category: 'DevOps & IaC',
    items: ['Terraform', 'AWS SAM', 'AWS CDK', 'GitHub Actions', 'AWS CodePipeline'],
  },
]

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Claude Certified Architect – Professional',
    abbr: 'CCA-P',
    issued: 'Aug 2026',
    expires: 'Aug 2027',
    issuer: 'Anthropic',
    url: 'https://www.credly.com/badges/9bea6941-a9ed-4d3e-8ee6-7abeccf297fd/',
  },
  { name: 'AWS Certified Solutions Architect – Professional', abbr: 'SAP', issued: 'Apr 2025', expires: 'Apr 2028' },
  { name: 'AWS Certified Solutions Architect – Associate', abbr: 'SAA', issued: 'Jan 2025', expires: 'Apr 2028' },
  { name: 'AWS Certified Data Analytics – Specialty', abbr: 'DAS', issued: null, expires: null },
  { name: 'Amazon Web Services Cloud Practitioner', abbr: 'CCP', issued: null, expires: null },
  { name: 'Databricks Certified Associate Developer for Apache Spark 3.0', abbr: 'DBX', issued: null, expires: null },
]

