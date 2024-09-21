export const enum ActionEnum {
  FAILED = 'failed',
  SUCCEEDED = 'succeeded',
}

export interface LikeButtonProps {
  likeCountNumber: number;
  className?: string;
  id: string;
  reacted: boolean;
  setError: (errorMessageValue: string) => void;
}
