const requestModel = require("../models/request.model");

class RequestService {
  constructor() {
    this.requestModel = requestModel;
  }

  async getRequestExist(doctorId, patientId) {
    return this.requestModel.findOne({ doctorId, patientId }).lean().exec();
  }

  async createRequest(doctorId, patientId) {
    const newRequest = new this.requestModel({ doctorId, patientId });
    return newRequest.save();
  }

  async updateRequest(requestId, status) {
    return this.requestModel.findByIdAndUpdate(requestId, { status });
  }
}

module.exports = new RequestService();
