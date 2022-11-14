import { MenuItem } from "./MenuItem"

export default {
  title: "Menu Item",
  component: MenuItem,
}

export const Variations = () => (
  <>
    <MenuItem title="A title" />
    <MenuItem title="A title" value="The value" />
  </>
)

/// fix lineheight26, and fix the import paths
