import { expect } from 'chai';
import sinon from 'sinon';

import { UserError } from '../utils/error';
import { createUser } from './createUser';
import * as dataStore from './dataStore';

type Stub = sinon.SinonStub<any, any>;

describe('createUser', () => {
  let findUserByEmailStub: Stub;
  let insertUserStub: Stub;

  before(() => {
    findUserByEmailStub = sinon.stub(dataStore, 'findUserByEmail');
    insertUserStub = sinon.stub(dataStore, 'insertUser');
  });

  afterEach(() => {
    sinon.reset();
  });

  after(() => {
    sinon.restore();
  });

  it('throw if email is not provided', async () => {
    const email = undefined as unknown as string;
    try {
      const _user = await createUser(email);

      // should not be executed
      expect(false).ok;
    } catch (err) {
      expect(err).to.be.instanceOf(UserError);
      // @ts-ignore
      expect(err.message).to.equals('No email provided');
    }
  });

  it('calls findUserByEmail() and throw if the function throw', async () => {
    const errMessage = 'Some error';
    const email = 'some email';

    findUserByEmailStub.rejects(new Error(errMessage));

    try {
      const _user = await createUser(email);

      // should not be executed
      expect(false).ok;
    } catch (err) {
      expect(findUserByEmailStub.firstCall.firstArg).to.equal(email);
      expect(err).to.be.instanceOf(Error);
      // @ts-ignore
      expect(err.message).to.equals(errMessage);
    }
  });

  it(`throw if the user's account already exists`, async () => {
    const email = 'some email';

    findUserByEmailStub.resolves({});

    try {
      const _user = await createUser(email);
      expect(false).ok;
    } catch (err) {
      expect(findUserByEmailStub.firstCall.firstArg).to.equal(email);
      expect(err).to.be.instanceOf(UserError);
      // @ts-ignore
      expect(err.message).to.equals(
        `User with email '${email}' already exists`
      );
    }
  });

  it('calls insertUser() and throw if the function throw', async () => {
    const errMessage = 'insert user error';
    const email = 'some email';

    findUserByEmailStub.resolves(null);
    insertUserStub.rejects(new Error(errMessage));

    try {
      const _user = await createUser(email);
      expect(false).ok;
    } catch (err) {
      expect(insertUserStub.firstCall.firstArg).to.equal(email);

      expect(err).to.be.instanceOf(Error);
      // @ts-ignore
      expect(err.message).to.equals(errMessage);
    }
  });

  it('returns user id if the user is created', async () => {
    const email = 'some email';
    const newUser = '123';

    findUserByEmailStub.resolves(null);
    insertUserStub.resolves(newUser);

    const user = await createUser(email);
    expect(user).to.deep.equal(newUser);
  });
});
