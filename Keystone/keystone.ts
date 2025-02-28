
import { config } from '@keystone-6/core'
import { lists } from './schema'
const cors = require('cors');
import { withAuth, session } from './auth'

const baseUrl = process.env.BASE_URL || 'http://192.168.0.177:3000';

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    storage: {
      images: {
        kind: 'local',
        type: 'image',
        generateUrl: (path) => `${baseUrl}/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
      videos: {
        kind: 'local',
        type: 'file',
        generateUrl: (path) => `${baseUrl}/videos${path}`,
        serverRoute: {
          path: '/videos',
        },
        storagePath: 'public/videos',
      },
    },
    server: {
    cors: {
      origin: '*', 
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  },
  session,
    }
  )
)
