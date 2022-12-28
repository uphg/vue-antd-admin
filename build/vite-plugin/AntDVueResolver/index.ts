import type { ComponentResolver } from 'unplugin-vue-components'
import type { AntDVueResolverOptions } from './types'
import { singleNames, groupNames } from './name'
import { kebabCase } from '../../utils'

/**
 * Resolver for Ant Design of Vue
 * @link https://1x.antdv.com/docs/vue/introduce-cn/
 * @version @ant-design-vue ^1.7.8, @vue ^2.7.14
 * @author @nabaonan
 */
export function AntDVueResolver(options: AntDVueResolverOptions = { importStyle: 'css' }): ComponentResolver {
  const cached: string[] = []

  function getSideEffects(path: string, options: AntDVueResolverOptions) {
    if (cached.includes(path)) return
    cached.push(path)
    return {
      from: path,
      sideEffects: `${path}/style/${options.importStyle === 'css' ? 'css' : 'index'}.js`
    }
  }

  return {
    type: 'component',
    resolve: (name: string) => {
      if (/^A[A-Z]/.test(name)) {
        const primitiveName = name.slice(1)
        const { cjs = true, packageName = 'ant-design-vue' } = options
        const lib = cjs ? 'lib' : 'es'
        const pathPrefix = `${packageName}/${lib}/`

        if (singleNames.includes(primitiveName)) {
          const path = pathPrefix + kebabCase(primitiveName)
          return getSideEffects(path, options)
        }

        const group = groupNames.find(item => item[1].test(primitiveName))
        if (group) {
          const path = pathPrefix + kebabCase(group[0])
          return getSideEffects(path, options)
        }
      }
    },
  }
}
