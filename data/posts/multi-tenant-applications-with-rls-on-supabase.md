---
title: "Multi-Tenant Applications with RLS on Supabase (Postgres)"
date: "2024-12-23"
description: "How to architect multi-tenant SaaS apps using Postgres Row Level Security on Supabase — tenant isolation, policy patterns, and real-world trade-offs."
tags: ["supabase", "postgres", "rls", "multi-tenant"]
cover: "/blog-images/multi-tenant-applications-with-rls-on-supabase/cover.png"
source: "https://www.antstack.com/blog/multi-tenant-applications-with-rls-on-supabase-postgress/"
---
It all started when one of our clients was looking to scale their application to serve multiple organizations through a single platform. The application was built on [**Supabase**](https://www.antstack.com/blog/announcing-partnership-with-supabase/), which provided them with a fully managed database powered by PostgreSQL.They wanted to implement a multi-tenant architecture but were concerned about data security and isolation. The challenge was clear: how could they ensure strict data separation between tenants without the complexity and cost of maintaining separate databases for each one? This is where [Row-Level Security (RLS)](https://www.antstack.com/blog/building-an-mvp-app-using-supabase/) came into play, offering a way to solve the problem by providing fine-grained access control at the database level, making multi-tenancy secure, efficient, and scalable.

## What are we covering in the blog?

-   What is Multi-Tenancy?
-   What is Row Level Security(RLS)?
-   How Does RLS Help in Multi-Tenancy?
-   Setting Up RLS.
-   Best Practices & Challenges.

## Understanding Multi-Tenancy

Multi-tenancy is an architectural model where a single application or database serves multiple customers (tenants). Each tenant’s data is isolated, ensuring that one tenant cannot access another’s data. This approach is widely used in SaaS platforms, where a single application serves many organizations.

Here, instead of maintaining separate instances for each customer, a multi-tenant system shares the same resources such as servers, databases, and processing power. This enables businesses to scale rapidly. RLS plays a key role in this model by providing strict data isolation at the row level, ensuring each tenant can only access their own data.

## Understanding RLS?

Row-Level Security (RLS), as the name suggests, is a database feature that enables you to control access to data at the individual row level, ensuring that users can only view the data they are authorized to access. This is offered by most databases and warehouse solutions like Postgres, MySQL, MS-SQL, snowflake, etc.

Unlike traditional methods where access control is managed at the application layer, RLS ensures that sensitive data is automatically filtered based on the user’s identity or other attributes, minimizing the risk of unauthorized access. RLS simplifies security management by centralizing and automating the enforcement of rules.

Components of an RLS policy: ![IMG\_6375.JPG](/blog-images/multi-tenant-applications-with-rls-on-supabase/supabase_query_90da53f05b.png)

Let's break down each part of the given **RLS policy**: **(This should be in H2)**

**1\. CREATE POLICY "office\_managers":** This creates a new RLS policy named **"office\_managers"**. The policy's name helps to identify the policy in the database.

**2\. ON "office"."user\_salaries":** This part specifies the **table** to which the policy applies. In this case, the policy is applied to the **user\_salaries** table, which is in the **office** schema.

**3\. AS PERMISSIVE:** This defines the behavior of the policy. **PERMISSIVE** means that access to the rows is allowed if **any** of the active policies permit access. In other words, if multiple policies are in place, and at least one grants access, the user can access the row.

**4\. FOR SELECT:** This specifies the type of SQL operation the policy applies to. In this case, **FOR ALL** means the policy is concerned with **SELECT, INSERT, UPDATE, DELETE queries** on the **user\_salaries** table.

**5\. TO authenticated:** This specifies the **role** that the policy applies to. The **authenticated** role indicates that the policy will apply to any users who are authenticated.

**6\. USING (true):** The **USING** clause defines the condition that must be met for a user to read (**SELECT**) a row from the table.

**7\. WITH CHECK (true):** The **WITH CHECK** clause defines the condition that must be met when attempting to **insert or update** rows in the table.

> Note: Although true is used in the example for both USING and WITH CHECK, realistically, there should always be a condition that evaluates to either true or false to ensure proper access control. For example, instead of true, a more practical condition could be something like: `USING (tenant_id = current_setting('myapp.tenant_id')::int)` OR `WITH CHECK (tenant_id = current_setting('myapp.tenant_id')::int)`. This condition ensures that a user can only access rows where the tenant\_id matches the tenant\_id set in the current session. This would prevent users from accessing or modifying data belonging to other tenants.

## How does RLS help?

RLS strengthens data security and simplifies access control by enforcing restrictions directly at the database level. This centralization improves security and supports multi-tenant environments. It gives:

1.  **Fine-Grained Access Control:** RLS restricts database access at the row level, ensuring that users can only access specific rows that they are authorized to view based on predefined policies. This enhances data security by preventing unauthorized data access within the same table.
2.  **Security:** Rather than relying on application logic or external systems, RLS centralizes the security control within the database, making it easier to manage and enforce data access permissions.
3.  **Simplifies the Application Logic:** With RLS, database queries automatically filter data based on the user's role, allowing customized access controls to be enforced without altering application logic. This ensures that sensitive data is visible only to authorized users.
4.  **Multi-Tenancy Support:** Effortlessly manage multiple clients or business units within a single system, while maintaining shared resources for cost efficiency.
5.  **Performance Benefits:** RLS helps with performance by reducing the need for complex filtering and access control logic in the application layer.

## Setting Up RLS for Multi-Tenant Architectures

Here’s how we set up RLS for a multi-tenant architecture:

1.  **Define a Tenant Identifier**
    
    The first step in setting up RLS is identifying a way to distinguish data belonging to different tenants. This is typically done by introducing a `tenant_id` column in your tables to distinguish data for each tenant. This is used to segregate data for each tenant. For example, in a table storing customer orders, the `tenant_id` would specify which tenant (company) the order belongs to.
    
2.  **Create RLS Policies Based on Tenant ID**
    
    Once the tenant identifier is in place, you can create RLS policies that filter data based on the current user's `tenant_id`. For example, when a user logs in, the system automatically associates their JWT with the tenant, and the RLS policy ensures that they can only access data with the matching `tenant_id`. A policy like this would look something like:
    
    ```
    CREATE POLICY tenant_access_policy
      ON orders
      FOR all
      USING ((tenant_id = (((current_setting('request.jwt.claims'::text, true))::json ->> 'tenant_id'::text))::text[]));
    ```
    
    Description: In this policy we extract json data from JWT and evaluate the tenant ID against `tenant_id` in orders table.
    
3.  **Optimize for Performance:**
    
    As your multi-tenant application grows, consider the performance implications of RLS, especially when dealing with large datasets. RLS policies can sometimes add overhead to queries, so ensure that your indexing and query optimization strategies are aligned with the way RLS is filtering data.
    

## Best Practices

1.  **Understand Your Users**
    
    Clearly define user roles by understanding their specific access needs to create effective and secure policies.
    
2.  **Define Clear Roles**
    
    Establish roles for different user types, following the **"least privilege"** principle to ensure users only have access to necessary data.
    
3.  **One Policy Per Operation, Per Role**
    
    Create separate policies for each operation (SELECT, INSERT, UPDATE, DELETE) based on roles, ensuring precise control over data access.
    
4.  **Understand Your Users**
    
    Clearly define user roles by understanding their specific access needs to create effective and secure policies.
    
5.  **Periodic Reviews and Updates**
    
    Regularly review and update RLS policies to align with new features, use cases, and evolving security requirements.
    
6.  **Monitor Access Logs**
    
    Continuously monitor logs and access patterns to detect unauthorized access and refine policies over time.
    
7.  **Use `WHERE` in Queries**
    
    Use the `WHERE` clause in queries to enforce additional data filtering, enhancing performance and reducing unnecessary data checks.
    

## Challenges and Limitations of RLS in Multi-Tenancy

1.  **Performance Overhead**
    
    RLS can introduce performance issues, especially with large datasets, as the database evaluates policies for each query. As the number of tenants increases, RLS may face scalability challenges, requiring ongoing optimization for performance.
    
2.  **Policy Conflicts**
    
    Conflicting RLS policies for different roles or operations can lead to unexpected behavior and require careful management.
    
3.  **Debugging Difficulty**
    
    Troubleshooting RLS-related issues can be challenging, as identifying the root cause of access problems often requires detailed policy inspection.
    

## Key Takeaways

Row-Level Security (RLS) is a crucial component for ensuring secure and efficient multi-tenancy in modern applications. By enforcing fine-grained access control directly at the database level, RLS ensures that each tenant’s data is isolated while sharing the same infrastructure. It simplifies security management, reduces the risk of unauthorized access, and improves scalability. Despite some challenges, such as performance overhead and policy complexity, RLS remains an essential tool for organizations looking to build secure, cost-effective, and scalable multi-tenant systems.

> Also, check out the detailed step-by-step guide on setting up RLS, by Neon- [PostgreSQL Row-Level Security](https://neon.tech/postgresql/postgresql-administration/postgresql-row-level-security).
