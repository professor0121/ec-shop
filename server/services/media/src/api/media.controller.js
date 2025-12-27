import { saveMedia, deleteMedia } from "../services/media.service.js";

export const uploadMedia = async (req, res) => {
  const media = await saveMedia(req.file, {
    type: req.body.type,
    userId: req.user?.id
  });

  res.status(201).json(media);
};

export const removeMedia = async (req, res) => {
  await deleteMedia(req.params.id);
  res.json({ success: true });
};
