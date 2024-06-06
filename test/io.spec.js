/* eslint-env mocha */

import { strict as assert } from 'assert'
import { read, write } from '../src/index.js'

// Test utils
import {
  config,
  testAPIs,
  startIpfs,
  stopIpfs
} from 'script.db-test-utils'

Object.keys(testAPIs).forEach((IPFS) => {
  describe(`IO tests (${IPFS})`, function () {
    this.timeout(10000)

    let ipfs, ipfsd

    before(async () => {
      ipfsd = await startIpfs(IPFS, config)
      ipfs = ipfsd.api
    })

    after(async () => {
      await stopIpfs(ipfsd)
    })

    describe('dag-cbor', () => {
      let cid1, cid2
      const data = { test: 'object' }

      it('writes', async () => {
        cid1 = await write(ipfs, 'dag-cbor', data, { pin: true })
        assert.strictEqual(cid1, 'zdpuAwHevBbd7V9QXeP8zC1pdb3HmugJ7zgzKnyiWxJG3p2Y4')
      })

      it('reads', async () => {
        const obj = await read(ipfs, cid1, {})
        assert.deepStrictEqual(obj, data)
      })

      it('writes with links', async () => {
        data[cid1] = cid1
        cid2 = await write(ipfs, 'dag-cbor', data, { links: [cid1] })
        assert.strictEqual(cid2, 'zdpuAqeyAtvp1ACxnWZLPW9qMEN5rJCD9N3vjUbMs4AAodTdz')
      })

      it('reads from links', async () => {
        const obj = await read(ipfs, cid2, { links: [cid1] })
        data[cid1] = cid1
        assert.deepStrictEqual(obj, data)
      })
    })

    describe('dag-pb', () => {
      let cid
      const data = { test: 'object' }

      it('writes', async () => {
        cid = await write(ipfs, 'dag-pb', data, { pin: true })
        assert.strictEqual(cid, 'QmaPXy3wcj4ds9baLreBGWf94zzwAUM41AiNG1eN51C9uM')
      })

      it('reads', async () => {
        const obj = await read(ipfs, cid, {})
        assert.deepStrictEqual(obj, data)
      })
    })

    describe('raw', () => {
      let cid
      const data = { test: 'object' }

      it('writes', async () => {
        cid = await write(ipfs, 'raw', data, { pin: true })
        assert.strictEqual(cid, 'zdpuAwHevBbd7V9QXeP8zC1pdb3HmugJ7zgzKnyiWxJG3p2Y4')
      })

      it('writes formatted as dag-pb', async () => {
        cid = await write(ipfs, 'raw', data, { format: 'dag-pb' })
        assert.strictEqual(cid, 'QmaPXy3wcj4ds9baLreBGWf94zzwAUM41AiNG1eN51C9uM')
      })

      it('reads', async () => {
        const obj = await read(ipfs, cid, {})
        assert.deepStrictEqual(obj, data)
      })
    })
  })
})
