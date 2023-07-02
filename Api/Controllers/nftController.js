const NFT = require("../Model/nftModel");

exports.getAllNfts = async (req, res, next) => {
  const nfts = await NFT.find();
  res.status(200).json({
    status: "success",
    results: nfts.length,
    data: {
      nfts,
    },
  });
};
