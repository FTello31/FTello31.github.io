---
title: Codex for Backend Engineers | Frontend Masters
description: Codex for Backend Engineers by The .
publishDate: 2026-09-14
---


# Codex for Backend Engineers

## 1. Install Skills

Recommended skills:

* `domain-modeling`
* `grill-me`
* `grill-with-docs`
* `grilling`

---

## 2. Enable Computer Use

Enable the Chrome extension:

```text
Settings → Computer Use
```

---

## 3. Show Context Window Usage

Enable context window usage:

```text
Settings → General → Show context window usage
```

This makes it easier to monitor how much context the current Codex session is consuming.

---

## 4. Create an `AGENTS.md` File

Create an `AGENTS.md` file in the repository.

You can ask Codex to generate an initial version:

```text
Generate an AGENTS.md file for this repository.
```

`AGENTS.md` is useful for defining repository-specific instructions, conventions, workflows, and expectations for agents working on the project.

Example:

[Example AGENTS.md](https://github.com/schneidenbach/master-dot-dev-codex-course-live/blob/master/AGENTS.md)

---

# Grilling vs Planning

The **grilling** workflow is useful when a feature is not yet completely defined.

Instead of immediately implementing something, the grill skill asks multiple questions to understand:

* Requirements
* Expected behavior
* Edge cases
* Constraints
* Architecture decisions
* User experience
* Success criteria

You can use `AGENTS.md` to define how the grill skill should behave.

## Recommended Grilling Instructions

Add something like this to `AGENTS.md`:

> When being asked to `grill-me` or run grilling, assume we mean `grilling-with-docs`, and limit the number of rounds of questions to 8–10 questions per round, with a maximum of 2 rounds.
>
> Additional questions may be asked after the second round only when there is an obvious conflict or ambiguity that must be resolved.
>
> After a grilling session, decompose the capability into 2–4 complete vertical feature slices and confirm the slices with the user before implementation.
>
> Each slice should deliver an end-to-end and complete increment whose primary behavior is reviewable in the browser.
>
> Infrastructure, backend work, documentation, and tests should support that visible outcome rather than become standalone review checkpoints.
>
> Finish and verify the entire slice, then stop.
>
> List what changed, provide clear browser steps for testing and evaluating the feature, and wait for confirmation before starting the next slice.
>
> Do not hand off partially wired behavior, knowingly deferred work required by the slice, or an infrastructure-only checkpoint unless the user explicitly requests one.

---

# Vertical Feature Slices

After defining a feature, avoid splitting the work only by technical layer.

For example, avoid:

```text
1. Create database schema
2. Create backend endpoint
3. Create frontend component
4. Add tests
```

Instead, prefer **vertical slices** that deliver complete behavior.

Example:

```text
Slice 1:
User can create a project from the UI.

Slice 2:
User can edit an existing project.

Slice 3:
User can delete a project with confirmation.
```

Each slice may include:

* Database changes
* Backend changes
* Frontend changes
* Tests
* Documentation

The important part is that each slice represents a complete, testable capability.

---

# Code Review

For code review, it can be useful to use a different model or subscription from the one that generated the implementation.

For example:

```text
Codex → implementation
Claude → commit/code review
```

The idea is to have a second model independently review the commits produced by Codex.

This can help detect:

* Incorrect assumptions
* Missing edge cases
* Architectural problems
* Unnecessary complexity
* Security issues
* Poor abstractions
* Missing tests

---

# Scaling `AGENTS.md`

If the `AGENTS.md` file becomes too large, separate specialized instructions into additional files.

For example:

```text
AGENTS.md
frontend.md
backend.md
testing.md
architecture.md
```

Then reference those files from `AGENTS.md`.

Example:

```md
## Additional Instructions

For frontend-specific conventions, see:

- [Frontend Guidelines](./frontend.md)

For backend-specific conventions, see:

- [Backend Guidelines](./backend.md)

For testing conventions, see:

- [Testing Guidelines](./testing.md)
```

This keeps `AGENTS.md` focused while still giving agents access to detailed project instructions.

---

# `/goal`

Use `/goal` when you want Codex to work toward a larger outcome.

Conceptually:

```text
Do a thing and don't stop until it is done.
```

`/goal` works better when the task describes a **large objective** rather than a very small implementation detail.

A good goal should include:

1. The objective
2. Constraints
3. Expected behavior
4. Success criteria

Example:

```text
/goal

Implement authentication for the application.

Success criteria:

- Users can sign up.
- Users can log in.
- Users can log out.
- Protected routes redirect unauthenticated users.
- Sessions persist after refreshing the page.
- Authentication errors are shown clearly.
- Automated tests cover the main authentication flows.
```

The purpose of `/goal` is to allow the agent to work through a larger project or capability until the defined success criteria are satisfied.

---

# `AGENTS.md` vs Skills vs Prompts

There are three main ways to provide instructions to Codex:

## `AGENTS.md`

Best for **repository-specific rules**.

Examples:

* Architecture conventions
* Folder structure
* Testing expectations
* Framework conventions
* Naming conventions
* Repository-specific workflows
* Required validation commands

Example:

```text
Always run unit tests before completing a feature.

Use dependency injection for external services.

Never access the database directly from controllers.
```

---

## Skills

Skills are better for **repeatable actions or workflows** that may be useful across multiple repositories.

Examples:

```text
domain-modeling
grill-me
grilling-with-docs
```

Skills can encapsulate a repeatable process that the agent can invoke when needed.

Think of skills as:

```text
Reusable workflows for agents.
```

They are particularly useful when the same process should work across different projects.

---

## Prompts

Prompts are useful for **one-off instructions** or tasks.

Example:

```text
Review this service and identify possible race conditions.
```

or:

```text
Refactor this endpoint to use the repository pattern.
```

These instructions usually apply only to the current task.

---

# When to Use Each One

| Mechanism   | Best Use                                     |
| ----------- | -------------------------------------------- |
| `AGENTS.md` | Repository-specific rules and conventions    |
| Skills      | Repeatable workflows across repositories     |
| Prompts     | One-off tasks and instructions               |
| `/goal`     | Large objectives with clear success criteria |

A useful mental model is:

```text
AGENTS.md → How should agents behave in this repository?

Skills → What reusable workflows can agents perform?

Prompts → What do I want the agent to do right now?

/goal → What larger outcome should the agent achieve?
```

---

# Recommended Workflow

A possible Codex workflow for larger features:

```text
1. Define repository rules in AGENTS.md
        ↓
2. Start with grilling-with-docs
        ↓
3. Clarify requirements and edge cases
        ↓
4. Define 2–4 vertical feature slices
        ↓
5. Confirm the slices
        ↓
6. Implement Slice 1
        ↓
7. Test and verify
        ↓
8. Review the result
        ↓
9. Continue with the next slice
        ↓
10. Run an independent code review
```

For larger projects, use `/goal` together with explicit **success criteria** so that Codex has a clear definition of when the work is complete.
