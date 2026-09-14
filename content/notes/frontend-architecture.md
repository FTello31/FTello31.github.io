---
title: Frontend Architecture - Monoliths to Microfrontends | Frontend Masters
description: by Maxi Ferreira.
publishDate: 2026-09-10
---

# Frontend Architecture Notes

## Module Boundary Exercise

Turborepo boundaries documentation:

https://turborepo.dev/docs/reference/boundaries

### Exercise

Create a `turbo.json` inside another package and define a tag.

In the root `turbo.json`, we can use the tags created in the packages with the new boundary rules.

### What is the purpose of the Turborepo Boundaries plugin?

The Turborepo Boundaries plugin allows you to define configurations about which packages are allowed to depend on each other across different packages in a monorepo.

It checks these dependencies at the Turborepo level to enforce architectural boundaries.

### Useful Turborepo commands

```bash
npx turbo build --graph graph.mermaid
```

Generates a Mermaid dependency graph.

```bash
npx turbo devtools
```

Generates an interactive graph.

```bash
npx turbo generate
```

Generates apps or packages.

```bash
npx turbo query
```

Allows access to the Turborepo GraphQL interface.

---

# Micro Frontends

## Micro Frontends Overview

Resources:

* https://fem-c4.pages.dev/diagrams/v3/#SystemContext
* https://github.com/Charca/frontend-architecture-micro-frontends

### Architecture

The `/api` package represents the backend API.

Change the build system from **Vite** to **Rsbuild** using `RsbuildConfig` to improve the developer experience.

### Why is Rsbuild preferred over Vite for Module Federation?

Rsbuild has better support for Module Federation than Vite.

With Vite, the `dev` script and regular build workflow are not fully supported with Module Federation. This can require using the preview build and rebuilding whenever changes need to be tested.

Rsbuild supports development mode directly, providing a better developer experience.

### What are two main limitations of a monorepo architecture that might require moving to microfrontends?

1. **CI pipeline bottlenecks**

   Builds can become very slow, and if only one release can happen at a time, teams contributing to the same codebase can create deployment queues.

2. **No runtime code sharing**

   Components in a traditional monorepo are generally composed at build time rather than being independently loaded and shared at runtime.

---

## When to Use Microfrontends

A useful rule of thumb is:

> Adopt microfrontends when the cost of coordinating your monolith becomes higher than the cost of managing a distributed architecture.

Both costs increase as an application grows.

At some point, the complexity introduced by microfrontends may become worthwhile because it reduces organizational and deployment coordination problems.

---

## How Can We Split the Application?

There are several possible approaches:

* Vertical split
* Horizontal split
* Combination of vertical and horizontal splits

### Vertical Split

Split the application based on routes.

For example:

```text
/catalog
/dashboard
/settings
```

Each major route or section can become its own microfrontend.

### Horizontal Split

Split a single page into multiple independently deployed applications.

For example:

```text
Dashboard Page
├── Header
├── Analytics Microfrontend
├── Notifications Microfrontend
└── Recommendations Microfrontend
```

### Vertical vs Horizontal Split

**Vertical split** means splitting by route, where each main section, such as a catalog or dashboard, becomes its own microfrontend.

**Horizontal split** means splitting within a single view, where different parts of the same page are deployed as separate microfrontends while the rest of the page lives in the app shell.

---

## Important Microfrontend Architecture Questions

### Where does routing happen?

Possible locations:

* Client
* Server
* Edge

### Where does rendering happen?

Possible locations:

* Client
* Server
* Edge

### Where does composition happen?

Possible locations:

* Client
* Server
* Edge
* Build time

### How much isolation do we need?

Different approaches provide different levels of isolation.

---

## Flavors of Microfrontends

Possible implementation approaches include:

* iframes
* Web Components
* Edge-Side Includes
* Import Maps
* Fragment orchestration
* Route-based orchestration
* Module Federation
* Native Federation

### Fragment Orchestration

Examples:

* Single-SPA
* Piral
* Cloudflare Fragments

### Route-Based Orchestration

Examples:

