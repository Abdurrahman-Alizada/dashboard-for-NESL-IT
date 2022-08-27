import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const Useruser = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  Address: faker.company.companyName(),
  isVerified: sample([
    '+923049463718',
    '+923063038372',
    '+923039849383',
    '+923013948493',
    '+923023883730',
    '+923009384938',
    '+923027590239',
    '+923082057029',
    '+923064353245',
    '+92308t593793'
  ]),
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
// const regUsers = [
//   {
//       id: 10,
//       name: "Kolo Mee",
//       description: "Noodles with char siu",
//       calories: 200,
//       price: 5
//   },
  
// ] 
export default Useruser;
