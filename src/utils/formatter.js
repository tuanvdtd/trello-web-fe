export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

export const generatePlaceholderCard = (columnId) => {
  return {
    _id: `${columnId}-placeholder-card`,
    boardId: "",
    columnId,
    title: `Title of ${columnId}-placeholder-card`,
    description: null,
    cover: null,
    memberIds: [],
    comments: [],
    attachments: [],
    isPlaceHolderCard: true,
  };
};
