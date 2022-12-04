import { model, Schema } from 'mongoose';
export = model('guilds', new Schema({
    guildID: { type: Schema.Types.String, require: true, unique: true },
    registeredAt: { type: Schema.Types.Date, default: Date.now() },
    premium: { type: Schema.Types.Boolean, default: false },
    autoPostChannel: { type: Schema.Types.String, default: null },
    autoPostBlacklist: { type: Schema.Types.Array, default: [] },
}));