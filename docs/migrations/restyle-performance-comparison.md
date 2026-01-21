# Restyle Performance Comparison

This document describes how to measure and compare the performance impact of migrating from styled-components to Restyle.

## Overview

We've created benchmark stories for both **before** and **after** the migration to Restyle. These benchmarks measure rendering performance for different numbers of components (1, 20, 50, 100, 250, and 500).

## Running the Benchmarks

### Before Migration Benchmarks

Located in:

- `src/elements/Box/Box.benchmark.tsx` (styled-components)
- `src/elements/Text/Text.benchmark.tsx` (styled-components)

### After Migration Benchmarks

Located in:

- `src/elements/Box/Box.benchmark-after.tsx` (Restyle)
- `src/elements/Text/Text.benchmark-after.tsx` (Restyle)

## How to Compare

1. **Open Storybook** in your Example app
2. Navigate to **Performance/Box Benchmark (Before Restyle)**
3. Run through the different component count stories (1, 20, 50, 100, 250, 500)
4. Note the mount and update times displayed
5. Navigate to **Performance/Box Benchmark (After Restyle)**
6. Run through the same stories and compare the times
7. Repeat for Text benchmarks

### Quick Comparison View

Use the **AllBenchmarks** story in each benchmark file to see all counts in a single view:

- `Performance/Box Benchmark (Before Restyle) > AllBenchmarks`
- `Performance/Box Benchmark (After Restyle) > AllBenchmarks`
- `Performance/Text Benchmark (Before Restyle) > AllBenchmarks`
- `Performance/Text Benchmark (After Restyle) > AllBenchmarks`

## Metrics to Compare

### 1. Mount Time

The time it takes to initially render the components. Lower is better.

### 2. Update Time

The time it takes to re-render the components after a state change. Lower is better.

### 3. Complex Props Impact

Compare how complex prop combinations affect performance:

- Simple props: basic backgroundColor, width, height
- Complex props: multiple colors, spacing, borders

## Expected Results

Restyle is generally expected to have:

- ✅ Similar or better performance for initial mount
- ✅ Better performance for updates (due to optimized style calculations)
- ✅ More consistent performance across different prop combinations
- ✅ Better memory efficiency for large lists

## Performance Tips

### For Box/Flex Components

- Use responsive props sparingly (only when needed)
- Prefer static values over dynamic calculations
- Use memo() for complex nested layouts

### For Text Components

- Leverage text variants instead of custom props when possible
- Use consistent font families across the app
- Avoid excessive inline styling

## Troubleshooting

If you see unexpected performance degradation:

1. **Check if gap props are causing issues**: `gap`, `rowGap`, `columnGap` might have different implementations
2. **Verify breakpoint values**: Responsive props calculate at runtime
3. **Profile with React DevTools**: Use the Profiler tab to identify bottlenecks
4. **Check theme size**: Large theme objects can impact performance

## Cleanup

After verifying performance is acceptable, you can:

1. Remove the "before" benchmark files (`.benchmark.tsx`)
2. Rename "after" files to remove the `-after` suffix
3. Update the story titles to remove "(Before/After Restyle)" labels

## Notes

- Performance can vary between iOS and Android
- Test on physical devices, not just simulators
- Consider the impact of slow devices (older hardware)
- Re-renders from parent components can affect results
