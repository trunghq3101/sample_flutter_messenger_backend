import express from 'express';
import admin from 'firebase-admin';
import resources from '../utils/resources.js';
import serializers from '../utils/serializers.js';
var router = express.Router();

/* GET contacts listing. */
router.get('/', async (req, res, next) => {
  const db = admin.firestore()
  const snapshot = await db.collection(resources.CONTACTS).get()
  const contacts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  res.send(serializers.Contacts.serialize(contacts));
});

export default router;
