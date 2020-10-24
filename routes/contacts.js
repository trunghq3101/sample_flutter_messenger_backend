var express = require('express');
var router = express.Router();
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

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

module.exports = router;
