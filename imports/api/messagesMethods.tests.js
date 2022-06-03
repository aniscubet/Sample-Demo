import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { MessagesCollection } from '/imports/db/MessagesCollection';
import '/imports/api/messagesMethods';

if (Meteor.isServer) {
  describe('Messages', () => {
    describe('methods', () => {
      const userId = Random.id();
      let messageId;

      beforeEach(() => {
        MessagesCollection.remove({});
        messageId = MessagesCollection.insert({
          userId,
          message: "Message for test",
          createdAt: new Date()
        });
      });

      it('can delete owned message', () => {
        mockMethodCall('messages.remove', messageId, { context: { userId } });
        assert.equal(MessagesCollection.find().count(), 0);
      });

      it(`can't delete message without an user authenticated`, () => {
        const fn = () => mockMethodCall('messages.remove', messageId);
        assert.throw(fn, /Not Authorized/);
        assert.equal(MessagesCollection.find().count(), 1);
      });

      it(`can't delete message from another user`, () => {
        const fn = () => mockMethodCall('messages.remove', messageId, {
          context: { userId: 'someId' }
        })
        assert.throw(fn, /Access Denied/);
        assert.equal(MessagesCollection.find().count(), 1);
      });

    });
  });
}
