import { Profiler, ProfilerOnRenderCallback, useState } from "react"
import { ScrollView } from "react-native"
import { Text, TextProps } from "./Text"
import { Box } from "../Box"

interface BenchmarkResult {
  count: number
  mountTime: number
  updateTime: number
}

const BenchmarkText = ({
  count,
  variant = "sm",
}: {
  count: number
  variant?: TextProps["variant"]
}) => {
  const [results, setResults] = useState<BenchmarkResult | null>(null)
  const [renderCount, setRenderCount] = useState(0)

  const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    if (phase === "mount") {
      setResults((prev) => ({
        count,
        mountTime: actualDuration,
        updateTime: prev?.updateTime || 0,
      }))
      console.log(
        `✨ [AFTER RESTYLE] Text ${count} components (${variant}) - Mount: ${actualDuration.toFixed(
          2
        )}ms`
      )
    } else if (phase === "update") {
      setResults((prev) => ({
        count,
        mountTime: prev?.mountTime || 0,
        updateTime: actualDuration,
      }))
      console.log(
        `✨ [AFTER RESTYLE] Text ${count} components (${variant}) - Update: ${actualDuration.toFixed(
          2
        )}ms`
      )
    }
  }

  return (
    <Box p={2} backgroundColor="mono5">
      <Box flexDirection="row" justifyContent="space-between" mb={2}>
        <Text variant="md" weight="medium">
          {count} Text Components ({variant}) - Restyle
        </Text>
        <Box
          px={1}
          py={0.5}
          backgroundColor="brand"
          borderRadius="4px"
          onTouchEnd={() => setRenderCount((c) => c + 1)}
        >
          <Text variant="xs" color="mono0">
            Force Re-render ({renderCount})
          </Text>
        </Box>
      </Box>

      {results && (
        <Box mb={2}>
          <Text variant="sm" color="mono60">
            Mount: {results.mountTime.toFixed(2)}ms
          </Text>
          {results.updateTime > 0 && (
            <Text variant="sm" color="mono60">
              Update: {results.updateTime.toFixed(2)}ms
            </Text>
          )}
        </Box>
      )}

      <Profiler id={`text-benchmark-restyle-${count}-${variant}`} onRender={onRender}>
        <Box flexWrap="wrap" flexDirection="row" gap={0.5}>
          {Array.from({ length: count }).map((_, i) => (
            <Text
              key={`${i}-${renderCount}`}
              variant={variant}
              color={i % 2 === 0 ? "blue100" : "red100"}
            >
              Sample {i}
            </Text>
          ))}
        </Box>
      </Profiler>
    </Box>
  )
}

export default {
  title: "Performance/Text Benchmark (After Restyle)",
  component: Text,
}

export const SingleText = () => <BenchmarkText count={1} />
export const TwentyTexts = () => <BenchmarkText count={20} />
export const FiftyTexts = () => <BenchmarkText count={50} />
export const HundredTexts = () => <BenchmarkText count={100} />
export const TwoFiftyTexts = () => <BenchmarkText count={250} />
export const FiveHundredTexts = () => <BenchmarkText count={500} />

export const AllBenchmarks = () => {
  return (
    <ScrollView>
      <Box p={2} gap={2}>
        <Text variant="xl" weight="medium" mb={2}>
          Text Component Performance After Migration
        </Text>
        <Text variant="sm" color="mono60" mb={4}>
          Testing with Restyle after migration
        </Text>

        <BenchmarkText count={1} />
        <BenchmarkText count={20} />
        <BenchmarkText count={50} />
        <BenchmarkText count={100} />
        <BenchmarkText count={250} />
        <BenchmarkText count={500} />
      </Box>
    </ScrollView>
  )
}

