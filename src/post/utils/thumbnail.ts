export const getImgUrl = (imgId: string) =>
  `https://tribe-s3-production.imgix.net/${imgId}?fit=max&w=2000&auto=compress,format`;

export const getThumbnailsImgSrc = (fields: any) => {
  const thumbnail = fields.find((field: any) => field.key === 'news_cover_image');
  if (!thumbnail || !thumbnail.value) return;
  const imgId = JSON.parse(thumbnail.value)?.id;
  return getImgUrl(imgId);
};
