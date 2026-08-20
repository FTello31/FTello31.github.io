---
title: Cursor & Claude Code: Professional AI Setup | Frontend Masters
description: by Steve Kinney • Sep 21, 2025.
publishDate: 2026-08-15
---

# AI Development with Cursor & MCP Notes

## Course Notes

Course:

https://stevekinney.com/courses/ai-development

### Cursor Settings

In Cursor:

```text
Cursor → Settings → Cursor Settings
```

This is where Cursor-specific configuration can be managed.

---

# Background Agents

Background Agents are remote, asynchronous coding agents that can work on a repository without requiring the local editor session to remain active.

Dashboard:

https://cursor.com/dashboard?tab=background-agents

Conceptually:

```text
Repository / task
      ↓
Background Agent
      ↓
Remote environment
      ↓
Agent works asynchronously
      ↓
Changes / results are returned
```

They are useful for tasks such as:

- Implementing a feature
- Investigating a bug
- Refactoring code
- Running tests
- Making changes in a remote repository
- Working on longer-running tasks without blocking the local development session

The main idea is that the agent performs its work in a remote environment rather than directly inside the local editor session.

---

# Cursor Agents & Dashboard

Cursor provides a dashboard for viewing and managing agent activity.

Background Agents dashboard:

https://cursor.com/dashboard?tab=background-agents

Typical workflow:

```text
Create task
   ↓
Agent receives repository context
   ↓
Agent works remotely
   ↓
Review the result
   ↓
Accept, modify, or reject changes
```

---

# MCP Overview

## What is MCP?

**MCP** stands for:

```text
Model Context Protocol
```

MCP is a standardized protocol that allows AI applications such as Cursor, Claude, and other AI clients to connect to external tools and data sources.

Course reference:

https://stevekinney.com/courses/ai-development/mcp

A useful mental model is:

> MCP is a standardized bridge between an AI application and external capabilities.

Instead of every AI application needing a completely custom integration for every external service, MCP provides a common interface.

---

## Why MCP Exists

Without a common protocol:

```text
AI App A → custom GitHub integration
AI App A → custom Notion integration
AI App A → custom database integration

AI App B → another GitHub integration
AI App B → another Notion integration
AI App B → another database integration
```

With MCP:

```text
                  ┌→ GitHub MCP Server
AI Application ──┼→ Notion MCP Server
                  ├→ Figma MCP Server
                  └→ Other MCP Servers
```

The protocol makes integrations more reusable and consistent.

---

# MCP Architecture

MCP commonly involves three main concepts:

1. **Host**
2. **Client**
3. **Server**

---

## Host

The **host** is the AI application that the user interacts with.

Examples may include:

- Cursor
- Claude Desktop
- AI development environments
- Other MCP-compatible applications

Conceptually:

```text
User
 ↓
MCP Host
```

The host manages the overall AI experience.

---

## Client

An **MCP client** lives inside the host and maintains a connection/session with a specific MCP server.

Conceptually:

```text
Cursor
  ↓
MCP Client
  ↓
MCP Server
```

A host may have multiple clients connected to different MCP servers.

Example:

```text
Cursor
 ├── MCP Client → GitHub MCP Server
 ├── MCP Client → Notion MCP Server
 └── MCP Client → Figma MCP Server
```

---

## Server

An **MCP server** is an external program that exposes capabilities using the MCP standard.

It acts as a standardized wrapper or bridge around another system.

Examples:

```text
GitHub
   ↓
GitHub MCP Server
   ↓
MCP Client
   ↓
AI Application
```

An MCP server can expose capabilities such as:

- Reading data
- Searching information
- Accessing documentation
- Calling APIs
- Executing tools
- Interacting with external services

A useful mental model:

> An MCP server is similar to an API adapter specifically designed so AI applications can discover and use tools in a standardized way.

---

# MCP Host, Client & Server

Full architecture:

