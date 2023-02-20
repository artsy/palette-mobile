import { RetryErrorBoundary } from "app/system/wrappers/RetryErrorBoundary"
import { SuspenseWrapper } from "app/system/wrappers/SuspenseWrapper"

export const TabScreen: React.FC = ({ children }) => {
  return (
    <RetryErrorBoundary withoutBackButton>
      <SuspenseWrapper withTabs>{children}</SuspenseWrapper>
    </RetryErrorBoundary>
  )
}