* Cloudflare Workers
* Next.js Multi-Zones
* DIY server-side routing

### Runtime Composition

Examples:

* Module Federation
* Native Federation

---

# Module Federation

## Introduction

Module Federation is both:

* an architectural pattern
* an implementation mechanism

Its main benefit is allowing **independently deployed applications to share code at runtime**.

### Setup

```bash
git checkout main
```

Install Module Federation runtime tools:

```bash
npm install @module-federation/runtime-tools
```

### Architecture

The **app shell** acts as the **host**.

The host loads the different microfrontends.

For example:

```text
App Shell
   │
   ├── Analytics
   ├── Catalog
   └── Profile
```

The **Analytics app** can act as a **remote**.

---

## Configuring a Module Federation Remote

Update:

```text
analytics/rsbuild.config.js
```

Define Module Federation configuration.

### `name`

Defines the name of the remote.

Example:

```js
name: "analytics"
```

### `filename`

Defines the file generated with information that allows a host to load the remote.

The conventional name is:

```text
remoteEntry.js
```

### `exposes`

Defines which modules the remote makes available to other applications.

Example conceptually:

```js
exposes: {
  "./Analytics": "./src/Analytics"
}
```

The key is how the host refers to the exposed module.

The key does not need to match the actual file path.

### `shared`

Defines which dependencies the remote is willing to share with the host or other remotes.

---

## Import a Federated Module

### What is the difference between `shared` dependencies in Module Federation and `externals` in `package.json`?

`externals` means a package will **not bundle a dependency**, and whoever consumes the package must provide that dependency.

Module Federation `shared` dependencies involve **runtime negotiation** between the host and remote.

They can negotiate:

* which dependency version should be used
* whether the same dependency instance should be shared
* whether multiple versions can coexist

---

## Why can't standard ES6 imports be used for Module Federation remotes?

Standard ES6 imports such as:

```js
import Analytics from "./Analytics";
```

are resolved at **build time**.

Module Federation needs to load remote applications at **runtime**.

Therefore, dynamic imports are required.

For example:

```js
const Analytics = React.lazy(() => import("analytics/Analytics"));
```

---

## What is the purpose of `remoteEntry.js`?

The remote entry file is loaded by the host application to access modules exposed by a remote application.

It allows the host to consume modules from an application that:

* is built independently
* is deployed independently
* can change independently

---

## Deploying Microfrontends Without Module Federation

A simple method is to use:

* iframes for horizontal splits
* reverse proxying for vertical splits

Applications can run on independent ports.

For example:

```text
localhost:3000 → App Shell
localhost:3001 → Analytics
localhost:3002 → Catalog
```

A server or reverse proxy such as **Nginx** can route requests to the correct application while presenting a seamless experience to the user.

---

# Microfrontend Communication

## Communication Options with Module Federation

```bash
git checkout module-federation-1
```

Possible communication mechanisms include:

* Props
* Context
* Custom Events
* Message Bus
* Signals
* Atoms / Nanostores

### Props

The host can pass properties directly to a federated component.

```text
Host
  ↓ props
Remote Component
```

This is simple but can increase coupling.

### Context

If the host and remote use the same framework, such as React, they can share context because they participate in the same component tree.

Possible options include:

* React Context
* lifting state up
* shared providers

### Custom Events

Applications communicate through browser events.

Example conceptually:

```js
window.dispatchEvent(
  new CustomEvent("userUpdated", {
    detail: user,
  })
);
```

### Message Bus

A shared message bus can allow applications to publish and subscribe to events without directly depending on each other.

### Signals / Atoms

Lightweight state-management solutions can expose reactive state between microfrontends.

Example:

* Nanostores

---

## Why should you avoid relying too heavily on props?

Relying heavily on props causes microfrontends to become coupled together.

The more information that must be passed between applications:

```text
Host
 ↓
Remote A
 ↓
Remote B
 ↓
Remote C
```

the less independently those applications can evolve.

This works against one of the main goals of microfrontend architecture: **independent development and deployment**.

---

## Exposing Multiple Components

