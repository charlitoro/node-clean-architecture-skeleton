import statusController from '../../../adapters/controllers/statusController';

export default function statusRouter(express) {
  const router = express.Router();
  const controller = statusController();

  router.get('/', controller.fetchStatus);

  return router;
}
