pragma solidity >=0.4.21 <0.6.0;

contract Bet {

    struct Range {
        uint start;
        uint end;
        uint bid;
        uint blockNumber;
    }

    uint public ETHPool;
    address public Maker;

    enum State {Open, Close}
    enum BetState {Betted, Clear}

    State public state;

    mapping (address => BetState) betState;
    mapping(address => Range) bids;

    event Betted(address bettedAdress, uint value, uint blockNumber);

    modifier onlyMaker() {
        require(msg.sender == Maker, "Only Maker can do this!");
        _;
    }

    modifier onlyOpen() {
        require(state == State.Open, "Bet not open");
        _;
    }

    modifier onlyBetState(BetState inState) {
        require(betState[msg.sender] == inState, "cannot do this");
        _;
    }

    constructor() public payable {
        Maker = msg.sender;
        ETHPool = msg.value;
        state = State.Open;
    }

    function betting(uint start, uint end) public payable onlyOpen {
        require(start <= end, "start mush less than end");
        require((1 <= start && end <= 255), "start and end must between 0 and 255");
        
        bids[msg.sender].bid = msg.value * (1000000000000000000 + (1000000000000000000 - ((end - start) * 1000000000 / 254) ** 2));
        bids[msg.sender].start = start;
        bids[msg.sender].end = end;
        bids[msg.sender].blockNumber = block.number;
        betState[msg.sender] = BetState.Betted;

        emit Betted(msg.sender, bids[msg.sender].bid / 1000000000000000000, block.number);
    }

    function clear() public onlyBetState(BetState.Betted) payable{
        if ((uint(blockhash(bids[msg.sender].blockNumber)) >> 248) <= bids[msg.sender].end && 
            (uint(blockhash(bids[msg.sender].blockNumber)) >> 248) >= bids[msg.sender].start) {
            msg.sender.transfer(bids[msg.sender].bid / 1000000000000000000);
        }
        ETHPool = address(this).balance;
        betState[msg.sender] = BetState.Clear;
    }

    function getETHPool() public view returns(uint) {
        return ETHPool;
    }

    function closeBet() public onlyMaker onlyOpen {
        state = State.Close;
    }

    function getUnclearBet() public view returns(uint){
        if (betState[msg.sender] == BetState.Betted)
            return bids[msg.sender].blockNumber;
        else 
            return block.number + 1;
    }

    function getHashSize() public view returns(uint) {
        return uint(blockhash(bids[msg.sender].blockNumber)) >> (248);
    }
}