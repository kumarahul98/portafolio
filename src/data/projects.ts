export interface Project {
  title: string
  role: string
  description: string
  tags: string[]
}

export const PROJECTS: Project[] = [
  {
    title: 'Health Tech — FHIR ETL Pipeline',
    role: 'Principal Solutions Architect',
    description:
      'Health tech app for doctors to manage patients. Architected a scalable ETL pipeline to process FHIR healthcare data, perform patient metric calculations, enrich datasets with derived metrics, and synchronize with the application layer. Built integrations with multiple EMR systems over FHIR APIs using AWS and Databricks — EventBridge, Step Functions, S3, and Databricks Serverless.',
    tags: ['AWS', 'Databricks', 'FHIR', 'Step Functions', 'EventBridge', 'S3'],
  },
  {
    title: 'Counterfeit Detection Platform',
    role: 'Principal Solutions Architect',
    description:
      'Tool to stop counterfeit products by detecting unauthorized listings using images. Led development of a scalable batch-processing system on AWS, implementing job orchestration for AWS Bedrock batch inference using Lambda, EventBridge, DynamoDB, and S3.',
    tags: ['AWS Bedrock', 'Lambda', 'DynamoDB', 'EventBridge', 'GenAI'],
  },
  {
    title: 'Global Cruise Replication Engine',
    role: 'Principal Solutions Architect',
    description:
      'Replication Engine POC for a global cruise operator to synchronize data between shore and ship environments. Designed an offline-tolerant replication architecture using open-source technologies — Debezium, Kafka, and Python services on Kubernetes/EKS.',
    tags: ['Debezium', 'Kafka', 'Kubernetes', 'EKS', 'Python'],
  },
  {
    title: 'Warehouse Analytics Pipeline',
    role: 'Senior Data Engineer',
    description:
      'Architected and built an analytics pipeline for various BI use cases. Ingested data from CSV files, NFS, and DynamoDB Streams into S3, used AWS Glue jobs to transform and move data into a lakehouse, and created BI dashboards with AWS QuickSight.',
    tags: ['AWS Glue', 'S3', 'DynamoDB Streams', 'QuickSight', 'Lakehouse'],
  },
  {
    title: 'OnLeave — Slack Leave Management',
    role: 'Tech Lead',
    description:
      'Leave management application built on top of Slack. Led the team and built the entire backend on AWS serverless services — DynamoDB, Lambda, API Gateway. Implemented event-driven architecture with SQS and EventBridge. TypeScript backend, React + AWS Amplify frontend.',
    tags: ['Lambda', 'DynamoDB', 'SQS', 'EventBridge', 'TypeScript', 'React'],
  },
  {
    title: 'DB Migration — CouchBase to OpenSearch',
    role: 'Data Engineer',
    description:
      'Migrated close to 32 million records from CouchBase to OpenSearch with minimal downtime. Built a private API for seamless integration with the rest of the application.',
    tags: ['OpenSearch', 'CouchBase', 'Lambda', 'API Gateway'],
  },
]
