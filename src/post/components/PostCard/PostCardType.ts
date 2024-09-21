export default interface PostCardProps {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  createdBy: string;
  reactionsCount: number;
  reacted: boolean;
  type: string;
  img?: string | null;
  slug?: string;
  tags?: { title: string }[] | [];
}
