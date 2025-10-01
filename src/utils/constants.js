// let apiRoot = ''
// Lỗi process is not defined vite, config trong vite.config.js
// if (process.env.BUILD_MODE === 'production') {
//   apiRoot = 'http://localhost:8017'
// }

// if (process.env.BUILD_MODE === 'dev') {
//   apiRoot = 'https://trello-api-express.onrender.com'
// }

const apiRoot = import.meta.env.DEV
  ? 'http://localhost:8017' // Development
  : 'https://trello-api-express.onrender.com' // Production

export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

export const CARD_MEMBER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}

export const TEMPLATE_TYPES = {
  KANBAN: 'Kanban',
  CUSTOM: 'Custom',
  SCRUM: 'Scrum',
  EXTREME: 'Extreme'
}