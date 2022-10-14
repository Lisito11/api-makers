import AWS from 'aws-sdk'

AWS.config.update({ 
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'users';

  // CREATE OR UPDATE USER
  const createOrUpdateUser = async (data = {}) => {
    const params = {
      TableName: TABLE_NAME,
      Item: data
    }
    try {
      await dynamoClient.put(params).promise()
      return { success: true }
    } catch(error) {
      return { success: false }
    }
  }

  // READ ALL USERS
  const getAllUsers = async () => {
    const params = {
      TableName: TABLE_NAME,
    }
    try {
      const { Items = [] } = await dynamoClient.scan(params).promise()
      return { success: true, data: Items }
    } catch(error) {
      return { success: false, data: null }
    }
  }

  // READ SINGLE USER ON KEY(id)
  const getUser = async (value, key = 'id') => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        [key]: value,
      },
    }
    try {
      const { Item = {} } = await dynamoClient.get(params).promise()
      return { success: true, data: Item }
    } catch(error) {
      return { success: false, data: null }
    }
  }

  // Delete Existing User
  const deleteUser = async (value, key = "id") => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        [key]: value,
      },
    }
    try {
      await dynamoClient.delete(params).promise()
      return { success: true }
    } catch(error) {
      return { success: false }
    }
  }

export {
  createOrUpdateUser,
  getAllUsers,
  getUser,
  deleteUser
}