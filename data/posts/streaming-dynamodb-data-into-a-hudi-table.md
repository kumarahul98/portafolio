---
title: "Streaming DynamoDB Data into a Hudi Table: AWS Glue in Action"
date: "2024-10-14"
description: "Step-by-step walkthrough of streaming DynamoDB change data into an Apache Hudi table using AWS Glue, enabling near-real-time lakehouse updates."
tags: ["aws", "dynamodb", "hudi", "glue", "data-engineering"]
cover: "/blog-images/streaming-dynamodb-data-into-a-hudi-table/cover.png"
source: "https://www.antstack.com/blog/Streaming-DynamoDB-Data-into-a-Hudi-Table/"
---
In today's data-driven landscape, processing and analyzing data in real-time is critical for making timely business decisions. In this blog, we’ll build a real-time streaming pipeline that captures data changes from **AWS DynamoDB**, processes them using **AWS Glue**, and writes the results to **Apache Hudi**, all while using **Kinesis Stream** for change data capture.

[**DynamoDB**](https://www.antstack.com/events/dynamo-db-simplified-mental-model-to-approach-dynamo-db-data-modeling/), AWS’s fully-managed NoSQL database, supports high-velocity applications by scaling effortlessly. To capture real-time data changes (inserts, updates, deletes), we’ll use **Amazon Kinesis Data Streams**, enabling seamless streaming data capture. Once the data is ingested into the stream, **AWS Glue** will process and transform the data, and then we’ll write the processed records into **Hudi tables** for efficient data management in your data lake.

In this blog, we will:

-   Set up **Kinesis Data Streams** to capture DynamoDB data changes.
-   Process and transform streaming data in **AWS Glue**.
-   Write the transformed data into **Apache Hudi**, ensuring transactional updates and efficient querying.

By the end of this guide, you’ll have built a real-time data pipeline that captures, processes, and stores data efficiently, leveraging the power of AWS Glue and Kinesis Data Streams for scalable, serverless streaming analytics.

### **Prerequisites**

Before building the streaming pipeline, ensure you have the following:

1.  **AWS Account**: An active AWS account to access services like DynamoDB, Kinesis, Glue, and S3.
2.  **Apache Hudi Knowledge**

### The resources we are going to deploy include:

-   **S3 Bucket**
-   **DynamoDB Table**
-   **Kinesis Stream**
-   **Glue Database**
-   **Glue Table**
-   **IAM Role for Glue Job**
-   **AWS Glue Job**

Fig. below shows the data flow:

![blog.drawio.png](/blog-images/streaming-dynamodb-data-into-a-hudi-table/aws_glue_ddb_hudi_blog_8be3ba8bf5.png)

## Let’s get started.

### Deploy the resources on AWS:

1.  Clone the repository: [https://github.com/kumarahul98/ddb-glue-hudi-pipeline](https://github.com/kumarahul98/ddb-glue-hudi-pipeline)
2.  Deploy the SAM template
    1.  cd aws-sam-template
    2.  sam build && sam deploy –guided
3.  Go to the AWS S3 console and locate the bucket we just created
4.  Now upload the glue script file from report `aws-glue-job-script/glue-job-script.py` to s3 bucket.

s3://**bucket\_name**/scripts/glue-job-script.py

![blog.drawio.png](/blog-images/streaming-dynamodb-data-into-a-hudi-table/s3_save_file_loc_5b09a3e422.png)

Before we start the Glue Job, lets look at the glues script:

#### Config section

```

db_name = "ddb_streaming_glue_database"
kinesis_table_name = "ddb_streaming_glue_table"
output_table_name = "ecom_ddb_data"
record_key = "PK_SK"
precomb = "PK_SK"

s3_bucket = args["S3_BUCKET_NAME"]
s3_path_hudi = f"s3a://{s3_bucket}/{output_table_name}/"
s3_path_spark = f"s3://{s3_bucket}/spark_checkpoints/{output_table_name}/"

method = "upsert"
table_type = "MERGE_ON_READ"
window_size = "10 seconds"
starting_position_of_kinesis_iterator = "trim_horizon"

connection_options = {
"hoodie.datasource.hive_sync.database": db_name,
"hoodie.table.name": output_table_name,
"hoodie.datasource.write.storage.type": table_type,
"hoodie.datasource.write.recordkey.field": record_key,
"hoodie.datasource.write.operation": method,
...
}
```

Defines variables such as:

-   DynamoDB/Kinesis source database and table names.
-   S3 bucket paths for storing Hudi outputs and Spark checkpoints.
-   Hudi configuration options like,
    -   hoodie.datasource.hive\_sync.database: Syncs the Hudi table with the specified Hive database.
    -   hoodie.table.name: Name of the Hudi table where data will be written.
    -   hoodie.datasource.write.storage.type: Uses "MERGE\_ON\_READ" for efficient data writing with support for updates.
    -   hoodie.datasource.write.recordkey.field: Specifies "PK\_SK" as the unique record key.
    -   hoodie.datasource.write.operation: Performs an "upsert" to update existing records or insert new ones.

#### Batch Processing Logic

```

kinesis_dynamic_frame = DynamicFrame.fromDF(
            data_frame, glueContext, "from_kinesis_data_frame"
        )

kinesis_spark_df = kinesis_dynamic_frame.toDF()
# Remove top level nesting from event
selected_fields = kinesis_spark_df.selectExpr("dynamodb.NewImage")

ecom_dynamic_frame = DynamicFrame.fromDF(selected_fields, glueContext, "dyf")

# remove Dynamodb Nesting
unnest_ddb_json_df = ecom_dynamic_frame.unnest_ddb_json()

kinesis_spark_df = unnest_ddb_json_df.toDF()

# concat pk and sk to get unique id column
df = kinesis_spark_df.withColumn(record_key, F.concat(F.col("PK"), F.col("SK")))

df.write.format("hudi").options(**connection_options).mode("append").save(
                s3_path_hudi
            )
```

This code processes data from a Kinesis stream with the following steps:

a. Convert Kinesis data to Spark DataFrame: The Kinesis stream data (data\_frame) is converted into a Spark DataFrame using AWS Glue's DynamicFrame to make it compatible with Spark processing.  
b. Select nested DynamoDB data: It selects the NewImage field from the dynamodb event, which contains the actual data changes.  
c. Unnest the JSON structure: The nested structure of the DynamoDB JSON data is flattened to remove ddb nesting and make it easier to process.  
d. Create unique identifier: It concatenates the PK and SK fields to form a unique identifier for each record.  
e. Finally write the data into hudi table.

### Start the Pipeline:

-   Move to the `dummy-data-script` folder, install dependencies and run the script.
    1.  cd dummy-data-script
    2.  pip3 install -r requirements.txt -t .
    3.  python3 ecom-dummy-data.py

Verify the data in dynamo DB tables

![blog.drawio.png](/blog-images/streaming-dynamodb-data-into-a-hudi-table/verify_ddb_data_1ee6fbe087.png)

-   Go to the AWS glue console and start the glue Job.

![blog.drawio.png](/blog-images/streaming-dynamodb-data-into-a-hudi-table/aws_glue_job_run_3314b09a9a.png)

Note: we can also monitor logs under `output logs` section.

-   Now give it a couple of minutes and we should start seeing data in the S3 bucket.

![blog.drawio.png](/blog-images/streaming-dynamodb-data-into-a-hudi-table/s3_data_files_2e51e06d60.png)

### Verify Data:

Now let's move to the Athena query editor, you should see two table there  
\- \*\_rt: real time - \*\_ro: read optimized

The selection between RT and RO tables depends on your specific use case and requirements. Run the following query to verify data:

`SELECT * FROM "ddb_streaming_glue_database"."ecom_ddb_data_rt";`

![blog.drawio.png](/blog-images/streaming-dynamodb-data-into-a-hudi-table/verify_data_in_athena_ef02669375.png)

## Conclusion

We built a [serverless](https://www.antstack.com/serverless/) streaming pipeline using [AWS services](https://www.antstack.com/blog/antstack-achieves-aws-service-designation-status-for-aws-lambda/), including DynamoDB, Kinesis, and AWS Glue. By leveraging a serverless architecture, we eliminated the need for managing infrastructure, allowing us to focus on the core functionality of our data processing workflows.

Using Kinesis for real-time data capture and AWS Glue for seamless ETL operations, we created a scalable and efficient pipeline that automatically adjusts to varying data loads. This approach not only enhances our agility in responding to changing data requirements but also significantly reduces operational overhead.

However, it's important to note that this pipeline is not production-ready. We can take this further by splitting different DynamoDB entities into separate tables, optimizing the processing and storage of data. This blog serves as a foundation for your journey into stream processing with AWS Glue. For just a couple of hundred dollars a month, you can establish a live processing pipeline that is serverless and reduces operational overhead.

> The following resources were referenced:
> 
> 1.  [Streaming Ingestion from MongoDB Atlas into Hudi Github](https://github.com/soumilshah1995/Develop-Realtime-Streaming-Ingestion-from-MongoDB-Atlas-into-Hudi-Datalake-with-Glue-kinesis-and-ev)
> 2.  [AWS Glue streaming ETL jobs using AWS Blog](https://aws.amazon.com/blogs/big-data/interactively-develop-your-aws-glue-streaming-etl-jobs-using-aws-glue-studio-notebooks/)
