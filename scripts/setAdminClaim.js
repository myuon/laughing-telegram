var admin = require("firebase-admin");
var serviceAccount = require("../secrets/admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
admin
  .auth()
  .setCustomUserClaims("sGPYJ5J9EqRDaipmnZE4Dyszpsj2", { admin: true });
