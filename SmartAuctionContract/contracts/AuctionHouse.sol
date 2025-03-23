// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./AuctionItem.sol";
import "./Bid.sol";

contract AuctionHouse {
  mapping(address => AuctionItem) public items;
  mapping(address => uint) public pendingReturns;
  address[] public itemAddresses;

  event AuctionItemCreated(address indexed auctionItemAddress, address seller);
  event BidPlaced(address indexed itemId, address indexed bidder, uint256 amount);
  event AuctionFinalized(address indexed itemAddr, address indexed seller, address indexed highBidder, uint winningBid, uint payout);
  event DebugLog(string message, bool finalized);

  constructor()  {
  }

  function addAuctionItem(
    string memory name,
    string memory description,
    string memory condition,
    uint created,
    uint done,
    string memory estimate) 
    public returns (address addr) {
      AuctionItem auctionItem = new AuctionItem(name, description, condition, created, done, estimate, msg.sender);
      addr = address(auctionItem);
      items[addr] = auctionItem;
      itemAddresses.push(addr);
      emit AuctionItemCreated(addr, msg.sender);
  }

  function getAuctionItem(address addr) public view returns(
    string memory,
    string memory,
    string memory,
    uint,
    uint,
    string memory,
    uint
  ) {
    AuctionItem item = items[addr];
    return (
    item.name(), 
    item.description(),
    item.condition(), 
    item.created(),
    item.done(), 
    item.estimate(), 
    item.currentBid());
  }

  function getAuctionItems() public view returns(
    string[] memory names,
    string[] memory descriptions,
    string[] memory conditions,
    uint[] memory created,
    uint[] memory done,
    string[] memory estimates,
    uint[] memory currentBids,
    address[] memory contractAddresses) 
    {
      uint lenght = itemAddresses.length;
      names = new string[](lenght);
      descriptions = new string[](lenght);
      conditions = new string[](lenght);
      created = new uint[](lenght);
      done = new uint[](lenght);
      estimates = new string[](lenght);
      currentBids = new uint[](lenght);
      contractAddresses = new address[](lenght);

      for (uint i = 0; i < lenght; i++) {
        address addr = itemAddresses[i];
        AuctionItem item = items[addr];
        names[i] = item.name();
        descriptions[i] = item.description();
        conditions[i] = item.condition();
        created[i] = item.created();
        done[i] = item.done();
        estimates[i] = item.estimate();
        currentBids[i] = item.currentBid();
        contractAddresses[i] = addr;
      }
  }

  function getSeller(address auctionAddr) public view returns (address) {
        AuctionItem item = items[auctionAddr];
        return item.seller();
  }

  function getBid(address itemAddr, uint bidId) public view returns (uint, address) {
    AuctionItem item = items[itemAddr];
    return item.getBid(bidId);
  }

  function getBids(address itemAddr) public view returns (
    uint[] memory bidCreated, 
    address[] memory bidders, 
    uint[] memory bidAmount) {

    AuctionItem item = items[itemAddr];
    return item.getBids();
  }

  function addBid(address itemAddr) public payable {    
    AuctionItem auctionItem = items[itemAddr];
    (, address highBidder, uint amount) = auctionItem.getLatestBid();
    require(msg.value > amount, "Bid must be higher than the current bid");

    if (highBidder != address(0)) {
      pendingReturns[highBidder] += amount;
    }

    auctionItem.addBid(Bid(block.timestamp, msg.sender, msg.value));

    emit BidPlaced(itemAddr, msg.sender, msg.value);
  }

  function withdraw() public {
    uint amount = pendingReturns[msg.sender];
    require(amount > 0, "No funds to withdraw");

    pendingReturns[msg.sender] = 0;

    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Withdrawel failed");
  }

  function finalizeAuction(address itemAddr) public {
    AuctionItem item = items[itemAddr];

    //require(item.auctionOver(), "Auction is not over yet");
    require(!item.finalized(), "Auction has been finalized");

    address seller = item.seller();
    uint winningBid = item.currentBid();
    uint commision = winningBid * 10 / 100;
    uint payout = winningBid - commision;
    address highBidder = item.highBidder();
    
    (bool success, ) = seller.call{value: payout}("");
    require(success, "Transfer to seller failed");

    item.markFinalized();
    emit AuctionFinalized(itemAddr, seller, highBidder, winningBid, payout);
  }

  receive() external payable {}
}