### How do you expose multiple components from a Module Federation remote?

A single remote application can expose multiple components through its Module Federation configuration.

For example:

```js
exposes: {
  "./Dashboard": "./src/Dashboard",
  "./Chart": "./src/Chart",
  "./Filters": "./src/Filters"
}
```

The remote remains a single deployed application while exposing multiple modules.

---

## `federation.d.ts`

### What is the purpose of creating a `federation.d.ts` file?

The `federation.d.ts` file provides TypeScript definitions for components imported from Module Federation remotes.

Without these definitions, TypeScript does not know the types of dynamically imported remote modules.

For example:

```ts
declare module "analytics/Analytics";
```

This prevents TypeScript errors when importing federated components.

---

# Sharing State Between Microfrontends

## Nanostores

Nanostores can be used for state management across microfrontends.

### Primary advantage

Nanostores allows a microfrontend to **own its own state** while exposing that state to:

* the host
* other microfrontends

It provides small atomic stores that keep applications relatively decoupled.

It is also lightweight and simple.

---

## Why is imported state asynchronous?

State imported from a microfrontend is loaded at runtime using a dynamic import.

Therefore, accessing the state is asynchronous.

Example:

```js
const store = await import("remote/countState");
```

The application needs to wait until the remote module has been loaded.

---

## Controlling State Mutation

Example file:

```text
count.state.ts
```

We can expose the entire state object.

However, this would allow other microfrontends or the host to mutate the state directly.

A better option can be to expose only controlled functions or listeners.

For example:

```text
Remote owns state
      │
      ├── read()
      ├── subscribe()
      └── controlled actions
```

Instead of:

```text
Host
  ↓
directly mutates Remote state
```

This protects ownership of the state and reduces coupling.

---

# Module Federation 2.0

## New Features

Important Module Federation 2.0 features include:

* Dynamic type safety
* Manifest protocol
* Dynamic remote registration
* Module Federation DevTools
* Framework-independent Module Federation plugins

---

## Dynamic Type Safety

Module Federation 2.0 can automatically generate TypeScript declarations for exposed remote modules.

It uses a DTS generation process.

Instead of manually writing files such as:

```text
federation.d.ts
```

Module Federation can automatically generate definitions into an MF types directory.

Benefits include:

* less manual maintenance
* fewer type mismatches
* better IDE support
* safer remote imports

Check:

```text
tsconfig.json
```

to ensure the generated definitions are correctly included.

---

## Manifest Protocol

Module Federation 2.0 can generate:

```text
mf-manifest.json
```

This manifest contains information about the microfrontend and its exposed modules.

It standardizes how microfrontends can be discovered and consumed.

---

## Dynamic Remote Registration

Older Module Federation setups commonly define remotes at build time.

Module Federation 2.0 allows remotes to be registered dynamically at runtime.

Conceptually:

```text
Host starts
   │
   ↓
Discover available remotes
   │
   ↓
Register remote dynamically
   │
   ↓
Load remote component
```

This provides more flexibility for independently deployed microfrontends.

---

# Microfrontend Version Management

Important topics:

* Microfrontend version management
* Frontend service discovery
* Module Federation manifests

Frontend Discovery Service:

https://github.com/awslabs/frontend-discovery-service

Other relevant files and schemas:

```text
microfrontend.json
mf-manifest.json
mf-manifest.json.schema
```

---

## What makes microfrontend version management more complicated?

Version management becomes significantly more complicated when **remotes depend on other remotes**.

Simple architecture:

```text
Host
 ├── Remote A
 ├── Remote B
 └── Remote C
```

More complicated architecture:

```text
Host
 ├── Remote A
 │      └── Remote B
 │             └── Remote C
 └── Remote D
```

Now version management must account for:

* host → remote dependencies
* remote → remote dependencies
* compatible versions
* deployment timing
* dependency chains

---

# Frontend Architecture

## Introduction

Course repository:

https://github.com/Charca/fem-frontend-architecture

Instructor: Maxi Ferreira.

### What is software architecture?

