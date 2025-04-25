import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export default defineNuxtModule({
  setup () {
    const resolver = createResolver(import.meta.url)

    extendPages((pages) => {
      pages.find(p => p.path === '/projects/:projectId()')?.children?.push({
        name: 'projects-projectId-chats-id',
        path: 'chats/:id()',
        file: resolver.resolve('../pages/chats/[id].vue')
      })
    })
  }
})
