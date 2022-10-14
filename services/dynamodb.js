import AWS from 'aws-sdk'

AWS.config.update({ 
  region: "us-east-1",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
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
      return { success: true,error: null  }
    } catch(error) {
      return { success: false, error:error }
    }
  }

  // READ ALL USERS
  const getAllUsers = async () => {
    const params = {
      TableName: TABLE_NAME,
    }
    try {
      const { Items = [] } = await dynamoClient.scan(params).promise()
      return { success: true, data: Items, error: null }
    } catch(error) {
      return { success: false, data: null, error: error }
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
      return { success: true, data: Item, error: null  }
    } catch(error) {
      return { success: false, data: null, error: error }
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
      return { success: true, error: null }
    } catch(error) {
      return { success: false, error:error }
    }
  }

export {
  createOrUpdateUser,
  getAllUsers,
  getUser,
  deleteUser
}