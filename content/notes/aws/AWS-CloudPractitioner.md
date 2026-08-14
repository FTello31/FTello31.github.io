---
title: AWS Cloud Practitioner
description: Introduction to cloud computing and AWS.
publishDate: 2026-08-08
course: aws
order: 1
---

# AWS Cloud Practitioner

Finished: No
Migrado: No
Status: Done

<a href="/notes/aws/aws-cloudpractitioner/files/Preguntas_AWS.xlsx" download>Descargar preguntas AWS (.xlsx)</a>

[Cost and Management.pdf](/notes/aws/aws-cloudpractitioner/files/Cost_and_Management.pdf)

[aws-overview (1).pdf](/notes/aws/aws-cloudpractitioner/files/aws-overview_(1).pdf)

[AWS_Cloud_Best_Practices.pdf](/notes/aws/aws-cloudpractitioner/files/AWS_Cloud_Best_Practices.pdf)

# What is cloud computing

Cloud computing is the on-demand delivery of compute power, database, storage, applications, and other IT resources through a cloud services platform via the Internet with pay-as-you-go pricing.

The practice of using a network of remote servers hosted on the internet to store, manage, and process data, rather than a local server or a personal computer

On premise:

- You own the serves
- You hire the it people
- Pay or rent real estate
- Take all the risk

Cloud provider:

- Someone else owns the servers
- Someone else hires the IT people
- You are responsible for your configuring cloud services and code

# Six advantages and benefits of cloud computing

1. **Trade upfront expense for variable expense**: No upfront-cost (data centers, physical servers, and other resources that you would need to invest in before using computing resources.). Pay on-Demand
2. **Benefit from massive economies of scale**: you are sharing the cost with other customers to get unbeatable savings
3. **Stop guessing capacity**: Instead of paying for idle or underutilized servers, you can scale up or down to meet the current need
4. **Increase speed and agility**: launch resource within a few clicks in minutes. (The flexibility of cloud computing makes it easier for you to develop and deploy applications.)
5. **Stop spending money on running and maintaining data centers** (traditional data centers requires you to spend more money and time managing infrastructure and servers.**)**
6. **Go global in minutes**: deploy your app in multiple regions around the world with a few clicks

# The Well-Architected Framework is based on five pillars:

- Operational excellence
- Security
- Reliability: Recover from infrastructure or service disruptions, Dynamically acquire computing resources to meet demand
- Performance efficiency
- Cost optimization

# Six core perspectives of the Cloud Adoption Framework

The **Business**, **People**, and **Governance** Perspectives focus on business capabilities, whereas the **Platform**, **Security**, and **Operations** Perspectives focus on technical capabilities.

# Types of cloud computing

- **SaaS**: Software as a Service, completed product that is run and managed by the service provider like salesforce, gmail, office 365
- **PaaS**: Platform as a Service, removes the need for your organization to manage the underlying infrastructure. Focus on the deployments. It’s for developers. Like Heroku, app engine
- **IaaS**: Infrastructure as a Service, the basic building blocks for cloud IT. AWS, GCP, Azure

# Cloud computing deployment models

1. **Cloud**: A cloud-based application is fully deployed in the cloud and all parts of the application run in the cloud.
2. **Hybrid**: Connect cloud-based resources to on-premises infrastructure
3. **Onpremise**: using virtualization and resource management tools. Sometimes called private cloud.

# 6 Migration strategies

