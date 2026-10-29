# Loop Engineering Guide

Written 2026-10-25. Read this at the start of any session where Kit asks for work "in a loop".

## 1. What it is

A loop is a job that repeats on its own until it is done. Loop engineering means building that loop on purpose. You don't drive each step by hand.

A good loop has a task **and a check**. A task without a check is just hope.

Each pass goes:

1. **Try something.**
2. **Measure it** with a fixed test.
3. **Keep it or throw it away.**
4. **Write down what happened.**
5. **Decide: go again, or stop?**

The person still owns the "outer loop". That means the goal, the final ship-or-block call, and answering for the result. The agent runs the "inner loop": try, test, repeat.

## 2. The parts of a good loop

Every loop needs all of these. Write them down before the first pass.

| Part | What it means | Example from our trading research |
|---|---|---|
| **Goal** | One measurable end state. "Done" must be checkable. | "A rule that earns more than 4 bp a trade after costs, makes money in 5 of 6 build years, with at least 100 trades." |
| **Fixed test** | The test never changes during the loop. The agent may not edit it. | Build years 2016–2021 are for searching. The scoring code is frozen. |
| **Separate checker** | The one doing the work must not grade itself. Use a script, or a separate agent. | A scoring script computes the numbers. A fresh subagent audits for peeking at future data. |
| **Keep or discard** | Only keep a change if the metric improves. Otherwise undo it. | Keep a rule only if it beats the current best on build years. |
| **Log** | Every pass gets one row, kept in a file, not in chat memory. | `ledger.md` plus a `results.tsv`: idea, metric, kept or dropped, why. |
| **Idea queue** | A written list of what to try next, in order. | `queue.md`: zigzag turning points, cost model, target distance, exit rules... |
| **Stop rules** | When to stop, even without success. | Stop after 30 passes, or 8 hours, or 5 passes with no gain, or when the queue is empty. |
| **Budgets** | Limits on how long each pass runs, and how many looks at unseen data are allowed. | One pass under 20 minutes. Check years: max 5 looks. Final years: 1 look, only with Kit's OK. |
| **Human gates** | Stop and ask before anything hard to undo. | Spending a check or final look. Buying data. Pushing to remote. |

## 3. Common ways loops go wrong

- **No stop rule.** The loop runs forever, or stops at a random point.
- **Vague goal.** The agent never knows when it is done.
- **The agent grades its own work.** It tends to say yes.
- **Gaming the test.** The agent weakens the test instead of improving the work. In research, this means tuning on the years meant for checking.
- **Repeating the same failed move.** Detect "no progress" and change approach.
- **Memory in chat only.** After a long session, chat memory is lost or summarised. Keep state in files.
- **Too many tries, no luck guard.** Try 600 rules and some will look great by chance. Guard with unseen years, not by dropping good rules.
- **Comprehension debt.** The loop makes results faster than the person can follow. Fix: a plain-language casebook at each checkpoint.

## 4. Tools in Claude Code

### `/goal <condition>`: run until a condition is true

- **Built-in command.** Works in the desktop app.
- After every turn, a small separate model reads the chat and judges the condition. It answers "not yet", "met" or "impossible".
  - **Not yet:** Claude starts another turn by itself.
  - **Met or impossible:** the goal clears.
- **The judge cannot run anything.** It has no tools and reads only the chat. So the condition must name a check whose result Claude prints. Example: "`python check.py` prints PASS".
- **One goal per session.** `/goal` alone shows status. `/goal clear` stops it. `/clear` also removes it.
- **No built-in turn limit.** Put one in the condition, e.g. "or stop after 20 turns".
- **It waits for background work.** If background jobs are still running, the judge waits. After 30 minutes it checks in.
- **It stops itself** if several turns pass with no tool use. Errors like no credits or a full context also clear it.
- **Permissions.** For unattended runs, use auto mode. Otherwise tool approvals still pause it.
- **Under the hood** it is a session-only "Stop hook" that asks a model a question.

### `/loop [interval] [prompt]`: rerun a prompt on a timer

- **A bundled skill.**
  - `/loop 5m <prompt>` uses a fixed timer.
  - `/loop <prompt>` with no interval: Claude picks the next wait itself, between 1 minute and 1 hour.
- Use it for **watching something over time**: a build, a deploy, a long background job. It is not a "finish this task" tool.
- Runs only while the session is open and idle.
- Timed loops expire after 7 days.
- To stop it: Esc or Ctrl+C for a loop Claude paces itself. For a fixed timer, ask Claude to cancel it.
- **Desktop app:** the docs don't confirm `/loop` there. The desktop app has its own scheduled tasks feature.

