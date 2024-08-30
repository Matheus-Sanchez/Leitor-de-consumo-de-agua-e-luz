import mongoose, { Document, Schema } from 'mongoose';

interface IMeasure extends Document {
  measure_uuid: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
  has_confirmed: boolean;
  image_url: string;
}

const MeasureSchema: Schema = new Schema({
  measure_uuid: { type: String, required: true, unique: true },
  customer_code: { type: String, required: true },
  measure_datetime: { type: Date, required: true },
  measure_type: { type: String, required: true, enum: ['WATER', 'GAS'] },
  has_confirmed: { type: Boolean, default: false },
  image_url: { type: String, required: true },
});

const MeasureModel = mongoose.model<IMeasure>('Measure', MeasureSchema);

export default MeasureModel;