```text
┌──────────────────────────────┐
│            Host              │
│         e.g. Cursor          │
│                              │
│  ┌────────────┐              │
│  │ MCP Client │──────────────┼────→ MCP Server A
│  └────────────┘              │
│                              │
│  ┌────────────┐              │
│  │ MCP Client │──────────────┼────→ MCP Server B
│  └────────────┘              │
└──────────────────────────────┘
```

Or more simply:

```text
User
 ↓
Host
 ↓
MCP Client
 ↓
MCP Server
 ↓
External service
```

Example:

```text
Developer
   ↓
Cursor
   ↓
MCP Client
   ↓
GitHub MCP Server
   ↓
GitHub
```

---

# MCP Capabilities

Depending on the server, MCP can expose different types of functionality.

Typical capabilities include:

## Tools

Actions the model can execute.

Examples:

```text
create_issue()
search_repository()
fetch_documentation()
query_database()
```

---

## Resources

Data that the model can read.

Examples:

- Files
- Documentation
- Database records
- Repository information

---

## Prompts

Reusable prompt templates that an MCP server can expose to a client.

Conceptually:

```text
MCP Server
 ├── Tools
 ├── Resources
 └── Prompts
```

---

# MCP as "Plug and Play"

One of the main benefits of MCP is that integrations can behave more like plug-and-play components.

Conceptually:

```text
Install / configure MCP server
            ↓
Connect it to an MCP-compatible host
            ↓
AI discovers available capabilities
            ↓
AI can use those capabilities
```

Instead of manually implementing every integration inside the AI application, the MCP server exposes a standardized interface.

---

# MCP Directory & Discovery

Cursor MCP directory:

https://cursor.directory/

This can be used to discover MCP servers and integrations that can be connected to Cursor or other compatible clients.

---

# Useful MCP Servers & Integrations

## Notion MCP

Documentation:

https://developers.notion.com/docs/mcp

Allows MCP-compatible AI applications to interact with Notion capabilities.

Potential use cases:

- Search workspace content
- Retrieve documentation
- Work with pages
- Use Notion as contextual information for an AI agent

---

## GitHub MCP Server

Repository:

https://github.com/github/github-mcp-server

Allows AI agents to interact with GitHub through an MCP-compatible interface.

Potential capabilities can include working with:

- Repositories
- Issues
- Pull requests
- Source code
- Repository metadata

Conceptually:

```text
Cursor / Claude
      ↓
GitHub MCP Server
      ↓
GitHub
```

---

## Figma Dev Mode MCP Server

Reference:

https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/

The Figma MCP integration can expose design context to AI development tools.

Conceptually:

```text
Figma design
    ↓
Figma MCP Server
    ↓
AI coding agent
    ↓
Frontend implementation
```

This can help an agent understand design information without requiring the developer to manually describe every component.

---

## Firecrawl MCP Server

Repository:

https://github.com/firecrawl/firecrawl-mcp-server

Firecrawl can provide web crawling and web-content retrieval capabilities to MCP-compatible AI clients.

Potential workflow:

```text
AI Agent
   ↓
Firecrawl MCP Server
   ↓
Website
   ↓
Structured / extracted content
```

---

## Atlassian Remote MCP Server

Reference:

https://www.atlassian.com/platform/remote-mcp-server

This can connect AI applications with Atlassian products and context.

Potential use cases:

- Jira
- Confluence
- Project information
- Documentation
- Work-item context

Conceptually:

```text
AI Agent
   ↓
Atlassian MCP Server
   ↓
Jira / Confluence
```

---

## Context7

Repository:

https://github.com/upstash/context7

Context7 focuses on making library and framework documentation easier for LLMs to consume.

A useful mental model:

> Context7 provides documentation in an LLM-friendly form so coding agents can retrieve more relevant and current library context.

Conceptually:

```text
Coding Agent
    ↓
Context7
    ↓
Relevant library documentation
    ↓
Better implementation context
```

This is particularly useful when:

- Library APIs change frequently
- The model may have outdated knowledge
- A project depends on a specific framework version
- Accurate documentation is needed while generating code

