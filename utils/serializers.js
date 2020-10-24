import jsonapi from 'jsonapi-serializer';
import resources from './resources.js';

export default {
  Contacts: new jsonapi.Serializer(resources.CONTACTS, {
    attributes: ['name']
  })
}
