# Palette Mobile Development Guidelines

## Commands

- Build: `yarn compile`
- Lint: `yarn lint:all` or `yarn lint path/to/file.tsx`
- Type check: `yarn type-check`
- Test all: `yarn test --maxWorkers=2`
- Test single file: `yarn test path/to/Component.tests.tsx`
- Test pattern: `yarn test -t "test pattern"`
- Start dev server: `yarn start` or `yarn start:reset-cache`

## Code Style

- No semicolons, double quotes, 100 char line width
- Files organized by component: ComponentName.tsx, ComponentName.tests.tsx, ComponentName.stories.tsx
- React imports not required (using react-jsx)
- Use TypeScript strictly with proper typing
- Components should have stories for Storybook documentation
- Tests use React Testing Library with renderWithWrappers
- Follow existing patterns for component organization and API design
- Use styled-system for styling with palette-tokens

## Structure

Components are organized in src/elements with consistent patterns across similar components.
Prefer using existing tokens and design system primitives over custom styling.
