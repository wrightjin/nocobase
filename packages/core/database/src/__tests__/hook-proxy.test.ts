import { Database } from '..';
import { mockDatabase } from '.';

describe('model hook', () => {
  let db: Database;

  beforeEach(async () => {
    db = mockDatabase();
  });

  afterEach(async () => {
    await db.close();
  });

  describe('match', () => {
    test('sequelize db hooks', async () => {
      const matcher = db.hookProxy.match('beforeDefine');
      expect(matcher).toEqual(['beforeDefine', '']);
    });

    test('sequelize global model hooks', async () => {
      const matcher = db.hookProxy.match('beforeCreate');
      expect(matcher).toEqual(['beforeCreate', '']);
    });

    test('sequelize model hooks without existing collection', async () => {
      const matcher = db.hookProxy.match('posts.beforeCreate');
      expect(matcher).toEqual(['beforeCreate', 'posts']);
    });

    test('sequelize model hooks with existing collection', async () => {
      db.collection({
        name: 'posts',
        fields: []
      });
      const matcher = db.hookProxy.match('posts.beforeCreate');
      expect(matcher).toEqual(['beforeCreate', 'posts']);
    });

    test('customized global hooks', async () => {
      const matcher = db.hookProxy.match('beforeDefineCollection');
      // expect(matcher).toEqual(['beforeDefineCollection', '']);
      expect(matcher).toBeNull();
    });

    test('customized model hooks', async () => {
      db.collection({
        name: 'posts',
        fields: []
      });
      const matcher = db.hookProxy.match('posts.beforeCreateWithAssociations');
      expect(matcher).toEqual(['beforeCreateWithAssociations', 'posts']);
    });
  });
});
