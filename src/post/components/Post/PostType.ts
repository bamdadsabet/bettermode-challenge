import { ITag } from '../../types';

export interface PostProps {
  postData: any;
  thumbnail?: string;
  tags?: ITag[];
  type: string;
  reactionsCount: number;
  reacted: boolean;
  id: string;
  slug?: string;
}
