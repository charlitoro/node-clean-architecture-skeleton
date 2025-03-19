import { logger } from '../../services/loggerService';

export default function connection(mongoose, config, options) {
  function connectToMongo() {
    mongoose
      .connect(config.mongo.uri, options)
      .then(
        () => {},
        (err) => {
          logger.info('Mongodb error', err);
        }
      )
      .catch((err) => {
        logger.error('ERROR:', err);
      });
  }

  mongoose.connection.on('connected', () => {
    logger.info('Connected to MongoDB!');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected!');
  });

  mongoose.connection.on('error', (error) => {
    logger.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB disconnected');
  });

  return {
    connectToMongo
  };
}
