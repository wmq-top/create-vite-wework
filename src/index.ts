import prompts from "prompts"
import { red, lightGreen, lightBlue, lightYellow, reset, green } from 'kolorist'
import { readFileSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from "node:url"
import { copy } from './utils'
import { configList } from './config/index'
import { exit } from "node:process"


const cwd = process.cwd()

const UIOptions = [
  { name: 'antd-vue', display: 'antd-vue', color: lightBlue },
  { name: 'element-plus', display: 'element-plus', color: lightGreen },
  { name: 'devui-vue', display: 'devui-vue', color: lightYellow }
]
async function initProcess() {
  let result: prompts.Answers<'projectName' | 'ui-frameWork'>

  try {
    result = await prompts([{
      type: "text",
      name: 'projectName',
      message: reset('please input the project name'),
      initial: 'vite-wework',
    }, {
      type: "select",
      name: 'ui-frameWork',
      message: reset('please select a ui frameWork'),
      initial: 0,
      choices: UIOptions.map((item) => {
        const { color } = item
        return {
          title: color(item.display || item.name),
          value: item.name
        }
      })
    }], {
      onCancel: () => { throw new Error(red('OP Canceled')) }
    })
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }
  const templateDir = resolve(fileURLToPath(import.meta.url), '../..', 'template')
  const packageJsonPath = resolve(templateDir, './package.json')
  console.log(templateDir)
  console.log(packageJsonPath)

  console.log(cwd)
  const root = join(cwd, result.projectName)
  mkdirSync(root, { recursive: true })
  const write = (file: string, content?: string) => {
    const targetPath = join(root, file)
    if (content) {
      writeFileSync(targetPath, content)
    } else {
      copy(join(templateDir, file), targetPath)
    }
  }

  const files = readdirSync(templateDir)

  for (const file of files.filter((f: string) => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(readFileSync(join(templateDir, `package.json`), 'utf-8'))
  pkg.name = result.projectName
  const framework = result["ui-frameWork"] as keyof typeof configList
  pkg.dependencies[configList[framework].name] = configList[framework].baseVersion
  pkg.dependencies[configList[framework].icon] = configList[framework].iconVersion
  write('package.json', JSON.stringify(pkg, null, 2))

  console.log(green(`Done! now run:\n`))
  console.log(`  cd ${result.projectName}`)
  console.log(`  npm i`)
  console.log(`  npm run dev`)
  exit(0)
}

initProcess().catch((e: Error) => {
  console.log(e)
})