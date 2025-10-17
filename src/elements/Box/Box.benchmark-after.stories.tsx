import { Profiler, ProfilerOnRenderCallback, useState } from "react"
import { ScrollView } from "react-native"
import { Box } from "./Box"
import { Text } from "../Text"

interface BenchmarkResult {
  count: number
  mountTime: number
  updateTime: number
}

const BenchmarkBox = ({ count }: { count: number }) => {
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
        `✨ [AFTER RESTYLE] Box ${count} components - Mount: ${actualDuration.toFixed(2)}ms`
      )
    } else if (phase === "update") {
      setResults((prev) => ({
        count,
        mountTime: prev?.mountTime || 0,
        updateTime: actualDuration,
      }))
      console.log(
        `✨ [AFTER RESTYLE] Box ${count} components - Update: ${actualDuration.toFixed(2)}ms`
      )
    }
  }

  return (
    <Box p={2} backgroundColor="mono5">
      <Box flexDirection="row" justifyContent="space-between" mb={2}>
        <Text variant="md" weight="medium">
          {count} Box Components (Restyle)
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

      <Profiler id={`box-benchmark-restyle-${count}`} onRender={onRender}>
        <Box flexWrap="wrap" flexDirection="row" gap={0.5}>
          {Array.from({ length: count }).map((_, i) => (
            <Box
              key={`${i}-${renderCount}`}
              backgroundColor={i % 2 === 0 ? "blue100" : "red100"}
              p={1}
              borderRadius="4px"
              width={40}
              height={40}
            />
          ))}
        </Box>
      </Profiler>
    </Box>
  )
}

export default {
  title: "Performance/Box Benchmark (After Restyle)",
  component: Box,
}

export const SingleBox = () => <BenchmarkBox count={1} />
export const TwentyBoxes = () => <BenchmarkBox count={20} />
export const FiftyBoxes = () => <BenchmarkBox count={50} />
export const HundredBoxes = () => <BenchmarkBox count={100} />
export const TwoFiftyBoxes = () => <BenchmarkBox count={250} />
export const FiveHundredBoxes = () => <BenchmarkBox count={500} />

export const AllBenchmarks = () => {
  return (
    <ScrollView>
      <Box p={2} gap={2}>
        <Text variant="xl" weight="medium" mb={2}>
          Box Component Performance After Migration
        </Text>
        <Text variant="sm" color="mono60" mb={4}>
          Testing with Restyle after migration
        </Text>

        <BenchmarkBox count={1} />
        <BenchmarkBox count={20} />
        <BenchmarkBox count={50} />
        <BenchmarkBox count={100} />
        <BenchmarkBox count={250} />
        <BenchmarkBox count={500} />
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
            Simple Props (100 boxes)
          </Text>
          <Text variant="sm" color="mono60" mb={2}>
            Mount: {results.simple.toFixed(2)}ms
          </Text>
          <Profiler id="simple-props-restyle" onRender={onRenderSimple}>
            <Box flexWrap="wrap" flexDirection="row" gap={0.5}>
              {Array.from({ length: 100 }).map((_, i) => (
                <Box
                  key={`simple-${i}-${renderCount}`}
                  backgroundColor="blue100"
                  width={30}
                  height={30}
                />
              ))}
            </Box>
          </Profiler>
        </Box>

        <Box>
          <Text variant="md" weight="medium" mb={1}>
            Complex Props (100 boxes)
          </Text>
          <Text variant="sm" color="mono60" mb={2}>
            Mount: {results.complex.toFixed(2)}ms
          </Text>
          <Profiler id="complex-props-restyle" onRender={onRenderComplex}>
            <Box flexWrap="wrap" flexDirection="row" gap={0.5}>
              {Array.from({ length: 100 }).map((_, i) => (
                <Box
                  key={`complex-${i}-${renderCount}`}
                  backgroundColor={i % 3 === 0 ? "blue100" : i % 3 === 1 ? "red100" : "green100"}
                  p={0.5}
                  m={0.25}
                  borderRadius="4px"
                  borderWidth={1}
                  borderColor="mono30"
                  width={30}
                  height={30}
                />
              ))}
            </Box>
          </Profiler>
        </Box>
      </Box>
    </ScrollView>
  )
}
