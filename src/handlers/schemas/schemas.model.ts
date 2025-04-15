import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        schema: [{
            validation: {
                max: {type: Number, default: null},
                min: {type: Number, default: null},
                required: {type: Boolean, required: true},
                reference: {
                    collection_id: {type: String},
                    type: {type: String, enum: ['single', 'multiple']}
                },
                fileType: {type: [String], default: []},
                maxFileSize: {type: Number, default: null},
            },
            field: {
                label: {type: String, required: true},
                info: {type: String, default: null},
                type: {type: String, required: true},
                key: {type: String, required: true},
                isStatic: {type: Boolean},
                autoGenerated: {type: Boolean},
                placeholder: {type: String, default: null},
                disabled: {type: Boolean, default: false},
                deriveValueFrom: {type: String, default: null}
            },
        }],
        collection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collections"
        },
    },
    {
        timestamps: true,
    }
);

export const CollectionSchemaModel = mongoose.models.CollectionSchemas || mongoose.model("CollectionSchemas", collectionSchema);