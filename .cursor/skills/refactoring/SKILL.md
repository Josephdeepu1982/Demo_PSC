---
name: refactoring
description: Analyze existing code and improve readability, structure, and maintainability without changing behavior. Use when the user mentions refactoring, cleanup, code quality, readability, structure, maintainability, or explicitly asks to use the refactoring skill.
---

# Refactoring

## Goal

Improve code in a disciplined workflow:

1. Analyze the current code.
2. Suggest improvements.
3. Ensure there is no behavior change.
4. Improve readability and structure.

## Workflow

### 1. Analyze Current Code

- Read the existing implementation before proposing structural changes.
- Identify pain points such as duplication, unclear naming, oversized functions, mixed responsibilities, or hard-to-follow control flow.
- Understand the current behavior, inputs, outputs, and important edge cases before editing.

### 2. Suggest Improvements

- Explain the main improvement opportunities before broad edits.
- Prefer targeted, high-value refactors over sweeping cleanup.
- Choose changes that make the code easier to read, test, and maintain.

### 3. Ensure No Behavior Change

- Treat behavior preservation as the default requirement unless the user explicitly asks for functional changes.
- Keep existing inputs, outputs, and user-visible behavior stable.
- If a refactor risks behavior drift, call out the risk before implementing.

### 4. Improve Readability And Structure

- Use clearer names, smaller functions, and better separation of concerns where useful.
- Remove duplication when it improves clarity.
- Keep related logic together and avoid unnecessary abstraction.
- Change only the files needed for the refactor.

## Verification

- Verify the refactor with the most relevant checks available:
  - existing tests
  - focused new tests when they materially reduce regression risk
  - lint check
  - build check
  - manual verification for unchanged behavior
- Report what was verified and any remaining uncertainty.

## Working Rules

- Do not mix bug fixes or feature changes into a refactor unless necessary and clearly explained.
- Do not assume readability improvements are worth it if they add abstraction without clarity.
- Prefer incremental refactors over large rewrites when the code is already working.
- Preserve external behavior even when internal structure changes significantly.

## Suggested Response Structure

Use a flexible structure, but cover these points when relevant:

- current issue in the code structure
- proposed improvement
- behavior-preservation plan
- implementation summary
- verification

## Example

User request:

```text
Refactor this form validation module so it is easier to maintain.
```

Good approach:

1. Inspect the current validation helpers and identify duplication or mixed responsibilities.
2. Suggest a smaller structure such as shared helpers or clearer function boundaries.
3. Confirm that error messages, validation timing, and returned values will stay the same.
4. Implement the readability improvements without changing public behavior.
5. Verify with targeted tests, linting, and any existing validation checks.
