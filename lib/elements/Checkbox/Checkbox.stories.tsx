import { List, Row } from "../../storybookHelpers"
import { Checkbox } from "./Checkbox"

export default {
  title: "Checkbox",
  component: Checkbox,
}

export function Variants() {
  return (
    <List style={{ marginLeft: 20 }}>
      <Row>
        <Checkbox text="Default" />
      </Row>

      <Row>
        <Checkbox text="Pressed" testOnly_state="pressed" />
      </Row>

      <Row>
        <Checkbox text="Checked" checked />
      </Row>

      <Row>
        <Checkbox text="Disabled" disabled />
      </Row>

      <Row>
        <Checkbox text="Checked and disabled" checked disabled />
      </Row>

      <Row>
        <Checkbox text="Error" error />
      </Row>

      <Row>
        <Checkbox
          text={`Default with multiline
text`}
        />
      </Row>

      <Row>
        <Checkbox text="Disabled" subtitle="With subtitle" disabled />
      </Row>

      <Row>
        <Checkbox
          text={`Error with multiline
text`}
          subtitle="With subtitle"
          error
        />
      </Row>
    </List>
  )
}
