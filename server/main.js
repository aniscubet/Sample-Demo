import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/messagesMethods';
import '/imports/api/messagesPublications';

const users = [
  {
    username: 'user_1',
    password: '123456'
  },
  {
    username: 'user_2',
    password: '123456'
  },
  {
    username: 'user_3',
    password: '123456'
  }
];

Meteor.startup(() => {
  users.forEach((user) => {
    if (!Accounts.findUserByUsername(user.username)) {
      Accounts.createUser({
        username: user.username,
        password: user.password
      });
    }
  });
});
