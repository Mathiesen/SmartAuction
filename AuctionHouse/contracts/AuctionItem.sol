// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;

import "./Bid.sol";

contract AuctionItem {
    string public name;
    string public description;
    string public condition;
    uint public created;
    uint public done;
    string public estimate;
    uint public currentBid;
    address public seller;
    address public highBidder;

    Bid[] public bids;
    uint public numBids;
    Bid public latestBid;
    bool public finalized;

    constructor(string memory _name,
                string memory _description,
                string memory _condition,
                uint _created,
                uint _done,
                string memory _estimate,
                address _seller) {
                    name = _name;
                    description = _description;
                    condition = _condition;
                    created = _created;
                    done = _done;
                    estimate = _estimate;
                    currentBid = 0;
                    seller = _seller;
                    numBids = 0;
                    highBidder = address(0);
                    finalized = false;
                }

    function addBid(Bid memory newBid) public {
        require(newBid.bidAmount > currentBid, "Bid amount too low");
        bids.push(newBid);
        currentBid = newBid.bidAmount;
        highBidder = newBid.bidder;
        numBids++;
    }

    function getBid(uint bidId) public view returns (uint, address) {
        Bid storage bid = bids[bidId];
        return (bid.bidAmount, bid.bidder);
    }

    function getLatestBid() public view returns (uint, address, uint) {
        if (bids.length == 0) {
            return (0, address(0), 0);
        }

        Bid memory lastBid = bids[bids.length - 1];
        
        return (lastBid.created, lastBid.bidder, lastBid.bidAmount);
    }

    function auctionOver() public view returns (bool) {
        return block.timestamp >= done;
    }

    function getBids() public view returns (
        uint[] memory bidCreated,
        address[] memory bidders,
        uint[] memory bidAmount
    ) {
        bidCreated = new uint[](numBids);
        bidders = new address[](numBids);
        bidAmount = new uint[](numBids);

        for (uint i = 0; i < numBids; i++) {    
            bidCreated[i] = bids[i].created;
            bidders[i] = bids[i].bidder;
            bidAmount[i] = bids[i].bidAmount;
        }

        return (bidCreated, bidders, bidAmount);
    }

    function markFinalized() public {
        finalized = true;
    }
}