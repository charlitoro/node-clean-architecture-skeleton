import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PostsSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: String,
  createdAt: {
    type: 'Date',
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

PostsSchema.index({ userId: 1, title: 1 });
PostsSchema.index({ userId: 1, description: 1 });
PostsSchema.index({ userId: 1, createdAt: 1 });
PostsSchema.index({ userId: 1, isPublished: 1 });

const PostModel = mongoose.model('Post', PostsSchema);

export default PostModel;
