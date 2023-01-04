import { Flex, Spacer } from "../../atoms"
import { List } from "../../storybookHelpers"
import { Skeleton, SkeletonBox, SkeletonText } from "./Skeleton"
import { Join } from "../Join"
import { range } from "remeda"

export default {
  title: "Skeleton",
  component: Skeleton,
}

export const SkeletonLoaders = () => (
  <List style={{ marginLeft: 50 }} contentContainerStyle={{ alignItems: "flex-start" }}>
    <Skeleton>
      <Join separator={<Spacer y={1} />}>
        <SkeletonText variant="lg">Hi i am loading</SkeletonText>
        <SkeletonText variant="md">Me too</SkeletonText>
        <SkeletonText variant="sm">Also loading</SkeletonText>
        <SkeletonText variant="xs">Also loading</SkeletonText>
      </Join>

      <Spacer y={2} />

      <Flex flexDirection="row" flexWrap="wrap">
        {range(100)(1).map((index) => (
          <SkeletonBox key={index} mr={1} mb={1} width={20} height={20} />
        ))}
      </Flex>
    </Skeleton>
  </List>
)
