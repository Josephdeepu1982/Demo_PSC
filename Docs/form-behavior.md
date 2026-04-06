# Form Behavior

## Phase 3 Scope

This phase introduces local React state for the mock form while intentionally stopping short of validation and submission behavior.

## Current Behavior

- All fields are controlled inputs backed by local component state.
- Each input updates a shared state object through a common change handler.
- The remarks counter updates from the actual typed value.
- The submit button remains visually disabled and does not submit data.
- A small preview panel shows the current local state for development only.

## Current Non-Goals

- No validation rules are enforced yet.
- No error messages are rendered yet.
- No submit handler sends data anywhere.
- No console logging or debug output is used for state inspection.

## Preview Path

The preview panel is the current debug-free development path for confirming that local state updates correctly without introducing network calls or a real submission flow.
