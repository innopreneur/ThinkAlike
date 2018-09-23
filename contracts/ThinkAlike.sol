pragma solidity ^0.4.24;

/** Contract for the dapp based on wisdom of crowd and game theory */
contract ThinkAlike {
    address public owner;
    enum Status {CLOSED, OPEN}
    mapping (uint => uint) stackToValue;
    struct Game {
        uint id;
        uint32 votes;
        Status status;
    }
   
    /** stacker should stake only once */
    modifier onlyOnce(address stacker){
        //require(addressToStack[stacker] != 0, "Stack should be placed only once.");
        _;
    }

    /** stacker should stack with greater than 0 value */
    modifier notNullAmount(uint amount){
        require(amount > 0, "Stacked amount should be greater than 0.");
        _;
    }

    modifier onlyOwner(address caller){
        require(caller == owner, "Only owner can call perform this operation.");
        _;
    }

    constructor() public{
        owner = msg.sender;
    }

    function putStack(string combo, uint amount) public onlyOnce(msg.sender) notNullAmount(amount) payable{
        stackToValue[uint(keccak256(combo))] = amount;
    }

    function transferWinnings(address winner, uint amount) public onlyOwner(msg.sender) payable{

    }
    function startGame(address initiator, uint amount, string gameId, string options) public notNullAmount(amount) payable{
        //validate that msg.value has value
    }
    function checkIfWon(address caller, uint gameId) public {

    }
}