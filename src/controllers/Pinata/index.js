const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const { responseStatus } = require("../../global/response");
const {
  _pinataApiKey,
  _pinataSecretApiKey,
  _pinataApiUrl,
} = require("../../global/secretKey");

const pinataApiKey = _pinataApiKey;
const pinataSecretApiKey = _pinataSecretApiKey;

class PinataController {
  async uploadFileToPinata(req, res) {
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(req.file.path));

      const pinataResponse = await axios.post(_pinataApiUrl, form, {
        headers: {
          ...form.getHeaders(),
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });
      responseStatus(res, 200, "success", {
        IpfsHash: pinataResponse.data.IpfsHash,
      });
    } catch (error) {
      responseStatus(res, 500, "failed", {
        message: error.message,
      });
    }
  }
}

module.exports = new PinataController();
