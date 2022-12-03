"use strict";
const mongoose_1 = require("mongoose");
module.exports = (0, mongoose_1.model)('guilds', new mongoose_1.Schema({
    guildID: { type: mongoose_1.Schema.Types.String, require: true, unique: true },
    registeredAt: { type: mongoose_1.Schema.Types.Date, default: Date.now() },
    premium: { type: mongoose_1.Schema.Types.Boolean, default: false },
    autoPostChannel: { type: mongoose_1.Schema.Types.String, default: null },
}));
