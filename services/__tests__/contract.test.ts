import { initContract } from '../contract'

describe('Contract', () => {
  describe('initContract', () => {
    it('should return a NearContract instance', async () => {
      const nearContract = await initContract();
      expect(nearContract).toBeDefined();
      expect(nearContract.contract).toBeDefined();
      expect(nearContract.currentUser).toStrictEqual({"accountId": "test_account_id", "balance": "1000000000000"});
      expect(nearContract.walletConnection).toBeDefined();
    })
  })
})