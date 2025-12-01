import mongoose from 'mongoose';

const ContentItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    promptUsed: {
      type: String,
      required: [true, 'A prompt is required for the content item'],
      trim: true
    },
    generatedText: {
      type: String,
      required: [true, 'Generated text is required']
    },
    category: {
      type: String,
      enum: ['Tweet', 'Email', 'Blog', 'Headline', 'Code', 'Other'],
      default: 'Other'
    }
  },
  { timestamps: true }
);

ContentItemSchema.index({ userId: 1, createdAt: -1 });

const ContentItem = mongoose.models.ContentItem || mongoose.model('ContentItem', ContentItemSchema);
export default ContentItem;
