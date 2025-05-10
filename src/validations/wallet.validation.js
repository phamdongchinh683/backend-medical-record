const ethers = require('ethers');

class WalletValidation {
    static isValidEthereumAddress(address) {
        try {
            return ethers.isAddress(address);
        } catch (error) {
            return false;
        }
    }

    static normalizeAddress(address) {
        try {
            return ethers.getAddress(address);
        } catch (error) {
            return null;
        }
    }

    static validateWalletFormat(address) {
        if (!address.startsWith('0x')) {
            return false;
        }

        if (address.length !== 42) {
            return false;
        }

        const hexRegex = /^0x[a-fA-F0-9]{40}$/;
        return hexRegex.test(address);
    }
}

module.exports = WalletValidation;