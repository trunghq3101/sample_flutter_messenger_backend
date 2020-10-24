import express from 'express';
var router = express.Router();
import JSONAPISerializer from 'jsonapi-serializer';

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  var ContactsSerializer = new JSONAPISerializer('contacts', {
    attributes: ['name']
  });
  const contacts = [
    {
      id: '1',
      name: 'Trung'
    },
    {
      id: '2',
      name: 'Thao'
    }
  ]
  res.send(ContactsSerializer.serialize(contacts));
});

export default router;
