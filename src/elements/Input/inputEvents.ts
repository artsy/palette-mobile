import { EventEmitter } from "events"

/**
 * Deliberately kept in its own module.
 *
 * An `EventEmitter` cannot be copied to the Reanimated UI runtime. When a worklet reads an
 * exported binding, TypeScript's CommonJS output compiles that read into `exports.<name>`, so
 * Reanimated's babel plugin captures the module's entire `exports` object into the worklet
 * closure. If this emitter lived alongside a worklet (as it used to, in `Input.tsx`), serializing
 * that closure would walk into it and throw:
 *
 *   [Worklets] Cannot copy value of type `EventEmitter`.
 *
 * Keeping it out of any module that contains worklets means it can never be dragged across the
 * thread boundary by accident.
 */
export const inputEvents = new EventEmitter()

export const emitInputClearEvent = () => {
  inputEvents.emit("clear")
}
