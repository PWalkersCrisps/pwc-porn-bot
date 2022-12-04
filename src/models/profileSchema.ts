import { model, Schema } from 'mongoose';
export = model('profiles', new Schema({
    userID: { type: Schema.Types.String, require: true, unique: true },
    registeredAt: { type: Schema.Types.Date, default: Date.now() },
    interactionsCreated: { type: Schema.Types.Number, default: 0 },
}));