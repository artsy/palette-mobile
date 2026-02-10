const fs = require("fs")
const path = require("path")

const rootPackagePath = path.resolve(__dirname, "..", "package.json")
const examplePackagePath = path.resolve(__dirname, "..", "Example", "package.json")
const appConfigPath = path.resolve(__dirname, "..", "Example", "app.json")

const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, "utf8"))
const examplePackage = JSON.parse(fs.readFileSync(examplePackagePath, "utf8"))
const appConfig = JSON.parse(fs.readFileSync(appConfigPath, "utf8"))

if (!rootPackage.version) {
  throw new Error("Root package.json has no version field.")
}

if (examplePackage.version !== rootPackage.version) {
  examplePackage.version = rootPackage.version
  fs.writeFileSync(examplePackagePath, JSON.stringify(examplePackage, null, 2) + "\n", "utf8")
}

if (appConfig?.expo && appConfig.expo.version !== rootPackage.version) {
  appConfig.expo.version = rootPackage.version
  fs.writeFileSync(appConfigPath, JSON.stringify(appConfig, null, 2) + "\n", "utf8")
}
