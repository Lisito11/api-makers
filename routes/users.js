import express from 'express'
import { createOrUpdateUser, getAllUsers, getUser, deleteUser } from '../services/dynamodb.js'

const router = express.Router()

// GET ALL USERS
router.get('/users', async (req, res) => {
  const { success, data, error } = await getAllUsers()
  if (success) {
    return res.json({ success, data, error})
  }
  return res.status(error.statusCode).json({ success: false, message: error.message, error: error})
});

// GET USER WITH ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const { success, data, error } = await getUser(id)
  if (success) {
    return res.json({ success, data, error })
  }
  return res.status(error.statusCode).json({ success: false, message: error.message, error: error})
});

// CREATE NEW USER
router.post('/users', async (req, res) => {
  const { success, data, error } = await createOrUpdateUser(req.body)
  if (success) {
    return res.json({ success, data, error })
  }
  return res.status(error.statusCode).json({ success: false, message: error.message,error: error})
});

// UPDATE EXISTING USER
router.put('/users/:id', async (req, res) => {
  const user = req.body
  const { id } = req.params
  user.id = id

  const { success, data, error } = await createOrUpdateUser(user)
  if (success) {
    return res.json({ success, data, error })
  }
  return res.status(error.statusCode).json({ success: false, message: error.message, error: error})
});

// DELETE USER
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const { success, data, error } = await deleteUser(id)
  if (success) {
    return res.json({ success, data, error })
  }
  return res.status(error.statusCode).json({ success: false, message: error.message ,error: error})
});

export default router