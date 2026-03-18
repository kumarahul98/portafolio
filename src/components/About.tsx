import { useReveal } from '../hooks/useReveal'

const EXPERIENCE = [
  {
    company: 'AntStack Technologies',
    location: 'Bangalore',
    role: 'Principal Solutions Architect',
    period: 'Jul 2021 – Present',
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

const SKILLS: { category: string; items: string[] }[] = [
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
    items: ['TypeScript', 'Python', 'React', 'Angular', 'C#', 'ASP.NET'],
  },
  {
    category: 'DevOps & IaC',
    items: ['Terraform', 'AWS SAM', 'AWS CDK', 'GitHub Actions', 'AWS CodePipeline'],
  },
]

const CERTIFICATIONS = [
  { name: 'AWS Certified Solutions Architect – Professional', abbr: 'SAP', issued: 'Apr 2025', expires: 'Apr 2028' },
  { name: 'AWS Certified Solutions Architect – Associate', abbr: 'SAA', issued: 'Jan 2025', expires: 'Apr 2028' },
  { name: 'AWS Certified Data Analytics – Specialty', abbr: 'DAS', issued: null, expires: null },
  { name: 'Amazon Web Services Cloud Practitioner', abbr: 'CCP', issued: null, expires: null },
  { name: 'Databricks Certified Associate Developer for Apache Spark 3.0', abbr: 'DBX', issued: null, expires: null },
]

export default function About() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-[#162C5A] py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
        {/* Section heading */}
        <h2 className="reveal font-anton text-5xl md:text-6xl lg:text-7xl text-white mb-16 tracking-tight">
          ABOUT
        </h2>

        {/* Experience */}
        <div className="mb-20">
          <h3 className="reveal font-pixel text-[#9CA3B0] mb-10">Experience</h3>
          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((job) => (
              <div key={job.company} className="reveal flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-56 shrink-0">
                  <p className="font-pixel text-brand leading-relaxed">{job.period}</p>
                </div>
                <div className="flex-1 border-l-2 border-brand pl-6">
                  <p className="font-anton text-2xl md:text-3xl text-white tracking-tight mb-1">{job.role}</p>
                  <p className="text-base md:text-lg text-[#9CA3B0] mb-4">{job.company}, {job.location}</p>
                  <ul className="flex flex-col gap-3">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="text-base md:text-lg text-white/70 leading-relaxed pl-3 border-l border-white/10">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h3 className="reveal font-pixel text-[#9CA3B0] mb-10">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILLS.map(({ category, items }) => (
              <div key={category} className="reveal">
                <p className="font-pixel text-brand mb-4">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm md:text-base px-3 py-1.5 border border-white/20 text-white/70 bg-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="reveal font-pixel text-[#9CA3B0] mb-10">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.abbr}
                className="reveal bg-white/5 border border-white/10 p-6"
              >
                <span className="font-pixel text-brand block mb-4">{cert.abbr}</span>
                <p className="text-base md:text-lg font-medium text-white leading-snug mb-2">{cert.name}</p>
                {cert.issued && (
                  <p className="text-sm md:text-base text-[#9CA3B0]">
                    Issued {cert.issued}{cert.expires ? ` · Expires ${cert.expires}` : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
