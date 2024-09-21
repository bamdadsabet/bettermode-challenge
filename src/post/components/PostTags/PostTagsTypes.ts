import { ITag } from '../../types';

export default interface PostTagsProps {
  type: string;
  tags?: ITag[];
  className?: string;
}