// Variant comparison benchmark
export const VariantComparison = () => {
  const variants: Array<TextProps["variant"]> = ["xs", "sm", "md", "lg", "xl", "xxl"]
  const [results, setResults] = useState<Record<string, number>>({})

  const createOnRender = (variant: string): ProfilerOnRenderCallback => {
    return (id, phase, actualDuration) => {
      if (phase === "mount") {
        setResults((prev) => ({ ...prev, [variant]: actualDuration }))
      }
    }
  }

  return (
    <ScrollView>
      <Box p={2}>
        <Text variant="xl" weight="medium" mb={2}>
          Variant Performance Comparison (Restyle)
        </Text>
        <Text variant="sm" color="mono60" mb={4}>
          100 components per variant
        </Text>

        {variants.map((variant) => (
          <Box key={variant} mb={2}>
            <Text variant="md" weight="medium" mb={1}>
              Variant: {variant}
            </Text>
            {results[variant] && (
              <Text variant="sm" color="mono60" mb={2}>
                Mount: {results[variant].toFixed(2)}ms
              </Text>
            )}
            <Profiler id={`variant-restyle-${variant}`} onRender={createOnRender(variant)}>
              <Box flexWrap="wrap" flexDirection="row" gap={0.5}>
                {Array.from({ length: 100 }).map((_, i) => (
                  <Text key={i} variant={variant}>
                    Text
                  </Text>
                ))}
              </Box>
            </Profiler>
          </Box>
        ))}
      </Box>
    </ScrollView>
  )
}

// Complex props benchmark
export const ComplexPropsComparison = () => {
  const [results, setResults] = useState<{ simple: number; complex: number }>({
    simple: 0,
    complex: 0,
  })
  const [renderCount, setRenderCount] = useState(0)

  const onRenderSimple: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    if (phase === "mount") {
      setResults((prev) => ({ ...prev, simple: actualDuration }))
    }
  }

  const onRenderComplex: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
    if (phase === "mount") {
      setResults((prev) => ({ ...prev, complex: actualDuration }))
    }
  }

  return (
    <ScrollView>
      <Box p={2}>
        <Text variant="xl" weight="medium" mb={2}>
          Complex Props Impact (Restyle)
        </Text>

        <Box
          px={1}
          py={0.5}
          backgroundColor="brand"
          borderRadius="4px"
          onTouchEnd={() => setRenderCount((c) => c + 1)}
          mb={2}
        >
          <Text variant="xs" color="mono0">
            Force Re-render ({renderCount})
          </Text>
        </Box>

        <Box mb={4}>
          <Text variant="md" weight="medium" mb={1}>
            Simple Props (100 texts)
          </Text>
          <Text variant="sm" color="mono60" mb={2}>
            Mount: {results.simple.toFixed(2)}ms
          </Text>
          <Profiler id="simple-text-props-restyle" onRender={onRenderSimple}>
            <Box flexWrap="wrap" flexDirection="row" gap={0.5}>
              {Array.from({ length: 100 }).map((_, i) => (
                <Text key={`simple-${i}-${renderCount}`}>Simple text</Text>
              ))}
            </Box>
          </Profiler>
        </Box>

        <Box>
          <Text variant="md" weight="medium" mb={1}>
            Complex Props (100 texts)
          </Text>
          <Text variant="sm" color="mono60" mb={2}>
            Mount: {results.complex.toFixed(2)}ms
          </Text>
          <Profiler id="complex-text-props-restyle" onRender={onRenderComplex}>
            <Box flexWrap="wrap" flexDirection="row" gap={0.5}>
              {Array.from({ length: 100 }).map((_, i) => (
                <Text
                  key={`complex-${i}-${renderCount}`}
                  variant={i % 2 === 0 ? "sm" : "md"}
                  color={i % 3 === 0 ? "blue100" : i % 3 === 1 ? "red100" : "green100"}
                  italic={i % 4 === 0}
                  weight={i % 5 === 0 ? "medium" : "regular"}
                >
                  Complex text
                </Text>
              ))}
            </Box>
          </Profiler>
        </Box>
      </Box>
    </ScrollView>
  )
}
