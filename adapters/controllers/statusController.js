import healthCheck from '../../application/use_cases/status/healthCheck';

export default function statusController() {
  const fetchStatus = (req, res, next) => {
    healthCheck().then((status) => res.json(status));
  };

  return {
    fetchStatus
  };
}