### Other options

- **Stop hook in settings:** same idea as `/goal`, but permanent. It can run a real script as the check. That makes the check exact instead of a model's opinion.
- **`/schedule` routines:** run in the cloud on a timer, at least hourly, even when your computer is off.
- **Background subagents or workflows:** run several tries in parallel inside one pass.

### Which to use

| Situation | Use |
|---|---|
| Work toward a clear finish line: tests pass, a target is met | `/goal` |
| Watch something that changes over time | `/loop` |
| The check must be exact, every session | Stop hook with a script |
| Nightly or weekly, with no session open | `/schedule` or desktop scheduled tasks |

## 5. Research loop template (for our strategy work)

Based on Karpathy's "autoresearch" loop, adapted to trading research. In his loop, the agent may change only the training file. The test is frozen. Each run gets a fixed time budget. Every result goes into a results file. The agent keeps a change only if the score improves, and it never pauses to ask whether to continue.

Set up these files before starting:

1. **`program.md`** holds the rules of the loop:
   - the goal and metric;
   - which files the agent may change;
   - the frozen test and data splits;
   - the stop rules and budgets;
   - the human gates.
2. **`queue.md`** is the ordered list of ideas. Each one is a line: idea, why, expected effect.
3. **`results.tsv`** gets one row per pass: date, idea, trades, bp, bp after costs, years up, t, kept or dropped, note.
4. **`ledger.md`** is the plain-language log, as now.

Each pass:

1. Take the next idea from `queue.md`.
2. Change only the allowed code.
3. Run the frozen scoring on **build years only**.
4. Run the checker:
   - **Score.** Did the metric improve?
   - **Leak audit.** Any peeking at future bars? A separate subagent checks this.
5. Keep or revert, with a git commit or a git checkout.
6. Add a row to `results.tsv` and a line to `ledger.md`.
7. Add any new ideas to the queue.
8. Check the stop rules. If none apply, go again.

At checkpoints:

- **Every N passes**, or when the goal is met: build a casebook with zoomable charts and plain-language notes. Give the full local path.
- **Spend a check look only at a checkpoint.** Freeze the picks in a file and commit it first. Report the result as is.
- **The final years need Kit's OK.** Always.

Judging rules (Kit's standing instructions):

- **Rank by money made after costs.** Then by how steady it is across years, then by results on unseen years.
- **Made-up lines are a side note.** Random or slid-line checks show what drives a result. They are never a reason to drop a rule that works.
- **Never suggest parking a line of work** before the agreed steps have run.

Example `/goal` for one research run:

```text
/goal Work through docs/queue.md for research/steele_intraday on build years only, following program.md.
Done when `python score.py --best` prints PASS (best rule > 4 bp after costs, up in >= 5 of 6 years,
>= 100 trades), or the queue is empty, or 30 passes have run. Every pass adds a row to results.tsv.
Never touch check or final years. Never edit score.py or the data splits.
```

## 6. What we did in the Steele session (2026-10-22 to 25), and the lesson

Kit asked several times to "work in a loop". **Neither `/goal` nor `/loop` was used.**

**What happened:**
- I iterated by hand, one step per reply, stopping often to report.
- Nothing ran between Kit's messages.

**What we had:**
- Fixed data splits.
- A ledger.
- Leak fixes.
- A look budget for unseen years.

**What was missing:**
- A written goal and metric before starting.
- Stop rules.
- An idea queue.
- A separate checker.
- A results file with one row per pass.
- Running on its own.

**Lesson:** when Kit says "loop", first write `program.md` and `queue.md` with Kit, then start `/goal` with a checkable condition. Do not just iterate by hand.

## Sources

- Claude Code docs, `/goal`: https://code.claude.com/docs/en/goal.md
- Claude Code docs, `/loop` and scheduling: https://code.claude.com/docs/en/scheduled-tasks.md
- Claude Code docs, hooks guide (Stop hooks): https://code.claude.com/docs/en/hooks-guide.md
- Claude Code docs, desktop scheduled tasks: https://code.claude.com/docs/en/desktop-scheduled-tasks.md
- Karpathy autoresearch `program.md`: https://github.com/karpathy/autoresearch/blob/master/program.md
- Loop engineering overview: https://www.olostep.com/blog/loop-engineering
- Loop engineering components: https://www.mindstudio.ai/blog/what-is-loop-engineering-ai-coding-agents
- Addy Osmani's components and "own the outer loop" (secondary summary): https://www.aibuilderclub.com/blog/loop-engineering-addy-osmani
- Ralph loop (task + verifier + budget, state in files): https://futureagi.com/blog/loop-engineering/ralph-loop/
