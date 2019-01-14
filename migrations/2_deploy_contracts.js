var Bet = artifacts.require("./Bet.sol");

module.exports = function(deployer) {
  deployer.deploy(Bet, {from:"0x5433647c05b6DDFAc3dA97A7841F8434e3C5b50C", value: 50000000000000000000});
};