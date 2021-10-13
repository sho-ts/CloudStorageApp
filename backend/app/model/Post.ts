import Model from '@/src/Model';

class Post extends Model {
  static table = 'posts';
  public id?: number;
  public content?: string;
  public uid?: number;

  constructor(params: {
    [key: string]: any
  }) {
    super();
    if (params) {
      this.id = params.id;
      this.content = params.content;
      this.uid = params.uid;
    }
  }
}

export default Post;