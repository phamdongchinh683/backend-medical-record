const { responseStatus } = require('../global/response');
const WalletValidation = require('../utils/wallet.validation');

const validateWallet = async (req, res, next) => {
    try {
        const { wallet } = req.body;

        if (!wallet) {
            return responseStatus(res, 400, 'failed', 'Wallet address is required');
        }

        if (!WalletValidation.validateWalletFormat(wallet)) {
            return responseStatus(res, 400, 'failed', 'Invalid wallet address format');
        }

        if (!WalletValidation.isValidEthereumAddress(wallet)) {
            return responseStatus(res, 400, 'failed', 'Invalid Ethereum address');
        }

        const normalizedAddress = WalletValidation.normalizeAddress(wallet);
        if (!normalizedAddress) {
            return responseStatus(res, 400, 'failed', 'Invalid wallet address checksum');
        }

        req.body.wallet = normalizedAddress;
        next();
    } catch (error) {
        return responseStatus(res, 500, 'failed', 'Error validating wallet address');
    }
};

module.exports = {
    validateWallet
};