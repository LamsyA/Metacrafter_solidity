// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;


contract Token{

    string public tokenName = 'MetaToken';
    string public tokenAbbrev = 'MTK';
    uint public totalSupply ;

    mapping(address => uint) public balance;

    function mint() public {
        // require(_amount > 0 , "amount cannot be less than zero ");
        totalSupply += 100;
        balance[msg.sender] += 100;
    }
    function burn() public {
        
        totalSupply -= 100;
        balance[msg.sender] -= 100;
    }

    function getBalance() public view returns (uint256){
        return balance[msg.sender];
    }

    function transfer( address _recipient, uint _amount) public{
        require(msg.sender != _recipient,"you can not transfer to yourself ");
        assert(balance[msg.sender] >= _amount );
        balance[msg.sender] -= _amount;
        balance[_recipient] += _amount;
        //  assert(balance[msg.sender] + balance[_recipient] == balance[msg.sender] + _amount);

    }


}