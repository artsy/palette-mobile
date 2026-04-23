const { execSync } = require("child_process")
const fs = require("fs")

const write = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n")

module.exports = class SyncExampleVersionPlugin {
  constructor() {
    this.name = "sync-example-version"
  }

  apply(auto) {
    auto.hooks.afterVersion.tapPromise(this.name, async ({ dryRun }) => {
      if (dryRun) return

      const version = JSON.parse(fs.readFileSync("package.json", "utf8")).version
      auto.logger.log.info(`Syncing Example versions to ${version}...`)

      const examplePkg = JSON.parse(fs.readFileSync("Example/package.json", "utf8"))
      examplePkg.version = version
      write("Example/package.json", examplePkg)

      const appJson = JSON.parse(fs.readFileSync("Example/app.json", "utf8"))
      appJson.expo.version = version
      write("Example/app.json", appJson)

      execSync("git add Example/package.json Example/app.json")
      execSync('git commit -m "chore: sync Example versions [skip ci]"')
    })
  }
}
