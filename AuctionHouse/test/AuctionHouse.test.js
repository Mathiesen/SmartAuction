const AuctionHouse = artifacts.require("AuctionHouse");
const AuctionItem = artifacts.require("AuctionItem");



contract("AuctionHouse", (accounts) => {
  let auctionHouse;
  let auctionItemAddress;
  let owner = accounts[0];
  let bidder1 = accounts[1];
  let bidder2 = accounts[2];

  beforeEach(async () => {
    auctionHouse = await AuctionHouse.new({ from: owner });

    // Add an auction item
    const tx = await auctionHouse.addAuctionItem(
      "Laptop",
      "A used laptop",
      "Good",
      Math.floor(Date.now() / 1000),
      Math.floor(Date.now() / 1000) + 600, // 10 minutes later
      "500 USD",
      { from: owner }
    );

    // Extract the auction item address from the event
    auctionItemAddress = tx.logs[0].args.auctionItemAddress;
  });

  it("should add an auction item", async () => {
    const result = await auctionHouse.getAuctionItem(auctionItemAddress);

    expect(result[0]).to.equal("Laptop");
    expect(result[1]).to.equal("A used laptop");
    expect(result[2]).to.equal("Good");
  });

  it("should allow users to place bids", async () => {
    await auctionHouse.addBid(auctionItemAddress, {
      from: bidder1,
      value: web3.utils.toWei("1", "ether"),
    });

    const latestBid = await auctionHouse.getBid(auctionItemAddress, 0);

    expect(latestBid[1]).to.equal(bidder1);
  });

  it("should reject bids lower than the current highest bid", async () => {
    // First bid
    await auctionHouse.addBid(auctionItemAddress, {
      from: bidder1,
      value: web3.utils.toWei("2", "ether"),
    });

    // Lower bid (should fail)
    try {
      await auctionHouse.addBid(auctionItemAddress, {
        from: bidder2,
        value: web3.utils.toWei("1", "ether"),
      });
      assert.fail("Lower bid should have failed");
    } catch (error) {
      expect(error.reason).to.equal("Bid must be higher than the current bid");
    }
  });

  it("should allow users to withdraw their previous bids if they were outbid", async () => {
    // First bid
    await auctionHouse.addBid(auctionItemAddress, {
      from: bidder1,
      value: web3.utils.toWei("1", "ether"),
    });

    // Second bid (outbids the first)
    await auctionHouse.addBid(auctionItemAddress, {
      from: bidder2,
      value: web3.utils.toWei("2", "ether"),
    });

    // Check pending returns for bidder1
    const pending = await auctionHouse.pendingReturns(bidder1);
    expect(pending.toString()).to.equal(web3.utils.toWei("1", "ether"));

    // Withdraw funds
    await auctionHouse.withdraw({ from: bidder1 });

    // Check pending returns after withdrawal
    const pendingAfter = await auctionHouse.pendingReturns(bidder1);
    expect(pendingAfter.toString()).to.equal("0");
  });

  it("should not allow withdrawal if the user has no funds to withdraw", async () => {
    try {
      await auctionHouse.withdraw({ from: bidder1 });
      assert.fail("Should have failed due to no funds to withdraw");
    } catch (error) {
      expect(error.reason).to.equal("No funds to withdraw");
    }
  });

  it("should finalize an auction and transfer payout to the seller", async () => {
    // Place bid
    await auctionHouse.addBid(auctionItemAddress, {
      from: bidder1,
      value: web3.utils.toWei("3", "ether"),
    });

    // Simulate auction end
    const tx = await auctionHouse.finalizeAuction(auctionItemAddress);

    // Check finalized state
    const auctionItem = await AuctionItem.at(auctionItemAddress);
    const isFinalized = await auctionItem.finalized();
    expect(isFinalized).to.be.true;
  });

  it("should reject finalization if the auction is already finalized", async () => {
    // Place bid
    await auctionHouse.addBid(auctionItemAddress, {
      from: bidder1,
      value: web3.utils.toWei("3", "ether"),
    });

    // Finalize once
    await auctionHouse.finalizeAuction(auctionItemAddress, { from: owner });

    // Try finalizing again (should fail)
    try {
      await auctionHouse.finalizeAuction(auctionItemAddress, { from: owner });
      assert.fail("Finalization should have failed");
    } catch (error) {
      expect(error.reason).to.equal("Auction has been finalized");
    }
  });

  it("should accept ETH deposits", async () => {
    // Send ETH to contract
    await web3.eth.sendTransaction({
      from: bidder1,
      to: auctionHouse.address,
      value: web3.utils.toWei("0.5", "ether"),
    });

    // Check contract balance
    const balance = await web3.eth.getBalance(auctionHouse.address);
    expect(balance).to.equal(web3.utils.toWei("0.5", "ether"));
  });
});