Software architecture can be thought of as:

> The decisions you wish you could get right early in the project.

More formally, software architecture is the set of significant design decisions about how software is organized in order to promote desired quality attributes and other system properties.

---

## Four Pillars of Software Architecture

1. Architectural Style
2. Architectural Characteristics
3. Architectural Decisions
4. Logical Components

Related concepts:

* ADRs
* Architectural drivers
* Harness Engineering

---

## Architectural Drivers

### What are architectural drivers?

Architectural drivers are factors that influence architectural decisions.

They include:

* Business goals
* Quality attributes
* Technical constraints
* Business constraints
* Architecturally significant functional requirements
* Team experience
* Technology trends

### Quality attributes

Examples:

* Performance
* Maintainability
* Scalability
* Availability
* Security
* Testability

### Constraints

Examples:

* Deployment platform
* Budget
* Time
* Existing technology stack
* Regulatory requirements

These drivers are transformed into requirements that guide architectural decisions.

---

# Architectural Decision Records

## ADRs

Architectural Decision Records are documents that capture important architectural decisions.

An ADR generally records:

* Context
* Decision
* Alternatives considered
* Consequences
* Reasoning

---

## ADRs and AI Development

ADRs become increasingly important with AI-assisted development because they provide **context engineering** for AI agents.

AI agents need to understand not only:

```text
What does the code do?
```

but also:

```text
Why was the architecture designed this way?
```

ADRs document architectural intent so autonomous agents can make better decisions.

---

## Architecture Visualization

Resources:

* https://fem-c4.pages.dev/diagrams/v1/#SystemContext
* https://c4model.com/
* https://github.com/Charca/frontend-architecture-monolith

The **C4 Model** allows architecture to be visualized at different levels of detail.

Typical levels include:

1. System Context
2. Containers
3. Components
4. Code

---

# Modular Monoliths

## Definition

A modular monolith is an architectural approach where a codebase is organized into **well-defined modules with clear boundaries** while still being deployed as a **single application**.

Conceptually:

```text
Single Deployment
│
├── Authentication Module
├── Catalog Module
├── Orders Module
└── Payments Module
```

The system is still one application, but the internal architecture tries to preserve strong module boundaries.

---

## Identifying Modules

Modules can be identified using concepts such as **subdomains** from Domain-Driven Design.

Resource:

https://github.com/ddd-crew/ddd-starter-modelling-process

### Adopting a Modular Monolith

1. Identify subdomains.
2. Define a folder structure.
3. Define module boundaries.
4. Enforce those boundaries.

---

## Architectural Patterns

Common architectural patterns include:

* Layered Architecture
* Clean Architecture
* Hexagonal Architecture
* Domain-Driven Design
* Atomic Design
* Feature-Sliced Design

### Layered Architecture

Organizes applications into layers.

For example:

```text
Presentation
    ↓
Business Logic
    ↓
Data Access
```

### Clean Architecture

Separates entities, use cases, interfaces, and infrastructure.

### Hexagonal Architecture

Uses:

* Ports
* Adapters

to isolate business logic from external systems.

### Domain-Driven Design

Organizes the software around business domains and subdomains.

---

# Monolith Boundary Enforcement

## Dependency Cruiser and Boundary Tools

Checkout:

```bash
git checkout modular-monolith
```

Encapsulation can be implemented using:

* classes
* interfaces
* module APIs

Install:

```bash
npm install eslint-plugin-boundaries --save-dev
```

Documentation:

https://www.jsboundaries.dev/docs/classification/elements/#capture-optional

Check:

```text
eslint.config.js
```

This allows module boundaries to be enforced through ESLint rules.

---

# Monorepos

## Monorepo Configuration

Architecture diagram:

https://fem-c4.pages.dev/diagrams/v2/#SystemContext

Repository:

https://github.com/Charca/frontend-architecture-monorepo

---

## Moving a Monolith into a Monorepo

General process:

1. Bring repositories together into a single workspace.
2. Break monoliths into multiple packages.
3. Adopt monorepo tooling to manage dependencies and caching.

