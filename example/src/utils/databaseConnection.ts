import { connect } from 'mongoose';

/**
 * Connect to the MongoDB database.
 */
const databaseConnection = async (): Promise<void> => {
  try {
    // Initialize the connection
    const { connection } = await connect(`${process.env.MONGODB_URI}`, {
      serverSelectionTimeoutMS: 5000,
    });

    console.info(`Connected to MongoDB database ${connection.name}`);
  } catch (error) {
    console.error(error as string);
    process.exit(1);
  }
};

export default databaseConnection;
