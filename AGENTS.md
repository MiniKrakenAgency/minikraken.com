# Agent Instructions

## Tech Stack

- **Framework:** SvelteKit 2 + Svelte 5 (runes)
- **Language:** TypeScript
- **Runtime:** Bun
- **Styling:** Tailwind CSS 4 + daisyUI
- **Backend:** Elysia (route handlers)
- **Validation:** Valibot
- **Forms:** SvelteKit Superforms
- **Content:** mdsvex (markdown pages)
- **Email:** Resend
- **Analytics:** PostHog
- **Observability:** OpenTelemetry
- **Testing:** Vitest (unit) + Playwright (browser)
- **Git hooks:** Lefthook
- **Linting/Formatting:** Prettier + ESLint

## Run Commands

```bash
bun run dev                   # Start dev server
bun run build                 # Build for production
bun run check                 # Full type check + format + lint
bun run test                  # Run all tests
bun run test:unit             # Run vitest only
bun run lint                  # Prettier check + ESLint
bun run format                # Prettier auto-format
bun run release:ci            # Release to production
bun run agents:update         # Update installed skills
```

## Skills - When to Invoke

### Before Creative Work

| Skill           | When                                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `brainstorming` | Before building any new feature, component, or functionality. Explores requirements, proposes approaches, produces a design doc. |
| `stress-test`   | When a design, plan, or decision needs adversarial scrutiny before proceeding.                                                   |

### Coding & Debugging

| Skill                       | When                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `svelte-code-writer`        | **Mandatory** for any Svelte component (.svelte) or Svelte module (.svelte.ts/.svelte.js). Looks up Svelte 5 docs. |
| `svelte-core-bestpractices` | **Mandatory** for any Svelte work. Covers reactivity, events, styling, library integration.                        |
| `elysiajs`                  | When creating/editing backend route handlers with Elysia.                                                          |
| `valibot`                   | When creating or modifying Valibot schemas, validating data, parsing inputs, or migrating from Zod.                |
| `formisch`                  | When creating forms, handling form state, validating form inputs, or working with Formisch.                        |
| `test-driven-development`   | When implementing any feature or bugfix, before writing implementation code                                        |
| `systematic-debugging`      | When encountering any bug, test failure, or unexpected behavior.                                                   |

### Architecture & Planning

| Skill                            | When                                                                                           |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `writing-plans`                  | When you have a spec/requirements for multi-step work before touching code.                    |
| `executing-plans`                | When executing an implementation plan in a separate session with review checkpoints.           |
| `subagent-driven-development`    | When executing implementation plans with independent tasks in the current session              |
| `dispatching-parallel-agents`    | When facing 2+ independent tasks that can be worked on without shared state or sequential deps |
| `finishing-a-development-branch` | When implementation is complete, all tests pass, and you need to decide how to integrate work  |

### Project Management

| Skill                         | When                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `research-driven-development` | When researching a topic, asking questions, or needing background before planning |

### Communication

| Skill     | When                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `caveman` | When user says "caveman mode", "be brief", "less tokens". Ultra-compressed communication (~75% token savings). |

### Other

| Skill                            | When                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `verification-before-completion` | Before claiming work is complete - run verification commands and confirm output.              |
| `requesting-code-review`         | After completing tasks or major features, before merging.                                     |
| `receiving-code-review`          | When receiving code review feedback - verify before implementing suggestions.                 |
| `write-documentation`            | When writing or substantially rewriting human-facing prose: docs, README, guides, blog posts. |
| `document-release`               | After code changes are committed but before PR merge to ensure docs match shipped code.       |
| `getting-up-to-speed`            | At session start, after compaction, or when orienting on unfamiliar codebase.                 |
| `using-git-worktrees`            | Before starting feature work needing isolation from current workspace.                        |
| `writing-skills`                 | When creating, editing, or verifying agent skills.                                            |
| `setup`                          | After installing skills via npx to configure hooks.                                           |

## Installed Skills (auto-loaded, no need to invoke)

These are installed in `.agents/skills/` and auto-discovered:

- `auditing-upstream-drift` - Check for outdated skills
- `brainstorming` - Requirements exploration before building
- `caveman` - Ultra-compressed communication
- `dispatching-parallel-agents` - Run independent tasks in parallel
- `document-release` - Sync docs after code changes
- `elysiajs` - Elysia backend patterns
- `executing-plans` - Execute plans with checkpoints
- `finishing-a-development-branch` - Complete feature work
- `formisch` - Type-safe form handling
- `getting-up-to-speed` - Orient on unfamiliar codebase
- `project-init` - Beads/Dolt initialization
- `receiving-code-review` - Handle review feedback
- `requesting-code-review` - Request review after tasks
- `research-driven-development` - Research topics before planning
- `setup` - Configure hooks after skill installation
- `stress-test` - Adversarial plan scrutiny
- `subagent-driven-development` - Execute independent tasks
- `svelte-code-writer` - Svelte 5 docs lookup
- `svelte-core-bestpractices` - Svelte best practices
- `systematic-debugging` - Bug/fix workflow
- `test-driven-development` - Test-driven development
- `using-git-worktrees` - Isolated workspace management
- `using-superpowers` - Skill discovery and usage
- `valibot` - Schema validation with Valibot
- `verification-before-completion` - Verify before claiming done
- `write-documentation` - Write human-facing prose
- `writing-plans` - Multi-step implementation plans
- `writing-skills` - Create new agent skills

## Session Guidelines

1. **Check for skills BEFORE responding** - Even a 1% chance a skill applies means invoke it
2. **Svelte work always needs** `svelte-code-writer` + `svelte-core-bestpractices`
3. **Creative work needs** `brainstorming` first - never skip to implementation
4. **Running `bun run check`** after any code changes (typecheck + lint + format)
5. **Follow existing patterns** - explore before proposing changes
6. **Use graphify to explore the codebase** - never use glob or read files directly; always invoke graphify to understand file relationships, architecture, and context before making changes
7. **YAGNI ruthlessly** - no unnecessary features
8. **Evidence before assertions** - verify before claiming success
9. **One question at a time** during brainstorming sessions
10. **Prefer multiple choice** questions over open-ended
11. **Commit design docs** to `docs/superpowers/specs/YYYY-MM-DD-topic-design.md` after brainstorming

## Project Structure

```
src/
  lib/           # Shared code, components, utilities
    mailing/     # Resend email templates
    i18n/        # Paraglide translations
  routes/        # SvelteKit routes
    (web)/       # Main website routes
    api/         # API routes (Elysia handlers)
  hooks.server.ts  # Server hooks
  hooks.ts       # Shared hooks
  hooks.client.ts  # Client hooks
static/          # Static assets
test/            # Tests
translations/    # Translation files
```

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->

## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->

## Caveman

Always use caveman mode: ultra-concise responses, minimal text, no filler.
use the caveman skill to set to ultra and rerun after compacting.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:

- ALWAYS read graphify-out/GRAPH_REPORT.md before reading any source files, running grep/glob searches, or answering codebase questions. The graph is your primary map of the codebase.
- IF graphify-out/wiki/index.md EXISTS, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