---

# Other AI Development Resources

## ChatGPT Codex

https://chatgpt.com/codex

Codex provides coding-agent workflows for working with software-development tasks.

---

# MCP Mental Model

A concise way to remember MCP:

```text
Host
 ↓
Client
 ↓
Server
 ↓
External capability
```

Example:

```text
Cursor
 ↓
MCP Client
 ↓
GitHub MCP Server
 ↓
GitHub repository
```

---

# MCP vs. Traditional API Integration

## Traditional Integration

The application directly implements an API integration:

```text
Cursor
  ↓
custom GitHub integration code
  ↓
GitHub API
```

This must be specifically implemented and maintained by the application.

---

## MCP Integration

The external capability is exposed through an MCP server:

```text
Cursor
  ↓
MCP Client
  ↓
GitHub MCP Server
  ↓
GitHub API
```

The client communicates using a standardized protocol.

---

# Quick Reference

## Cursor

```text
Cursor Settings
    ↓
Cursor → Settings → Cursor Settings
```

Background Agents:

https://cursor.com/dashboard?tab=background-agents

---

## MCP

```text
MCP = Model Context Protocol
```

Purpose:

```text
Standardized connection between
AI applications and external tools/data
```

Architecture:

```text
Host → Client → Server → External service
```

Examples:

| Component | Example |
|---|---|
| Host | Cursor |
| MCP Client | MCP connection inside Cursor |
| MCP Server | GitHub MCP Server |
| External service | GitHub |

---

## Useful Links

| Resource | Link |
|---|---|
| Course | https://stevekinney.com/courses/ai-development |
| MCP Lesson | https://stevekinney.com/courses/ai-development/mcp |
| Cursor Background Agents | https://cursor.com/dashboard?tab=background-agents |
| Cursor MCP Directory | https://cursor.directory/ |
| Notion MCP | https://developers.notion.com/docs/mcp |
| GitHub MCP Server | https://github.com/github/github-mcp-server |
| Figma MCP | https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/ |
| Firecrawl MCP | https://github.com/firecrawl/firecrawl-mcp-server |
| Atlassian MCP | https://www.atlassian.com/platform/remote-mcp-server |
| Context7 | https://github.com/upstash/context7 |
| ChatGPT Codex | https://chatgpt.com/codex |



## frontend masters notes: 
### Introduction

**Introduction**

