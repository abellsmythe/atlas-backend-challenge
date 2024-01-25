# Backend exercise: subscriptions DB

**Goal:** Develop a database and GraphQL queries to handle a subscription-based service. Base your database on the following plan and subscription descriptions.

**Naming conventions**:

- Plan: a “product” that a customer can purchase. We call them plans because they are charged monthly through a subscription. Plans have a relationship between each other: a customer can upgrade from a Basic plan to a Pro plan for example.
- Subscription: a subscription is what relates a customer to a plan. Each time a customer purchases a plan we create a new subscription. Customers can have more than one subscription for the same plan, but would usually have only one.

**Plan Descriptions:**

1. **Basic Plan**: $9.99/month, USD, monthly billing, 10 GB storage, basic support, 10% annual payment discount.
2. **Pro Plan**: $19.99/month, USD, monthly billing, 50 GB storage, priority support, analytics tools, 15% annual payment discount.
3. **Enterprise Plan**: $49.99/month, USD, monthly billing, unlimited storage, dedicated support, advanced analytics, custom integrations, 20% annual payment discount.

**Subscription Descriptions:**

1. **Subscription 1**: Basic Plan, active, starts Jan 1, 2023, ends Jan 1, 2024, monthly billing, last payment Mar 1, 2023, next billing Apr 1, 2023.
2. **Subscription 2**: Pro Plan, active, starts Feb 15, 2023, indefinite end, monthly billing, last payment Mar 15, 2023, next billing Apr 15, 2023.
3. **Subscription 3**: Enterprise Plan, paused, starts Jan 20, 2023, indefinite end, annual billing, last payment Jan 20, 2023, next billing Jan 20, 2024.

**Deliverables:**

1. **Database Implementation:**
    - Use the provided descriptions to create a database schema. This schema should include tables and relationships necessary to represent at least plans and subscriptions.
2. **GraphQL Queries:**
    - **List of Subscriptions Query:** A GraphQL query that retrieves a list of subscriptions, including all relevant details (status, billing dates, associated plan, etc.).
    - **List of Plans Query:** A GraphQL query that fetches the details of available plans, including price, features, and discount options.

**Instructions:**

- Focus on creating a robust and scalable database schema that can support the given use cases.
- Consider indexing, data types, and relationships for efficient querying and data integrity.
- Your GraphQL queries should efficiently interact with the database to retrieve the necessary information.

**Evaluation Criteria:**

- The practicality and efficiency of the database schema in representing the provided plan and subscription details.
- Effective use of GraphQL for data retrieval, showcasing an understanding of query design.
- Attention to detail in terms of data types, relationships, indexing, and constraints in the database schema.
- Scalability and flexibility of the database design to accommodate future requirements or changes.