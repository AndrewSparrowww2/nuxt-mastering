import { getAllChats } from '~~/server/repository/chatRepository'

export default defineEventHandler(async (_event) => {
  return getAllChats()
})
