let assert = require('assert')
let fs = require('../src/filesystem')
let snap = require('../src/snapshot')

describe("filesystem", () => {
  describe("create a filesystem", () => {
    it("should not crash", async () => {
      await fs.create('test_pool/a')
    })
    after(async () => {
      await fs.destroy('test_pool/a')
    })
  })

  describe("destoy a filesystem", () => {
    before(async () => {
      await fs.create('test_pool/a')
    })
    it("should not crash", async () => {
      await fs.destroy('test_pool/a')
    })
  })
})

describe("snapshot", () => {
  before(async () => {
    await fs.create('test_pool/a')
  })
  
  describe("create snapshot", () => {
    it("should not crash", async () => {
      await snap.create('test_pool/a', 'snap1')
    })
    after(async () => {
      await snap.destroy('test_pool/a', 'snap1')
    })
  })
  after(async () => {
    await fs.destroy('test_pool/a')
  })
})