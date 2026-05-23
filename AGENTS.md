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

| Skill             | When                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `brainstorming`   | Before building any new feature, component, or functionality. Explores requirements, proposes approaches, produces a design doc. |
| `grill-me`        | When you have a plan/design and want it stress-tested. I'll interview you until we reach shared understanding.                   |
| `grill-with-docs` | Same as grill-me but challenges against existing project docs and domain model.                                                  |

### Coding & Debugging

| Skill                       | When                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `svelte-code-writer`        | **Mandatory** for any Svelte component (.svelte) or Svelte module (.svelte.ts/.svelte.js). Looks up Svelte 5 docs. |
| `svelte-core-bestpractices` | **Mandatory** for any Svelte work. Covers reactivity, events, styling, library integration.                        |
| `elysiajs`                  | When creating/editing backend route handlers with Elysia.                                                          |
| `valibot`                   | When creating or modifying Valibot schemas, validating data, parsing inputs, or migrating from Zod.              |
| `formisch`                  | When creating forms, handling form state, validating form inputs, or working with Formisch.                        |
| `diagnose`                  | When something is broken, throwing, or performing poorly. Reproduce -> diagnose -> fix -> verify.                  |
| `tdd`                       | When building features or fixing bugs with tests. Red-green-refactor loop.                                         |
| `systematic-debugging`      | When encountering any bug, test failure, or unexpected behavior.                                                   |

### Architecture & Planning

| Skill                           | When                                                                                            |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `zoom-out`                      | When unfamiliar with a code section or need broader context.                                    |
| `improve-codebase-architecture` | When asked to improve architecture, find refactoring opportunities, or make code more testable. |
| `writing-plans`                 | When you have a spec/requirements for multi-step work before touching code.                     |
| `executing-plans`               | When executing an implementation plan in a separate session with review checkpoints.            |

### Project Management

| Skill       | When                                                     |
| ----------- | -------------------------------------------------------- |
| `to-prd`    | Turn conversation context into a PRD.                    |
| `to-issues` | Break a plan/PRD into independently-grabbable issues.    |
| `triage`    | Create, triage, or review issues. Manage issue workflow. |

### Communication

| Skill     | When                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `caveman` | When user says "caveman mode", "be brief", "less tokens". Ultra-compressed communication (~75% token savings). |

### Other

| Skill                            | When                                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `seo-audit`                      | When user mentions SEO, ranking issues, page speed, core web vitals, or "my traffic dropped". |
| `audit-website`                  | Full website audit (SEO, performance, security, technical, content) with 230+ rules.          |
| `free-tool-strategy`             | When planning a free tool for marketing/lead gen.                                             |
| `verification-before-completion` | Before claiming work is complete - run verification commands and confirm output.              |
| `requesting-code-review`         | After completing tasks or major features, before merging.                                     |
| `receiving-code-review`          | When receiving code review feedback - verify before implementing suggestions.                 |

## Installed Skills (auto-loaded, no need to invoke)

These are installed in `.agents/skills/` and auto-discovered:

- `caveman` - Ultra-compressed communication
- `diagnose` - Disciplined debugging
- `elysiajs` - Elysia backend patterns
- `formisch` - Type-safe form handling with Formisch
- `grill-me` - Stress-test plans
- `grill-with-docs` - Challenge against docs
- `improve-codebase-architecture` - Find refactoring opportunities
- `setup-matt-pocock-skills` - Initialize agent skills for this repo
- `svelte-code-writer` - Svelte 5 docs lookup
- `svelte-core-bestpractices` - Svelte best practices
- `tdd` - Test-driven development
- `to-issues` - Break work into issues
- `to-prd` - Create PRDs
- `triage` - Issue management
- `valibot` - Schema validation with Valibot
- `zoom-out` - Broader context

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
