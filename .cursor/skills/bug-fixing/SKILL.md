---
name: bug-fixing
description: Diagnose and fix bugs from errors, failing tests, runtime logs, or unexpected behavior. Use when the user mentions bugs, debugging, failures, stack traces, logs, regressions, or explicitly asks to use the bug-fixing skill.
---

# Bug Fixing

## Goal

Resolve bugs with a disciplined workflow:

1. Analyze the error or log output.
2. Identify the most likely root cause.
3. Propose a fix before broad edits.
4. Implement the smallest effective change.
5. Verify the fix with a focused test or equivalent check.

## Workflow

### 1. Analyze Error Or Logs

- Start from concrete evidence: stack traces, failing tests, lint errors, console output, screenshots, or reproduction steps.
- If the bug is not reproducible yet, gather the minimum missing context before changing code.
- Prefer runtime evidence over guesswork.

### 2. Identify Root Cause

- Trace the failure back to the specific condition, input, or code path that explains it.
- Distinguish the symptom from the cause.
- Call out uncertainty when multiple causes are plausible.

### 3. Propose Fix

- State the intended fix in a sentence or two before editing, especially for non-trivial changes.
- Prefer the smallest change that addresses the actual cause.
- Avoid bundling opportunistic refactors into a bug fix unless they are required.

### 4. Implement Fix

- Change only the files needed for the fix.
- Preserve existing behavior outside the bug scope.
- Keep the implementation readable and easy to verify.

### 5. Verify With Test

- Run the most relevant verification available:
  - focused unit test
  - failing integration test
  - lint check
  - build check
  - local reproduction of the fixed flow
- If no automated test exists, add one when it materially reduces regression risk.
- Report what was verified and what remains unverified.

## Working Rules

- Do not claim a fix without verification.
- Do not stop at the symptom if the root cause is still unclear.
- If the evidence is incomplete, ask for the missing reproduction details instead of guessing.
- If the fix is risky or broad, explain the tradeoff before implementation.

## Suggested Response Structure

Use a flexible structure, but cover these points when relevant:

- observed issue
- root cause
- fix
- verification
- remaining risk

## Example

User report:

```text
The submit button stays disabled even after all fields are filled in.
```

Good approach:

1. Inspect the current validation logic and disabled-state condition.
2. Identify whether a required field, touched-state rule, or derived validity check is stale.
3. Explain the intended fix before editing if multiple files are involved.
4. Implement the smallest fix to the validity logic.
5. Verify with a targeted test and a manual form interaction check.
