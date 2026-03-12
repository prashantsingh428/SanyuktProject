const mongoose = require('mongoose');

const incomeHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Direct', 'Level', 'Matching', 'ProfitSharing', 'Generation'],
        required: true
    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    level: {
        type: Number
    },
    description: {
        type: String
    }
}, { timestamps: true });

incomeHistorySchema.index({ userId: 1 });
incomeHistorySchema.index({ type: 1 });
incomeHistorySchema.index({ createdAt: -1 });

module.exports = mongoose.model('IncomeHistory', incomeHistorySchema);
