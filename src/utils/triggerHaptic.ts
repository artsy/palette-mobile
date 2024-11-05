import * as Haptics from "expo-haptics"

const ImpactFeedbackTypes = [
  Haptics.ImpactFeedbackStyle.Light,
  Haptics.ImpactFeedbackStyle.Medium,
  Haptics.ImpactFeedbackStyle.Heavy,
]

const NotificationFeedbackType = [
  Haptics.NotificationFeedbackType.Success,
  Haptics.NotificationFeedbackType.Warning,
  Haptics.NotificationFeedbackType.Error,
]

export const triggerHaptic = (
  haptic: Haptics.NotificationFeedbackType | Haptics.ImpactFeedbackStyle | true | undefined
) => {
  if (haptic !== undefined) {
    // If haptic is one of the enum ImpactFeedbackStyle
    if (
      typeof haptic === "string" &&
      ImpactFeedbackTypes.includes(haptic as Haptics.ImpactFeedbackStyle)
    ) {
      Haptics.impactAsync(haptic as Haptics.ImpactFeedbackStyle)
    }
    if (
      typeof haptic === "string" &&
      NotificationFeedbackType.includes(haptic as Haptics.NotificationFeedbackType)
    ) {
      Haptics.notificationAsync(haptic as Haptics.NotificationFeedbackType)
    }

    if (haptic === true) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }
}
