import jsonapi from 'jsonapi-serializer';
import resources from './resources.js';

export default {
  Contacts: new jsonapi.Serializer(resources.CONTACTS, {
    attributes: ['name', 'avatar-url', 'last-online'],
    transform: (record) => ({
      ...record,
      'last-online': record['last-online']['_seconds']
    })
  })
}
