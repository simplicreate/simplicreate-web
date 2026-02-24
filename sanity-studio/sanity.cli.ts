import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'zr082jb6',
    dataset: 'production'
  },
  deployment: {
    appId: 'hrg2c5cp2sxu3aqea5zmwv1n',
    autoUpdates: true,
  }
})
