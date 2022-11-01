import { Dialog } from "./Dialog"

export default {
  title: "Dialog",
  component: Dialog,
}

export function Variants() {
  return (
    <Dialog
      isVisible
      title="What is this Dialog?"
      primaryCta={{
        text: "Dunno",
        onPress: () => null,
      }}
      secondaryCta={{
        text: "Hm",
        onPress: () => null,
      }}
    />
  )
}
