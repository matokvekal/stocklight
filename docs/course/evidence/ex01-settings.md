# Exercise 1 — settings.json at all three levels

## One setting per scope

| Scope | File | Setting | Why it belongs there |
|---|---|---|---|
| User | `~/.claude/settings.json` (not in repo) | `"model": "opus"` | My personal default model for every project on this machine (pre-existing; not modified) |
| Project | `.claude/settings.json` (committed) | `"effortLevel": "high"`, `permissions.allow` for `npm run check` / `typecheck` / `lint` / `test` | Shared with the whole team: default effort and pre-approved project check commands |
| Local | `.claude/settings.local.json` (git-ignored) | `"model": "sonnet"` | True only on my machine: I run the homework sessions on a faster, cheaper model |

## The doubled key: `model`

`model` is set in three scopes with different values: user `opus`, project `opus`, local `sonnet`.

Fresh headless sessions (`claude -p ... --output-format stream-json --verbose`) report the model used in the final `result` event:

| Run | Transcript | Model used |
|---|---|---|
| No flag | [transcripts/ex01-default.jsonl](transcripts/ex01-default.jsonl) | `claude-sonnet-5-5` → **local won** |
| `--model haiku` | [transcripts/ex01-flag.jsonl](transcripts/ex01-flag.jsonl) | `claude-haiku-5-5` → **command-line flag won** |

**Why:** precedence is managed > command-line flags > local > project > user. `settings.local.json` beats both the project and user files, and a CLI flag beats all three. (`permissions` was deliberately not used as the doubled key: permission lists merge across scopes instead of overriding.)

## Git

`.claude/settings.local.json` is excluded by `.gitignore` (`.gitignore:27`):

```
$ git check-ignore -v .claude/settings.local.json
.gitignore:27:.claude/settings.local.json	.claude/settings.local.json
$ git status --short
?? .claude/
?? docs/course/evidence/
```

After the commit, `git status` is clean; only `.claude/settings.json` is tracked.
