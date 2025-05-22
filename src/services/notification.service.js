const notificationModel = require("../models/notification.model");
class NotificationService {
  constructor() {
    this.notificationModel = notificationModel;
  }

  async createNotification(userId, message) {
    const newNotification = new this.notificationModel({ userId, message });
    return newNotification.save();
  }

  async getNotification(userId) {
    return this.notificationModel
      .find({ userId })
      .populate("userId", "wallet _id fullName")
      .lean()
      .exec();
  }
}

module.exports = new NotificationService();