When migrating applications to the cloud, six of the most common [migration strategies](https://aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/) that you can implement are:

- **Rehosting:** also known as “lift-and-shift” involves moving applications without changes.
- **Replatforming:** involves making a few cloud optimizations to realize a tangible benefit. Optimization is achieved without changing the core architecture of the application.
- **Refactoring/re-architecting:** involves reimagining how an application is architected and developed by using cloud-native features
- **Repurchasing**: involves moving from a traditional license to a software-as-a-service model.
- **Retaining:** consists of keeping applications that are critical for the business in the source environment.
- **Retiring:** is the process of removing applications that are no longer needed.

# AWS Global Infrastructure

AWS serves over a million active customers in more than 190 countries. The AWS Cloud operates in over 77 Availability Zones within over 24 geographic Regions around the world, with announced plans for more Availability Zones and Regions.

## Intro and map overview

77 AZ availability zones. 24 Geographic Regions.  Customers in more than 190 countries

- **Regions**: physical location in the world with multiple AZs
- **Availability** **Zones**: one or more discrete data centers
- **Edge** **location**: datacenter owned by a trusted partner of AWS

## Regions

- An AWS Region is a physical location in the world where we have multiple Availability Zones
- A **geographically distinct** location which has multiple datacenters.
- Every region is physically isolated from and independent of every other region
- Each region has at least 2 AZs
- AWS largest region is US-EAST

Selecting a Region

- **Compliance with data governance and legal requirements:** Depending on your company and location, you might need to run your data out of specific areas
- **Proximity to your customers**: Selecting a Region that is close to your customers will help you to get content to them faster.
- **Available services within a Region:** Sometimes, the closest Region might not have all the features that you want to offer to customers.
- **Pricing**:

## Availability Zones

- Availability Zones consist of one or more discrete data centers within a Region, each with redundant power, networking, and connectivity, housed in separate facilities
- An AZ is a datacenter owned and operated by AWS in which AWS services run
- AZs are represented by a Region Code, followed by a letter identifier. Us-east-1a
- Multiple AZ distributing your instances across multiple AZ allows failover configuration for handling requests when one goes down
- <10ms latency between AZs

## Edge locations

An edge location is a site that Amazon CloudFront uses to store cached copies of your content closer to your customers for faster delivery.

- An edge location is a datacenter owned by a trusted partner of AWS which has a direct connection to the AWS network
- These locations serve requests for cloudFront and Route 53.
- This allows for low latency no matter where the end user is geographically located.

### CloudFront

Use as a CDN (content distribution network). Copy your content to servers around the world

## GovCloud Regions

- AWS GovCloud regions allow customer to host sensitive controlled unclassified information and other types of regulated workloads
- Only operated by employees who are US citizens
- Only accessible to US entities

# EC2 Pricing Model

## 1.On demand

Are ideal for short-term, irregular workloads that cannot be interrupted.

- No upfront cost. Only charged by the hour o by the minute.
- Is for Applications where the workload is for short term, spikey or unpredictable.

## 2.Reserved instances (RI)

BEST FOR LONG-TERM

Designed for applications that have a steady-state, predictable usage or require reserved capacity. You can purchase Standard Reserved and Convertible Reserved Instances for a 1-year or 3-year term, and Scheduled Reserved Instances for a 1-year term.

**Class:**

- Standard: 75% reduced compared to on demand. Cannot change RI Attributes
- Convertible: 54 % reduced compared to on demand. Allows you to change RI attributes if greater or equal in value
- Scheduled: you reserve instances for specific time periods. Eg. Once a week for a few hours

**Term:** you commit to a 1 year or 3-year contract. The longer the term the greater savings

**Payment options:**

- All upfront:
- Partial upfront:
- No upfront: pay at the end of the month

RIs can be shared between multiple accounts within an org

Unused RIs can be sold in the Reserved instance marketplace

## 3.Spot Instances

BIGGEST SAVINGS

Are ideal for workloads with flexible start and end times, or that can withstand interruptions.

- Aws has unused compute capacity that they want to maximize the utility of their idle servers.
- Spot instances provide a discount of 90% compared to On-demand pricing
- Spot instances can be terminated if the computing capacity is needed by on demand customers
- Designed for applications that have flexible start and end times.

AWS Batch is an easy and convenient way to use spot pricing

- Instances can be terminated by AWS at anytime
- If your instance is terminated by AWS, you don’t get charged for a partial hour o usage
- If you terminate an instance you will still be charged for any hour that it ran

## 4.Dedicated Host instances

MOST EXPENSIVE

Are physical servers with Amazon EC2 instance capacity that is fully dedicated to your use.

- Designed to meet regulatory requirements. When you have strict server-bound licensing that won’t support multitenancy or cloud deployments.
- Offered in both: on-demand and reserved (70% off on demand pricing)
- Enterprises and large organizations may have security concerns or obligations about against sharing the same hardware with other AWS Customers.

**Multitenant**: when multiple customers are running workloads on the same hardware, virtual isolation is what separate customer

**Single tenant**: single customer has dedicated hardware. Physical isolation is that separates customers

# EC2 pricing –cheatsheet

EC2 has 4 pricing models On-demand, spot, Reserved instances (RI) and dedicated.

On demand (least commitment):

- Low cost and flexible
- Only pay per hour
- Ideal when your workloads cannot be interrupted.
- Use Case: short term, spiky, unpredictable workloads, first time apps

Reserved instances up to 75% off (Best long-term value)

- Use case: steady state or predictable usage
- Can resell unused reserved instances (Reserved instance marketplace
- Reduced pricing is based on Term x Class offering x Payment option
- Payment terms 1 year to 3 year
- Payment options: all upfront, partial upfront, and no upfront
- Class offerings
    - Standard: up to 75% reduced pricing compared to on-demand. Cannot change RI arributes
    - Convertible: up to 54% reduced pricing compared to on-demand. Allows you to change RI Attributes if greater or equal in value
    - Scheduled: you reserve instances for specific time periods

Spot pricing up to 90%(Biggest Savings)

- Request spare computing capacity
- Flexible start and end times
- Use case: can handle interruptions (server randomly stopping and starting
- Use case: for non-critical backgrounds jobs
- Instances can be terminated by AWS at anytime
- If your instance is terminated by AWS, you don’t get charged for a partial hour o usage
- If you terminate an instance you will still be charged for any hour that it ran

Dedicated hosting (most expensive)

- Dedicated servers
- Can be on demand or reserved
- Use case: when you need a guarantee of isolate hardware (enterprise requirements)

# Billing and pricing

## AWS Free Tier

The AWS Free Tier enables you to begin using certain services without having to worry about incurring costs for the specified period.

Three types of offers are available:

- **Always** **Free**: For example, AWS Lambda allows 1 million free requests and up to 3.2 million seconds of compute time per month. Amazon DynamoDB allows 25 GB of free storage per month.
- **12 Months Free**: Examples include specific amounts of Amazon S3 Standard Storage, thresholds for monthly hours of Amazon EC2 compute time, and amounts of Amazon CloudFront data transfer out.
- **Trials**: For example, Amazon Inspector offers a 90-day free trial. Amazon Lightsail (a service that enables you to run virtual private servers) offers 750 free hours of usage over a 30-day period.

## Free Services

Certain services are free themselves, but the resources they setup will cost you

- IAM – identity access management,
- Amazon VPC,
- Organizations &Consolidated Billing,
- Aws Cost Explorer

Can provision AWS Services which cost money:

- AutoScaling,
- Cloudformation,
- Elastic Beanstalk,
- Opsworks,
- Amplify,
- AppSync,
- CodeStar,

## AWS Support Plans

- **Basic** $0 USD email support only for billing and account. Free for all AWS customers.
    - **Y**ou have access to a limited selection of AWS Trusted Advisor checks.
    - You can use the AWS Personal Health Dashboard, a tool that provides alerts and remediation guidance when AWS is experiencing events that may affect you.
- **Developer** $20 USD tech support via email less than 24 hrs.
    - Best practice guidance
    - Client-side diagnostic tools
    - Building-block architecture support, which consists of guidance for how to use AWS offerings, features, and services together
- **Business** $100 USD tech support via chat phone 24/7 .
    - Use-case guidance to identify AWS offerings, features, and services that can best support your specific needs
    - All AWS Trusted Advisor checks
    - Limited support for third-party software, such as common operating systems and application stack components
- **Enterprise** $15 000 USD personal concierge | TAM | business critical system down < 15m.
    - Application architecture guidance, which is a consultative relationship to support your company’s specific use cases and applications
    - Infrastructure event management: A short-term engagement with AWS Support that helps your company gain a better understanding of your use cases. This also provides your company with architectural and scaling guidance.
    - A Technical Account Manager (TAM): They provide guidance, architectural reviews, and ongoing communication with your company as you plan, deploy, and optimize your applications. Your TAM provides expertise across the full range of AWS services. They help you design solutions that efficiently use multiple services together through an integrated approach.

## AWS Marketplace

Is a curated digital catalogue with thousands of software listings from independent software vendors. You can use AWS Marketplace to find, test, and buy software that runs on AWS. The product can be free to use or can have an associated charge

Products can be offered as

- Amazon machine images (AMIs)
- AWS Cloud Formation templates
- SaaS offerings
- Web ACL
- AWS WAF rules

## AWS Trusted Advisor

When you access the Trusted Advisor dashboard on the AWS Management Console, you can review completed checks for cost optimization, performance, security, fault tolerance, and service limits. Advises you on security, saving money, performance, service limits and fault tolerance

*Think of it like an automated checklist of best practices on AWS*

FREE and developer – **7 Trusted Advisor checks**

Business, enterprise – **all trusted advisor checks**

Category:

- **Cost optimization**: idle Load balancers, unassociated elastic IP addresses, etc.
- **Performance**: High utilization amazon EC2 Instances, etc.
- **Security**: MFA on Root Account, IAM Access key Rotation, etc.
- **Fault Tolerance**: Amazon RDS Backups, etc.
- **Service Limits**

## Consolidated Billing

The consolidated billing feature of AWS Organizations enables you to receive a single bill for all AWS accounts in your organization. By consolidating, you can easily track the combined costs of all the linked accounts in your organization.

- One bill for all of your accounts
- Consolidate your billing and payment methods **across** multiple AWS accounts into one bill
- You can designate one **master account** that pays the charges of all the other member accounts
- Consolidated billing is offered at no additional cost
- Use **Cost Explorer** to visualize usage for consolidated billing
- Another benefit of consolidated billing is the ability to share bulk discount pricing, Savings Plans, and Reserved Instances across the accounts in your organization.

### Consolidated Billing Volume discounts

- AWS has Volume discounts for many services.
- The more you use, the more you save
- Consolidated billing lets you take advantage of volume discounts

## AWS Cost Explorer

Let’s you visualize, understand and manage your AWS Costs and usage over time.

There are default reports and you can create your own ones

- Use forecasting to get an idea of future costs
- Choose the level of granularity (monthly or daily)
- Use **filter** and **grouping** functionalities to dig even deeper into your data

## AWS Budgets

You can create budgets to plan your service usage, service costs, and instance reservations. The information in AWS Budgets updates three times a day. This helps you to accurately determine how close your usage is to your budgeted amounts or to the AWS Free Tier limits.

- First 2 budgets are free of charge. Each bucket is 0.02 per day (20 000 budget limit)
- Plan your service usage, service costs and instance reservations
- There are cost budget, usage budget and reservations budget
- Can be tracked at the monthly quarterly or yearly levels
- Alerts support EC2 RDS Redshift and elasticache reservations
- Get notified by providing an email or chatbot

## TCO Calculator

- The Total Cost of Ownership allows you to estimate how much you would save when moving to AWS from on-premise
- Provides you a detailed set of reports that can be used in executive presentations
- The tool is for approximation purposes

## AWS Landing Zone

Solution that helps customers more quickly set up a secure, multi-account AWS environment based on AWS best practices. With the large number of design choices, setting up a multi-account environment

- Help enterprises quickly setup a secure, AWS multi account
- Provides you with a baseline environment to get started with a multi-account architecture
- AWS Account Vending Machine (AVM): Automatically provisions and configure new accounts via Service Catalog Template, Uses Single Sign on for managing and accessing accounts

## Resource Groups and tagging

- **Tags** are words or phrases that act as metadata for organizing your AWS resources
- **Resource Groups** are a collection of resources that share one or more tags
- Helps you and consolidate information based on your project and the resources that you use

## AWS quick starts

Quick Starts are built by Amazon Web Services (AWS) solutions architects and partners to help you deploy popular technologies on AWS, based on AWS best practices for security and high availability.

Prebuilt templates by AWS and AWS Partners to help you deploy popular stacks on AWS Reduce hundreds of manual procedures into just a few steps

Quick start is composed of 3 parts

1. A reference architecture for the deployment
2. AWS **Cloudformation templates** that automate and configure the deployment
3. A deployment guide explaining the architecture and implementation in detail

## AWS Cost and usage report

Generate a detailed spreadsheet, enabling you to better analyze and understand your AWS costs. You can

- Places the reports into S3
- Use Athena to turn the report into a queryable database
- Use Quicksight to visualize your billing data as graphs

# Technology Overview

## AWS Organizations and accounts

- **Organizations** allow you to centrally manage billing, control access, compliance, security and share resources across your AWS accounts. Consolidate and manage multiple AWS accounts within a central location.
- **Root** **Account** **User** is a single sign in identity that has complete access to all AWS services and resources in an account Each account has a Root Account User
- **Organization** **Units** are a group of AWS accounts within an organization which can also contain other organizational units- creating a hierarchy. You can group accounts into organizational units (OUs) to make it easier to manage accounts with similar business or security requirements. When you apply a policy to an OU, all the accounts in the OU automatically inherit the permissions specified in the policy.
- **Service control policies(SCP)** give central control over the allowed permissions for all accounts in your organization helping to ensure your accounts stay within your organization guidelines. enable you to place restrictions on the AWS services, resources, and individual API actions that users and roles in each account can access.

## AWS Networking

- **Region**: the geographical location of your network (US east 1)
- **AZ** the data center of your AWS resources within a Region
- **VPC** a logically isolated section of the AWS Cloud where you can launch AWS resources
- **Internet** **Gateway** enable access to the internet
- **Route** **Tables** determine where network traffic from your subnets are directed
- **NACLs** Acts as a firewalls at the subnet level
- **Security** **Groups** Acts as firewall at the instance level
- **Subnets** a logical partition of an IP network into multiple, smaller network segments

### Amazon Route 53

is a DNS web service. It gives developers and businesses a reliable way to route end users to internet applications hosted in AWS.

Amazon Route 53 connects user requests to infrastructure running in AWS (such as Amazon EC2 instances and load balancers). It can route users to infrastructure outside of AWS.

Another feature of Route 53 is the ability to manage the DNS records for domain names. You can register new domain names directly in Route 53.

## Database Services

- **DynamoDB**: is a key-value database NoSQL key/value database like Cassandra. DynamoDB is serverless, which means that you do not have to provision, patch, or manage servers
- **DocumentDB**: NoSQL Document database that is mongoDB compatible
- **RDS**: Relational Database Service, enables you to run relational databases in the AWS Cloud, that supports multiples engines (MySQL, Postgres, Maria DB, Oracle, SQL Server, Aurora)
    - **Aurora**: enterprise-class relational database. Amazon Aurora helps to reduce your database costs by reducing unnecessary input/output (I/O) operations. MySQL and PSQL database fully managed
    - **Aurora** **Serverless**: only runs when you need it like aws Lambda
- **Neptune**: Managed Graph Database. You can use Amazon Neptune to build and run applications that work with highly connected datasets, such as recommendation engines, fraud detection, and knowledge graphs.
- **Redshift**: is a data warehousing service that you can use for big data analytics. Columnar database, petabyte warehouse
- **Elasticache**: is a service that adds caching layers on top of your databases to help improve the read times of common requests. Redis or Mencached database

## Provisioning services

Provisioning is the allocation or creation of resources and services to a customer

- **Elastic Beanstalk**: service for deploying and scaling web applications and services developed with java, .net, php,nodejs, python, ruby, go and docker (you provide code and configuration settings)
- **OpsWorks**: configuration management service that provides managed instances of chef and puppet. Chef and Puppet are automation platforms that allow you to use code to automate the configurations of your servers.
- **CloudFormation**: infrastructure as code, JSON or YAML. Build an environment by writing lines of code.
- **AWS** **QuickStart**: pre-made packages that can launch and configure your AWS compute,network, storage, and other services required to deploy a workload on AWS
- **AWS** **Marketplace**: a digital catalogue of thousands of software listing from independent software vendors you can use to find, buy, test, and deploy software

## Computing Services

- **EC2** Elastic Compute cloud, service that provides secure, resizable compute capacity in the cloud. Highly configurable server eg. CPU, Memory, Network, OS
- **ECS** Elastic Container Service: is a fully managed container orchestration service. Docker as a Service, highly scalable, high-performance container orchestration service that supports Docker containers, pay for EC2 instances
- **Fargate** is a serverless compute engine for containers. When using AWS Fargate, you do not need to provision or manage servers. AWS Fargate manages your server infrastructure for you. Microservices where you don’t think about the infrastructure. Pay per task
- **EKS** Kubernetes as a Service: is a fully managed service that you can use to run Kubernetes on AWS. easy to deploy, manage, and scale containerized applications using Kubernbets
- **Lambda:** is a service that lets you run code without needing to provision or manage servers. serverless functions run code without provisioning or managing servers. You pay only for the compute time you consume
- **Elastic** **Beanstalk** orchestrates various AWS services, including EC2, S3, Simple Notification Service (SNS), CloudWatch, autoscaling, and Elastic Load Balancers
- **AWS** **Batch:** enables to easily and efficiently run hundreds of thousands of batch computing jobs on AWS. plans, schedules and executes your batch computing workloads across the full range of AWS compute services and features such as Amazon EC2 and Spot Instances

## Storage Services

- **S3 – Simple Storage Service**: Object Amazon S3 stores data as objects in buckets
    - **S3 Standard:** Designed for frequently accessed data, Stores data in a minimum of three Availability Zones
    - **S3 Standard-Infrequent Access (S3 Standard-IA):** Ideal for infrequently accessed data. Similar to S3 Standard but has a lower storage price and higher retrieval price
    - **S3 One Zone-Infrequent Access (S3 One Zone-IA):** Stores data in a single Availability Zone, Has a lower storage price than S3 Standard-IA
    - **S3 Intelligent-Tiering:** Ideal for data with unknown or changing access patterns, Requires a small monthly monitoring and automation fee per object
- **S3 Glacier**: low cost storage for archiving and long term backup. Low-cost storage designed for data archiving. Able to retrieve objects within a few minutes to hours
    - **S3 Glacier Deep Archive**: Lowest-cost object storage class ideal for archiving, Able to retrieve objects within 12 hours
- **Storage Gateway**: hybrid cloud storage with local caching. File Gateway, Volume Gateway, Tape Gateway
- **EBS Elastic Block Storage**: service that provides block-level storage volumes. *hard drive in the cloud* you attach to EC2 instances. SSD, IOPS SSD, Throughput HHD. Cold HHD. An Amazon EBS volume stores data in a single Availability Zone. To attach an Amazon EC2 instance to an EBS volume, both the Amazon EC2 instance and the EBS volume must reside within the same Availability Zone.
- **EFS – Elastic File Storage**: file storage mountable to multiple EC2 instances at the same time. Amazon EFS is a regional It stores data in and across multiple Availability Zones.
- **Snowball**: physically migrate lots of data via a computer suitcase
    - **Snowball** **Edge Storage Optimized:** Storage: 80 TB HDD, 1 TB of SATA SSD, o Compute: 40 vCPUs, and 80 GiB of memory
    - **Snowball** **Edge Compute Optimized:** 42-TB usable HDD 7.68 TB of usable NVMe SSD, Compute: 52 vCPUs, 208 GiB of memory
- **Snowmobile**: Shipping container, pulled by a semi-trailer truck- 100 PB
- **Snowcone** is a small, rugged, and secure edge computing and data transfer device. (2 CPUs, 4 GB of memory, and 8 TB of usable storage.)

## Business Centric Services

- **Amazon Connect**: Call Center – Cloud based call center service you can setup in a few clicks.
- **WorkSpaces**: Virtual remote Desktop – Secure managed service for provisioning either windows or linux desktops in just a few minutes which quickly scales up to thousands of desktops
- **WorkDocs**: a content creation and collaboration service – easily create edit and share content saved centrally in AWS (the AWS version of Sharepoint)
- **Chime**: AWS Platform for online meetings, video conferencing, and business calling which elastically scales to meet your capacity needs
- **WorkMail**: managed business email, contacts and calendar service with support for existing desktop and mobile email client applications (IMAP)
- **Pinpoint**: Marketing campaign management system you can use for sending targeted email, SMS, push notifications and voice messages
- **SESSimple Email Service**: a cloud based email sending service designed for marketers and applications developers to send marketing notification and emails
- **QuickSight**: a business intelligence BI service. Connect multiple datasource and quickly visualize data in the form of graphs with little to no programming knowledge

## Enterprise integration (going hybrid)

- **Direct Connect**: enables you to establish a dedicated private connection between your data center and a VPC. Dedicated gigabit network connection from –your premises to AWS Imagine having a direct fibre optic cable running straight to AWS
- **VPN**: establish a secure connection to your AWS network
    - **Site to site VPN**: Connecting your on-premise to your AWS network
    - **Client VPN**: Connecting a Client (a Laptop) to your AWS network
- **Storage Gateway**: a hybrid storage service that enables your on-premises applications to use AWS cloud storage. You can use this for backup and archiving, disaster recovery, cloud data processing, storage tiering, and migration
- **Active Directory**: the AWS directory service for Microsoft active directory also known as AWS Managed Microsoft AD -

## Logging services

- **CloudTrail**: records API calls for your account. The recorded information includes the identity of the API caller, the time of the API call, the source IP address of the API caller, and more. logs all API calls (SDK, CLI) between AWS services. Detect developer misconfigurations, detect malicious actors, automate responses.
    - Within CloudTrail, you can also enable **CloudTrail Insights**. This optional feature allows CloudTrail to automatically detect unusual API activities in your AWS account
- **CloudWatch**: enables you to monitor and manage various metrics and configure alarm actions based on data from those metrics. Is a collection of multiple services
    - CloudWatch **Logs:** Performance data about AWS Services. Eg CPU Utilization, Memory, Network in application logs. Rails, Nginx, Lambda logs
    - CloudWatch **Metrics:** Represents a time-ordered set of data points. A variable to monitor
    - CloudWatch **Events:** trigger an event based on a condition eg. Every hour take snapshot of server
    - CloudWatch **Alarms:** triggers notifications based on metrics
    - CloudWatch **Dashboard:** create visualizations based on metrics

## Know your initialisms

- **IAM** Identity and Access Management
- **S3** Simple Storage Service
- **SWF** Simple Workflow Service
- **SNS** Simple Notification Service
- **SQS** Simple Queue Service
- **SES** Simple Email Service
- **SSM** Simple Systems Manager
- **RDS** Relational Database Service
- **VPC** Virtual Private Cloud
- **VPN** Virtual Private Network
- **CFN** CloudFormation
- **WAF** Web Application Firewall
- **MQ** Amazon ActiveMQ
- **ASG** Auto Scaling Groups
- **TAM** Technical Account Manager
- **ELB** Elastic Load Balancer
- **ALB** Application Load Balancer
- **NLB** Network Load Balancer
- **EC2** Elastic Cloud Compute
- **ECS** Elastic Container Service
- **ECR** Elastic Container Repository
- **EBS** Elastic Block Storage
- **EFS** Elastic File Storage
- **EMR** Elastic MapReduce
- **EB** Elastic Beanstalk
- **ES** Elasticsearch
- **EKS** Elastic Kubernetes Service
- **MKS** Managed Kafka Service
- **loT** Internet of Things
- **RI** Reserved Instances

# Security

## Shared Responsibility model (IN vs OF)

Customers are responsible for security **in** the cloud

**IN**: Data, configuration

**OF**: Hardware, operation of managed services, global infrastructure

AWS is responsible for security **of** the cloud

![Untitled](AWS%20Cloud%20Practitioner/Untitled.png)

## AWS Compliance programs

Compliance programs: **a set of internal policies and procedures** of a company to comply with laws, rules, and regulations or to uphold business reputation. Eg.

- Health Insurance Portability and accountability Act (HIPAA)
- The payment card industry data security standard (PCI DSS)

## AWS Artifact

service that provides on-demand access to AWS security and compliance reports and select online agreements

- No cost, self-service portal for on demand access to AWS compliance reports.
- On-demand **access to AWS security and compliance reports** and select online agreements.
- These checks are based on global compliance frameworks
1. **AWS Artifact Agreements:** Suppose that your company needs to sign an agreement with AWS regarding your use of certain types of information throughout AWS services. You can do this through AWS Artifact Agreements.
2. **AWS Artifact Reports:** suppose that a member of your company’s development team is building an application and needs more information about their responsibility for complying with certain regulatory standards. You can advise them to access this information in AWS Artifact Reports.

## Amazon Inspector

Amazon Inspector helps to improve the security and compliance of applications by running automated security assessments. It checks applications for security vulnerabilities and deviations from security best practices. After Amazon Inspector has performed an assessment, it provides you with a list of security findings. The list prioritizes by severity level, including a detailed description of each security issue and a recommendation for how to fix it.

How do we prove an EC2 instance is harden?  **Hardening**: the act of eliminating as many security risks as possible

**AWS** **Inspector runs a security benchmark against specific EC2 instances**. You can run a variety of security benchmarks.

Can perform both Network and Host assessments

- Install the AWS agent on your EC2 instances
- Run an assessment for your assessment target
- Review your findings and remediate security issues.

One very popular benchmark you can run is by CIS which has 699 checks

## AWS WAF

Is a web application firewall that lets you monitor network requests that come into your web applications.

- AWS Web Application Firewall **protect your web applications from common web exploits**.
- **Write your own rules to allow or Deny traffic** based on the contents of an HTP requests
- Use a **ruleset** from a trusted AWS Security partner in the AWS WAF rules Marketplace
- WAF can be **attached** to either **CloudFront** or an **Application Load Balancer**

Protect web applications from attacks covered in the OWASP TOP 10 most dangerous attacks

1. Injection
2. Broken Authentication
3. Sensitive data exposure
4. XML External Entities
5. Broken Access Control
6. Security misconfigurations
7. Cross Site Scripting (XSS)
8. Insecure Deserialization
9. Using components with known vulnerabilities
10. Insufficient logging and monitoring.

## AWS Shield

is a service that protects applications against DDoS attacks

AWS shield is a managed **DDoS** (Distributed Denial of Service) **protection service** that safeguards applications running on AWS

What is a DDOS attack? A malicious attempt to disrupt normal traffic by flooding a website a large amount of face traffic

All AWS customers benefit from the automatic protections of AWS Shield Standard, at no additional charge

When you route your traffic through **Route53** or **CloudFront** you are using AWS Shield Standard

Protects you against Layer 3, 4 and 7 attacks

- 7 applications
- 4 transport
- 3 network.

Levels:

1. **Standard**: automatically protects all AWS customers at no cost. It protects your AWS resources from the most common, frequently occurring types of DDoS attacks.
2. **Advanced**: is a paid service that provides detailed attack diagnostics and the ability to detect and mitigate sophisticated DDoS attacks.

### Shield Standard (Free)

For protection against most common DDoS attacks and access to tools and best practices to build a DDos resilient architecture. Automatically available on all AWS services.

### Shield advanced ( 3000 USD/ year)

For additional protection against larger and more sophisticated attacks, visibility into attacks and 24x7 access to DDoS experts for complex cases

Available on

- Amazon route 53
- Amazon cloudFront
- Elastic Load Balancing
- AWS Global accelerator
- Elastic IP (Amazon Elastic Compute cloud and network load balancer)

## Penetration Testing

What is penTesting? AN authorized simulated cyberattack on a computer system, performed to evaluate the security of the system.

Can you perform PenTesting on AWS ? **YES**

Permitted services

- EC2 instances, Nat Gateways, and ELB
- RDS
- Cloudfront
- Aurora
- API Gateways
- AWS Lambda and Lambda@Edge functions
- Lightsail resources
- Elastic Beanstalk environments

Prohibited Activities

- DNS zone walking via Amazon Route 53 Hosted Zones
- Denial of service Dos, Distributed Denial of service ( DDos), Simulated Dos, Simulates DDoS
- Port flooding
- Protocol flooding
- Request flooding (login request flooding, API request flooding)

For other simulated Events you will need to submit a request to AWS. A reply could take up to 7 days

## Amazon GuardDuty

Is a service that provides intelligent threat detection for your AWS infrastructure and resources. It identifies threats by continuously monitoring the network activity and account behavior

***What is IDS/IPS?*** Intrusion detection System and Intrusion Protection System. A device or software application that monitors a network or systems for malicious activity or policy violations

***How do we detect if someone is attempting to again access to our AWS account or resources?*** **Guard Duty** is a **threat detection service** that continuously monitors for malicious, suspicious activity and unauthorized behavior. It uses Machine Learning to analyze the following AWS logs:

- CloudTrail Log
- VPC Flow Logs
- DNS logs

It will alert you of Findings which you can automate an incident response via CloudWatch Events or with 3rd Party Services

## Key Management Service (KMS)

enables you to perform encryption operations through the use of cryptographic keys.

A managed service that makes it easy for you to create and control the encryption keys used to encrypt your data

- KMS is a multi-tenant HSM (Hardware security module)
- Many AWS services are integrated to use KMS to encrypt your data with a simple checkbox
- KMS uses envelope encryption

**Envelope Encryption**

When you encrypt your data, your data is protected, but you have to protect your encryption key. When you encrypt your data with a master key as an additional layer of security

## Amazon Macie

Amazon Macie is a fully managed data security and data privacy service that uses machine learning and pattern matching to discover and protect your sensitive data in AWS.

Macie is a fully managed service that continuously monitors S3 data access activity for anomalies, and generates detailed alerts when it detects risk of unauthorized access or inadvertent data leaks

Macie works by uses Machine Learning to Analyze your cloudTrail Logs

Macie will identify your most at-risk users which could lead to a compromise

Macie has a variety of alerts

- Anonymized Access
- Config compliance
- Credential loss
- Data compliance
- File hosting
- Identity enumeration
- Information Loss
- Location Anomaly
- Open Permissions
- Privilege Escalation
- Ransomware
- Service disruption
- Suspicious Access

## Security groups vs NACLs

**Security groups**

is a virtual firewall that controls inbound and outbound traffic for an Amazon EC2 instance. Security groups perform stateful packet filtering. They remember previous decisions made for incoming packets.

- Acts as a firewall at the instance level
- Implicitly denies all traffic. You create Allow rules.

Eg. Allow an Ec2 instance ace mss on port 22 for SSH

**NACLs (Network Access control lists)**

is a virtual firewall that controls inbound and outbound traffic at the subnet level.  Network ACLs perform stateless packet filtering. They remember nothing and check packets that cross the subnet border each way: inbound and outbound

- Acts as a firewall at the subnet level
- You create allow and deny rules
1. Block a specific IP address known for abuse

## AWS VPN

Let’s you establish a secure and private tunnel from your network or device to the AWS global network

- **AWS Site-to-Site VPN:** Securely connect **on-premises** network or branch office site **to VPC**
- **AWS Client VPN**: securely connect **users to AWS** or on-premises networks

# Variation Study

## Cloud Services

Similar names, completely different services

- **CloudFormation**: infrastructure as code, set IP services via templating script eg. Yml,json
- **CloudTrail**: logs all api calls between AWS services
- **CloudFront**: Content Distribution Network, it creates a cached copy of your website and copies to servers located near people trying download website
- **CloudWatch**: is a collection of multiple services cloudwatch logs, metrics, events, alarms, dashboard
- **CloudSearch**: search engine, you have an ecommerce website and you want to add a search bar

## Connect Service

- **Direct connect**: dedicated fiber optics connections from datacenter to AW. A large enterprise has their own datacenter and they need an insanely fast connection directly AWS. If you need to security you can apply a VPN connect on top of direct Connect
- **Amazon connect:** Call center Service. Get a toll free number, accept inbound and outbound calls, setup automated phone systems.
- **Media Connect**: New version of elastic transcoder, converts videos to different video types

## Elastic transcoder vs Media Convert

Both services transcodes videos

- **Elastic Transcoder**: The old way. Transcodes videos to streaming formats.
- **AWS Elemental mediaConvert**: the new way. Transcodes videos to streaming formats. Overlays images. Insert videos clips. Extracts captions data. Robust UI

## SNS vs SQS

The both connect apps via messages

**Simple notifications service (pass along messages eg. PubSub)**

- Send notifications to subscribers of topics via multiple protocol. Eg. HTTP, Email,SQS, SMS
- SNS is generally used for sending plain text emails which is triggered via other AWS Services. The best example of this is billing alarms.
- Can retry sending in case of failure for https
- Really good for webhooks, simple internal emails, triggering lambda functions

**Simple Queue Service (Queue Up Messages, Guaranteed Delivery)**

- Places messages into a queue. Applications pull queue using AWS SDK
- Can retain a message for up to 14 days
- Can send them in sequential order or in parallel
- Can ensure only one message is sent
- Can ensure messages are delivered at least once
- Really good for delayed tasks. Queueing up emails

## Inspector vs Trusted Advisor

Both are security tools and the both perform audits

- **Amazon Inspector**: Audits a single EC2 instance that you’ve selected. Generates a report from a long list security checks.
- **Trusted Advisors:** Trusted Advisor doesn’t generate out a PDF report. Gives you a holistic view of recommendations across multiple services and best practices**.**  You have open ports on these security groups. You should enable MFA on your root account when using trusted advisor

## ALB vs NLB vs CLB (Load Balancers)

- **Application** Layer 7 Request. HTTP and HTTPS traffic. Routing Rules, more usability from one load balancer. Can attach WAF
- **Network** Layer 4 IP protocol data. TCP and TLS traffic where extreme performance is required. Capable of handling millions of requests per second while maintaining ultra-low latencies. Optimized for sudden and volatile traffic patterns while using a single static OP address per Availability Zone
- **Classic** (old) Layer 4 and Layer 7. Intended for applications that were built within the EC2-Classic network. Doesn’t use target groups

## SNS vs SES

They both send emails

**Simple notifications service (practical and internal)**

- Send notifications to **subscribers** of topics via **multiple** **protocol**. Eg. HTTP, Email,SQS, SMS
- SNS is generally used for sending **plain text emai**ls which is triggered via other AWS Services. The best example of this is billing alarms.
- You need to know what are topics and subscriptions regarding SNS

**Simple email Service (Professional, marketing, emails)**

- A cloud based email service. Eg. SendGrid.
- SES sends html Emails. SNS cannot.
- SES can receive inbound emails
- SES can create Email Templates
- Custom domain name email
- Monitor your email reputation

## Artifact vs Inspector

Both artifact and inspector compile out PDFs

**AWS Artifact:** Why should and enterprise trust AWS?     Generates a security report that’s based on global compliance frameworks such as Service Organization Control (SOC), Payment card Industry (PCI)

**AWS Inspector:** How do we know this EC2 instance is Secure? Prove it. Runs a script that analyzes your EC2 instance, then generates a PDF report. Telling you which security checks passed. Audit tool for security of EC2 instances.

# Amazon Web Services Cloud Platform

**AWS Management Console:** Access and manage Amazon Web Services through the AWS Management Console, a simple and intuitive user interface. You can also use the AWS Console Mobile Application to quickly view resources on the go.

**AWS Command Line Interface:** The AWS Command Line Interface (CLI) is a unified tool to manage your AWS services. With just one tool to download and configure, you can control multiple AWS services from the command line and automate them through scripts.

## Analytics

- Amazon **Athena** (p. 10): query service that makes it easy to analyze data in Amazon S3. Athena is serverless
- **Amazon EMR (p. 10):** provides a managed Hadoop framework that makes it easy, fast, and cost-effective to process vast amounts of data across dynamically scalable Amazon EC2 instances. EMR Notebooks, based on the popular Jupyter Notebook, provide a development and collaboration environment for ad hoc querying and exploratory analysis.
- Amazon **CloudSearch** (p. 11): a search solution for your website or application
- Amazon **Elasticsearch** **Service** (p. 11): search, analyze, and visualize data in real-time. With Amazon Elasticsearch Service, you get easy-to-use APIs and real-time analytics capabilities
- Amazon **Kinesis** (p. 11): offers key capabilities to cost-effectively process streaming data. you can ingest real-time data such as video, audio, application logs, website clickstream. Kinesis enables you to process and analyze data as it arrives and respond instantly instead of having to wait until all your data is collected
    - Amazon **Kinesis** **Data Firehose** (p. 11): the easiest way to reliably load streaming data into data stores and analytics tools. It can capture, transform, and load streaming data, enabling near real-time analytics with existing business intelligence tools and dashboards
    - Amazon **Kinesis Data Analytics** (p. 12): easiest way to analyze streaming data, gain actionable insights, and respond to your business and customer needs in real time.
    - Amazon **Kinesis Data Streams** (p. 12): is a massively scalable and durable real-time data streaming service. KDS can continuously capture gigabytes of data per second from hundreds of thousands of sources
    - Amazon **Kinesis Video Streams** (p. 12): automatically provisions and elastically scales all the infrastructure needed to ingest streaming video data from millions of devices.
- Amazon **Redshift** (p. 12): fast, scalable data warehouse that makes it simple and cost-effective to analyze all your data across your data warehouse and data lake.
- Amazon **QuickSight** (p. 12): fast, cloud-powered business intelligence (BI) service
- AWS **Data** **Pipeline** (p. 12): web service that helps you reliably process and move data between different AWS compute and storage services, as well as on-premises data sources. AWS Data Pipeline helps you easily create complex data processing workloads that are fault tolerant, repeatable, and highly available
- AWS **Glue** (p. 13): Is a fully managed extract, transform, and load (ETL) service. You simply point AWS Glue to your data stored on AWS, and AWS Glue discovers your data and stores the associated metadata
- AWS **Lake Formation** (p. 13): is a service that makes it easy to set up a secure data lake in days. Creating a data lake with Lake Formation is as simple as defining where your data resides and what data access and security policies you want to apply. Lake Formation then collects and catalogs data from databases and object storage, moves the data into your new Amazon S3 data lake, cleans and classifies data using machine learning algorithms, and secures access to your sensitive data.
- Amazon **Managed Streaming for Apache Kafka** (Amazon MSK) (p. 13): a fully managed service that makes it easy for you to build and run applications that use Apache Kafka to process streaming data. Apache Kafka is an open-source platform for building real-time streaming data pipelines and applications.

## Application Integration

- AWS Step Functions (p. 14):
- Amazon MQ (p. 14):
- Amazon SQS (p. 14):
- Amazon SNS (p. 15):
- Amazon SWF (p. 15):

## AR and VR

## AWS Cost Management

## Blockchain

## Business Applications

## Compute Services

## Customer Engagement

## Database

## Desktop and App Streaming

## Developer Tools

## Game Tech

## Internet of Things (IoT)

## Machine Learning

## Management and Governance

## Media Services

## Migration and Transfer

## Mobile Services

## Networking and Content Delivery

## Robotics

## Satellite

## Security, Identity, and Compliance

## Storage

# SUMMARY

Cloud computing: is the on demand  delivery of IT resources through a cloud services platform
with pay as you go.

### 6 Advantages:

1. Trade upfront expense for variable expense
2. Benefit from massive economies of scale (share cost)
3. Stop guessing capacity (scale up or down to meet the need)
4. Increase speed and agility (launch resources easily).
5. Stop spending money on running and maintaining data centers (on-premise).
6. Go global in minutes

5 pillars Well-architected Framework

1. Operational excellence
2. Security
3. Reliability: Capacity of recover from disruptions and adquire resource 
4. Performance efficacy
5. Cost Optimization

6 core perspectives of cloud Adoption Framework

1. Business
2. People
3. Governance
4. Platform
5. Security
6. Operations

Technical capabilities 1, 2, 3
Business capabilities 4, 5, 6

Types of cloud Computing

- SaaS
- PaaS
- IaaS

Could Computing deployment models:

- Cloud: Cloud based applications
- Hybrid: component cloud database to on-premise infrastructure
- On-Premise: using virtualization “private cloud”

6. Migration strategies

1. Rehosting: “lift and shift” → move apps without changes
2. Replatforming: make a few cloud optimizations to realize tangible benefit
3. Refactoring / Re-architecting: involves reimagine the application using cloud-native features
4. Repurchasing: involving traditional license to a SaaS model 
5. Retaining: Keeping apps that are critical for the business
6. Retiring: Removing apps no longer needed

## AWS Global Infra

- 77 AZ
- 24 Regions
- Customers in more than 190 countries
- Edge Locations: Data Center owned by a trusted partner of AWS
- AZ = 1 or more data Center on Region < 10 ms latency

EC2 Pricing model 

- on demand
- Reserved instances : 75% - 54 %
- Spot instances: 90%
- dedicated Host instances

AWS Support plans

- Basic: 0$  Limit selection Trusted advisor checks
- Developer: $20 Best practice guidance
- Business. $10 All Tech Support. AWS trusted advisor checks
- Enterprise: 15k. Architecture guidance. Infra event management. A Technical account Manager

- AWS marketplace: digital catalogue
- AWS Trusted Advisor: Advises you on security, saving money, performance, like “an automate checklist of best practices”
- TCO calculator : Estimate how much money you would save when moving to AWS from On-premise
- AWS Landing Zone: Provides you with a baseline environment. Helps to quickly set-up a secure, multi-account AWS environments
AWS Quickstarts : Prebuilt Templates in deploy popular stacks
- AWS Route 55 : DNS Web services. Manage DNS records for Domain names
- AWS inspector: running automated security assessments on **EC2 instances** you select
- AWS Shield:protect applications against DoOs attacks. Standard o Advance
- AWS guardlete: Provides intelligent threat detection for your infrastructure
- AWS Macie: fully managed data security and data privacy service continuously monitors S3 data
- Security group (Virtual Firewall): controls inbound and outbound traffic at EC2 instance level. stateful packet filtering. Denies all traffic by default.
- NACL  (Virtual Firewall): controls inbound and outbound traffic at the subnet level. stateless

[Summary images](/notes/aws/aws-cloud-practitioner/summary-images-b736d92531764424bf8de6ccc64b1552/)
