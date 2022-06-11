pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";


contract DonationSol is Ownable {

    mapping(address => uint) public usersDonated;

    function DonateMoneyToContract(uint priceInWei) public payable{
        require(msg.value == priceInWei);
        usersDonated[msg.sender] += msg.value;
    }

    function getTotalDonations() view public returns(uint) {
        return address(this).balance;
    }

    function DonateToCharity(address payable to,uint balance) public payable{
        require(usersDonated[msg.sender] > balance, "Error! No Balance to donate u have to donate more"); 
        to.transfer(balance);
    }

}