---

## Initial Structure

Create folders for applications and packages.

Example:

```text
repo/
├── apps/
├── packages/
└── package.json
```

Create a root `package.json`.

Important properties include:

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": []
}
```

### `workspaces`

Defines where the packages in the monorepo are located.

For example:

```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

Finished version:

```bash
git checkout full-monorepo
```

---

# Apps vs Packages

## What is the difference between placing a module in `apps` versus `packages`?

### `apps`

Typically contains modules that can run independently and usually have their own screens or user interfaces.

Examples:

```text
apps/
├── shell
├── authentication
├── analytics
└── admin
```

An authentication application, for example, may contain login screens and be runnable independently.

### `packages`

Usually contains reusable code that other applications depend on.

Examples:

```text
packages/
├── ui
├── utils
├── eslint-config
└── types
```

These generally cannot run independently.

### Important

This distinction is a **design decision**, not a strict technical rule.

The important question is:

> Can this module conceptually run by itself?

A module that provides screens and some utilities may still belong in `apps` if it represents an independently runnable application.

---

# Monorepo Tooling with Turborepo

Popular monorepo tools include:

* Turborepo
* Nx
* Gradle

With Turborepo, create:

```text
turbo.json
```

This defines task dependencies and caching behavior.

---

## Build Dependencies

For example, the app shell may need to rebuild whenever one of its dependencies changes.

### What is the purpose of `dependsOn`?

The `dependsOn` property defines dependencies between tasks.

For example:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

This means:

> Before building this package, build the packages that it depends on.

Conceptually:

```text
Package A ──┐
Package B ──┼──> App Shell
Package C ──┘
```

Turborepo ensures that:

```text
Package A build
Package B build
Package C build
      ↓
App Shell build
```

happens in the correct order.

---

# Sharing Code Across Packages

Main approaches include:

1. Shared packages
2. Interfaces
3. Code duplication
4. Dependency injection
5. Rethinking abstractions

---

## Shared Package

Move shared functionality into a package.

Example:

```text
packages/shared
```

Risk:

The shared package can become a **junk drawer** where unrelated code accumulates.

---

## Interfaces

Expose only limited functionality between modules.

Instead of:

```text
Module A → entire Module B
```

prefer:

```text
Module A → Module B public interface
```

---

## Duplicate Simple Code

Sometimes duplicating simple logic is preferable to introducing unnecessary coupling.

Not every repeated line of code needs to become a shared abstraction.

---

## Dependency Injection

Dependency injection can decouple packages by allowing modules to define slots where implementations can be inserted.

Conceptually:

```text
Module
   ↓
Interface
   ↓
Injected Implementation
```

rather than:

```text
Module
   ↓
Concrete dependency
```

---

## Rethink the Abstraction

If too much code starts moving into a shared package, the current architecture may have the wrong abstractions.

Instead of continuously increasing shared code, reconsider where module boundaries should exist.

---

# Turborepo Boundaries

## Purpose

Turborepo Boundaries allows architectural rules to be enforced across packages.

For example:

```text
UI package
   ↓ allowed
Domain package
   ↓ allowed
Data package
```

while preventing dependencies such as:

```text
Data package
   ✕
UI package
```

Tags can be assigned to packages and then used in the root `turbo.json` to define architectural dependency rules.

---

# Summary

A possible architectural evolution is:

```text
Monolith
   ↓
Modular Monolith
   ↓
Monorepo
   ↓
Microfrontends
```

Each step introduces additional architectural boundaries.

### Monolith

```text
One codebase
One deployment
Weak internal boundaries
```

### Modular Monolith

```text
One codebase
One deployment
Strong internal module boundaries
```

### Monorepo

```text
Multiple apps/packages
Shared repository
Build-time composition
Independent package boundaries
```

### Microfrontends

```text
Multiple applications
Independent deployments
Runtime composition
Independent team ownership
```

The key principle is not to adopt distributed architecture automatically.

Microfrontends become useful when:

> The cost of coordinating the monolith becomes greater than the cost of managing the distributed architecture.