[00:01:37](https://master.dev/courses/pro-ai/introduction?t=97)
Check out all our [AI courses](https://master.dev/topics/artificial-intelligence/)

**AI Tools Overview**

[00:00:36](https://master.dev/courses/pro-ai/ai-tools-overview?t=36)
Here's a link to [Cursor](https://cursor.com/)

[00:01:44](https://master.dev/courses/pro-ai/ai-tools-overview?t=104)
Here's a link to [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)

[00:02:49](https://master.dev/courses/pro-ai/ai-tools-overview?t=169)
Here's a link to [Codex](https://openai.com/index/openai-codex/)

### Cursor

**Cursor & AI Models Overview**

[00:00:15](https://master.dev/courses/pro-ai/cursor-ai-models-overview?t=15)
Here's a link to [Cursor](https://cursor.com/)

[00:00:34](https://master.dev/courses/pro-ai/cursor-ai-models-overview?t=34)
Installation and configuration steps can be found on the [course website](https://stevekinney.com/courses/ai-development/installing-cursor)

[00:10:04](https://master.dev/courses/pro-ai/cursor-ai-models-overview?t=604)
Here's a link to our [VS Code course](https://master.dev/courses/vs-code-v2/)

[00:10:49](https://master.dev/courses/pro-ai/cursor-ai-models-overview?t=649)
Here's a link to [LM Studio](https://lmstudio.ai/)

[00:12:05](https://master.dev/courses/pro-ai/cursor-ai-models-overview?t=725)
cursor: use @files @code, @docs @web 
now using gemini to brainstorming
and anthropic para realmente hacer el codigo 
openAI 
LMstudio (local mode, host own models) https://lmstudio.ai/

**Cursor Tour & Settings**

[00:00:20](https://master.dev/courses/pro-ai/cursor-tour-settings?t=20)
Here's a link to [the course website](https://stevekinney.com/courses/ai-development)

[00:00:46](https://master.dev/courses/pro-ai/cursor-tour-settings?t=46)
Use Cursor with one of your repos or [clone the course repo](https://github.com/stevekinney/basic-template)

[00:01:00](https://master.dev/courses/pro-ai/cursor-tour-settings?t=60)
You need to run `npm install` after cloning the repo

[00:01:46](https://master.dev/courses/pro-ai/cursor-tour-settings?t=106)
Here's a link to our [VS Code course](https://master.dev/courses/vs-code-v2/)

[00:09:05](https://master.dev/courses/pro-ai/cursor-tour-settings?t=545)
Check out our [Become a VS Code Power User](https://master.dev/courses/vs-code-v2/) course.

**Using Cursor AI Inline Edits**

[00:00:06](https://master.dev/courses/pro-ai/using-cursor-ai-inline-edits?t=6)
If you are working in the course repo, you can open `/src/application.tsx`

[00:00:22](https://master.dev/courses/pro-ai/using-cursor-ai-inline-edits?t=22)
Press `cmd/ctrl + k` to open the quick edit dialog

[00:00:25](https://master.dev/courses/pro-ai/using-cursor-ai-inline-edits?t=25)
Learn more about interacting with Cursor on [the course website](https://stevekinney.com/courses/ai-development/interacting-with-cursor)

[00:02:46](https://master.dev/courses/pro-ai/using-cursor-ai-inline-edits?t=166)
Use the tab key to accept any of the prompts

[00:07:37](https://master.dev/courses/pro-ai/using-cursor-ai-inline-edits?t=457)
https://stevekinney.com/courses/ai-development
https://github.com/stevekinney/basic-template

cursor -> settings -> cursor settings

**Using Cursor AI Agent**

[00:02:34](https://master.dev/courses/pro-ai/using-cursor-ai-agent?t=154)
`cmd/ctrl + n` creates a new chat

[00:03:09](https://master.dev/courses/pro-ai/using-cursor-ai-agent?t=189)
It's OK to use different prompts. The key is to practice using these tools.

**Cursor AI Rules**

[00:00:10](https://master.dev/courses/pro-ai/cursor-ai-rules?t=10)
Find more tips for using Cursor rules [on the course website](https://stevekinney.com/courses/ai-development/cursor-rules)

[00:07:54](https://master.dev/courses/pro-ai/cursor-ai-rules?t=474)
Here's a link to [Awesome Cursor Rules](https://github.com/PatrickJS/awesome-cursorrules)

[00:08:46](https://master.dev/courses/pro-ai/cursor-ai-rules?t=526)
Here's a link to [cursor.directory](https://cursor.directory/)

**Setup Cursor Rules**

[00:00:12](https://master.dev/courses/pro-ai/setup-cursor-rules?t=12)
Type "new cursor rule" in your Command Palette or find the "Rules & Memories" area in the settings

[00:04:40](https://master.dev/courses/pro-ai/setup-cursor-rules?t=280)
Here's a link to Steve's [Cursor Rules for TypeScript article](https://stevekinney.com/writing/cursor-rules-typescript)

[00:08:43](https://master.dev/courses/pro-ai/setup-cursor-rules?t=523)
Here's a link to [cursor.directory](https://cursor.directory/rules)

**Notepads**

[00:00:03](https://master.dev/courses/pro-ai/notepads?t=3)
Note: Notepads have been deprecated in Cursor

### Agents & MCPs

**Background Agents**

[00:00:07](https://master.dev/courses/pro-ai/background-agents?t=7)
Background Agents are only available with the Cursor "Pro" plan

[00:05:48](https://master.dev/courses/pro-ai/background-agents?t=348)
background agents: async remote agents -> allow to run in a remote repository background

https://cursor.com/dashboard?tab=background-agents

**Cursor Agents & Dashboard**

[00:00:16](https://master.dev/courses/pro-ai/cursor-agents-dashboard?t=16)
Click the "Agents" button in the lower left corner.

[00:00:54](https://master.dev/courses/pro-ai/cursor-agents-dashboard?t=54)
Click "Manage Account" in the settings or visit [cursor.com/dashboard](https://cursor.com/dashboard?tab=background-agents)

[00:05:37](https://master.dev/courses/pro-ai/cursor-agents-dashboard?t=337)
Here's a link to [Codex](https://chatgpt.com/codex)

[00:07:32](https://master.dev/courses/pro-ai/cursor-agents-dashboard?t=452)
Since two versions were requested, the background agents took too long to run, and Steve didn't review the results.

[00:07:40](https://master.dev/courses/pro-ai/cursor-agents-dashboard?t=460)
https://cursor.com/dashboard?tab=background-agents

**MCP Overview**

[00:00:40](https://master.dev/courses/pro-ai/mcp-overview?t=40)
mcp server model context protocol 
to connect ai applcaition like cursor and claude to safely and efficiently connect to external tools 
 "plug and play"

host: e.g. cursor , 
client: e.g inside cursor, sessions with a specific mcp server  
server: (external program) lightweight program that acts as a standardized wrapper or brigde (basically an api). it exposes capabilities 


standard from anthropic 

https://stevekinney.com/courses/ai-development/mcp
https://cursor.directory/

https://developers.notion.com/docs/mcp

https://github.com/github/github-mcp-server
https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/
https://chatgpt.com/codex
https://github.com/firecrawl/firecrawl-mcp-server
https://www.atlassian.com/platform/remote-mcp-server

https://github.com/upstash/context7 --> docs llm friendly

[00:00:43](https://master.dev/courses/pro-ai/mcp-overview?t=43)
Check out the [course website](https://stevekinney.com/courses/ai-development/mcp) for more details about MCP

[00:02:39](https://master.dev/courses/pro-ai/mcp-overview?t=159)
Steve is talking about the [GitHub CLI](https://cli.github.com/)

[00:04:58](https://master.dev/courses/pro-ai/mcp-overview?t=298)
Here's a link to the [GitHub MCP Server](https://github.com/github/github-mcp-server)

[00:05:41](https://master.dev/courses/pro-ai/mcp-overview?t=341)
Here's a link to information about [Figma's MCP Server](https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/)

[00:06:15](https://master.dev/courses/pro-ai/mcp-overview?t=375)
Here's a link to the [Notion MCP](https://developers.notion.com/docs/mcp)

[00:06:51](https://master.dev/courses/pro-ai/mcp-overview?t=411)
Here's a link to [Firecrawl MCP](https://github.com/firecrawl/firecrawl-mcp-server)

[00:07:11](https://master.dev/courses/pro-ai/mcp-overview?t=431)
Here's a link to the [Atlassian's Remote MCP](https://www.atlassian.com/platform/remote-mcp-server)

[00:07:20](https://master.dev/courses/pro-ai/mcp-overview?t=440)
Here's a link to [cursor.directory](https://cursor.directory/)

[00:08:05](https://master.dev/courses/pro-ai/mcp-overview?t=485)
Here's a link to the [Context7 MCP](https://github.com/upstash/context7)

**Web Scraper with Firecrawl MCP**

[00:00:00](https://master.dev/courses/pro-ai/web-scraper-with-firecrawl-mcp?t=0)
Open your Cursor settings and navigate to `Tools & Integrations`

[00:03:02](https://master.dev/courses/pro-ai/web-scraper-with-firecrawl-mcp?t=182)
Try adding [Firecrawl MCP](https://github.com/firecrawl/firecrawl-mcp-server) to your Cursor and scrape some data from a website.

### Claude Code

**Claude Code Overview**

[00:00:39](https://master.dev/courses/pro-ai/claude-code-overview?t=39)
Check the latest Max plan pricing and limits on [Anthropic's website](https://www.anthropic.com/max)

[00:01:06](https://master.dev/courses/pro-ai/claude-code-overview?t=66)
`npm install -g @anthropic-ai/claude-code`

[00:01:25](https://master.dev/courses/pro-ai/claude-code-overview?t=85)
If you have issue installing Claude Code, check out the [troubleshooting docs](https://docs.anthropic.com/en/docs/claude-code/troubleshooting)

[00:01:40](https://master.dev/courses/pro-ai/claude-code-overview?t=100)
`claude doctor` runs a diagnostic tool

[00:02:04](https://master.dev/courses/pro-ai/claude-code-overview?t=124)
These installation steps are shown the first time you run `claude` in your terminal

[00:02:46](https://master.dev/courses/pro-ai/claude-code-overview?t=166)
Check out the latest [Anthropic pricing and plans](https://www.anthropic.com/pricing)

**Thinking Mode & Compacting Context Windows**

[00:01:17](https://master.dev/courses/pro-ai/thinking-mode-compacting-context-windows?t=77)
Learn more about [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)

**Getting Started with Claude Code**

[00:00:10](https://master.dev/courses/pro-ai/getting-started-with-claude-code?t=10)
Make sure you have [Claude Code installed](https://docs.anthropic.com/en/docs/claude-code/setup) and type `claude` in your terminal to start it

[00:00:23](https://master.dev/courses/pro-ai/getting-started-with-claude-code?t=23)
More information about installing and configuring Claude Code is [on the course website](https://stevekinney.com/courses/ai-development/installing-claude-code)

[00:04:01](https://master.dev/courses/pro-ai/getting-started-with-claude-code?t=241)
Steve ran the `/status` command

[00:05:29](https://master.dev/courses/pro-ai/getting-started-with-claude-code?t=329)
Run `/init` in your repo to create a CLAUDE.md file

**Project Boundaries & Reference Files**

[00:00:00](https://master.dev/courses/pro-ai/project-boundaries-reference-files?t=0)
Steve opened a `CLAUDE.md` file from one of his current projects

**Commands**

[00:00:28](https://master.dev/courses/pro-ai/commands?t=28)
`claude —continue —-dangerously-skip-permissions`

[00:00:51](https://master.dev/courses/pro-ai/commands?t=51)
Steve is using `shift+tab` to toggle between the modes

**Claude Code Hooks**

[00:00:23](https://master.dev/courses/pro-ai/claude-code-hooks?t=23)
Here's a link to [the hooks documentation](https://docs.anthropic.com/en/docs/claude-code/hooks)

[00:05:40](https://master.dev/courses/pro-ai/claude-code-hooks?t=340)
Here's a link to the [Awesome Claude Code hooks](https://github.com/hesreallyhim/awesome-claude-code?tab=readme-ov-file#hooks-)

[00:05:53](https://master.dev/courses/pro-ai/claude-code-hooks?t=353)
Here's a link to the [claude-hooks repo](https://github.com/johnlindquist/claude-hooks)

**Tips for Using Subagents**

[00:03:39](https://master.dev/courses/pro-ai/tips-for-using-subagents?t=219)
Learn more about Git worktrees in our [Git courses](https://master.dev/topics/git/)

[00:05:23](https://master.dev/courses/pro-ai/tips-for-using-subagents?t=323)
Here's a link to [Crystal](https://github.com/stravu/crystal)

### Wrapping Up

**Wrapping Up**

[00:00:13](https://master.dev/courses/pro-ai/wrapping-up?t=13)
Here's a link to [NotebookLM](https://notebooklm.google/)

[00:02:04](https://master.dev/courses/pro-ai/wrapping-up?t=124)
Here's more information about [Gemini Gems](https://stevekinney.com/courses/ai-development/gemini-and-gems)

[00:03:01](https://master.dev/courses/pro-ai/wrapping-up?t=181)
Here's a link to [Repomix](https://repomix.com/)
