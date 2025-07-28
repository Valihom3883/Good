const AuditLog = require('../../models/auditLog');

const audit = (req, res, next) => {
  const { ip, originalUrl, method } = req;
  const user = req.user ? req.user.id : null;
  const device = req.headers['user-agent'];

  const log = new AuditLog({
    user,
    action: `${method} ${originalUrl}`,
    ipAddress: ip,
    device,
  });

  log.save();

  next();
};

module.exports = audit;
