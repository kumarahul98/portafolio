---
title: "Getting Started with OpenSearch"
date: "2021-10-27"
description: "Introduction to OpenSearch — setting up clusters, indexing data, and running full-text and aggregation queries on AWS."
tags: ["aws", "opensearch", "search"]
cover: "/blog-images/getting-started-with-opensearch/cover.png"
source: "https://www.antstack.com/blog/getting-started-with-open-search/"
---
### Introduction

We are always in search of something. Whether it's the meaning of life or the delicious food near us, we heavily rely on search engines to get the answers. We already use apps such as Swiggy, Uber, Wikipedia, etc., daily. But did you know that these apps use Elasticsearch?

One might ask, why not use the DataBase directly instead of a separate tool? Because when we search for anything, we don't always type the exact words or sentences. For example, we might search for "cinema" and need results for "theater", searching for containers - get results for both box containers and docker containers, etc. In cases like these, the regular database queries will not give the desired result.

OpenSearch(Elasticsearch) is the leading free and open-source search and analytics solution. OpenSearch is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine and schema-free JSON documents.

There are a lot of tutorials online covering the basics of OpenSearch(Elastic Search). I recommend:

1.  [Github: Crash Course to Elastic Stack](https://github.com/LisaHJung/Beginners-Crash-Course-to-Elastic-Stack-Series-Table-of-Contents)
2.  [Youtube: Beginner's Crash Course to Elastic Stack](https://www.youtube.com/watch?v=gS_nHTWZEJ8&t=3019s&ab_channel=OfficialElasticCommunity)
3.  [Udemy: Complete Guide to Elasticsearch](https://www.udemy.com/course/elasticsearch-complete-guide/)

Here, we will build a Search Application for Marvel Movies using OpenSearch. We will upload a dataset of marvel movies to the OpenSearch domain and query it using lambda. Our tech stack includes lambda & API-gw for the backend, React for the frontend, and OpenSearch for the database. Check out the Architecture diagram below:

![app-architecture.png](/blog-images/getting-started-with-opensearch/app_architecture_3aee81bbe7.png)

### Pre-requisites

1.  Working knowledge of:
    -   basic OpenSearch(Elastic-Search) queries
    -   ReactJS
    -   AWS Lambda
    -   AWS API Gateway
2.  Active AWS account

### Steps to Create the Application

###### Step 1: Create the resources for the backend:

**1\. Open-Search domain**

-   Go to OpenSearch console and create a domain.
-   Configuration:
    -   Name: marvel-movies // can give any name
    -   Deployment type: Development and testing // To avoid large AWS bills we use the smallest instance available
    -   Version: 1.0 // Latest version of the tool
    -   Data Node: t3.small // this is the cheapest instance, which is enough for our application
    -   Network configuration: public // allow access to cluster over internet
    -   Enable Fine-grained access control (FGAC): with 'Create Master User' // User to login into OpenSearch Dashboard
    -   Access policy: Only use fine-grained access control
-   Leave the rest to defaults and Review and create the domain.
    -   Note: Domain creation takes around 10-15mins.

**2\. Lambda function**

-   Go to the lambda console and create a new lambda function.
-   Configuration:
    -   Function name: get-marvel-movies-from-opensearch
    -   Runtime: NodeJS
    -   Review and create the function
    -   Add an Environment variable `DOMAIN_URL`, Example: `search-marvel-movies-random-string.us-east-2.es.amazonaws.com`
    -   Note: You can get this url from AWS OpenSearch Console and make sure you remove `https://` from Domain\_url
    -   Go to GitHub repo: [repo](https://github.com/kumarahul98/examples-for-open-search-lambda/blob/main/search-marvel-movies.js), and copy-paste the lambda code

**3\. Now go to the api-gateway console and create an API gateway:**

-   Configuration:
    -   API type: HTTP API
    -   Integration: Add Integration -> select lambda we just created
    -   API Name: marvel-movie
    -   Configure routes: Method: GET, Resource path: /search, Integration target: lambda function you just created
    -   Review and create
-   Go to the API and configure CORS and add "\*" for all the headers, so we dont get any `CORS errors`.

![es-blog-cors.jpeg](/blog-images/getting-started-with-opensearch/es_blog_cors_7e67bf664c.jpeg)

###### Step 2: Upload the movie data to Open-Search domain

1.  Download the data-set from [here](https://www.kaggle.com/kumarahul/marvelmovies-for-elasticsearch) and uzip it.
2.  Open terminal and run the following command: `curl -XPOST -u '<user-name>:<password>' 'https:// <domain-url> /marvel_movies/_bulk' --data-binary @path/to/file.json -H 'Content-Type: application/json'`
3.  Look out for this in the output:

![data-upload-no-errors.jpeg](/blog-images/getting-started-with-opensearch/data_upload_no_errors_42e9f4fac9.jpeg)

###### Step 3: Giving Lambda permission to access data on OpenSearch

-   When we have FGAC enabled, we need to map the role in Opensearch domain
-   Go to OpenSearch dashboard by clicking on the link:

![dashboard-url.jpeg](/blog-images/getting-started-with-opensearch/dashboard_url_165e7de7a4.jpeg) \* Login into domain and open \`security\` under \`OpenSearch Plugins\`. \* Select \`Roles\` \* Note: Now either create a new role with appropriate permissions or use a existing role. \* We will use the existing role \`all\_access\`, click on it. \* Now go to \`Mapped user\` tab from the top bar and click on \`Manage mapping\`. \* Click on \`Add another backend role\` and enter the \`lambda IAM role ARN\`. \* Then click on \`Map\` and we have added permissons. ![opensearch-role-mapping.gif](/blog-images/getting-started-with-opensearch/opensearch_role_mapping_0700894aa6.gif)

###### Step 4: Setting up the front-end react app

1.  Clone the React app on your local system: [repo](https://github.com/kumarahul98/movies-search-ui.git)
2.  Run `npm i` in the app folder
3.  Add the api-gw endpoint url to `REACT_APP_API_ENDPOINT` in `.env` file.

![env-api-url.jpeg](/blog-images/getting-started-with-opensearch/env_api_url_005c47cfd8.jpeg) 4. Finally run \`npm start\`

###### step 5: Once we have everything in place, Let's test our application

1.  Go to `http://localhost:3000`

![search-result.png](/blog-images/getting-started-with-opensearch/search_result_62ae36db9d.png)

## References

-   [AWS OpenSearch Docs](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html)

## Further Reading

-   [Introducing AWS Lambda Functions powered by AWS Graviton 2 Processors](https://www.antstack.io/blog/introducing-aws-lambda-functions-powered-by-aws-graviton-2-processors/)
    
-   [Integrating Amazon API Gateway's REST API to AWS Step Functions' Synchronous Express Workflow](https://www.antstack.io/blog/integrating-rest-api-to-synchronous-step-functions/)
