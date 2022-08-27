import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
// ----------------------------------------------------------------------
const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'ali03452@gmail.com',
    'Hamid672@gmail.com',
    'jan345@gmail.com',
    'zeshan453@gmail.com',
    'ali03452@gmail.com',
    'numankhatak@gmail.com',
    'Fida2211@gmail.com',
    'haris5412@gmail.com',
    'hilal6611@gmail.com',
    'ahmad7822@gmail.com'
  ])
}));

export default users;
