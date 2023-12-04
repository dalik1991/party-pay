import { Schema, model, models } from 'mongoose';

const PartySchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    party: {
        type: String,
        required: [true, 'Party is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
});

const Party = models.Party || model('Party', PartySchema);

export default Party;