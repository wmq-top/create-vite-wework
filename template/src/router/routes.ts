const useHelloWorld = () => import('~/components/HelloWorld.vue')

const routes = [
  {
    path: '/',
    component: useHelloWorld,
  },
]
export { routes }
export default routes
