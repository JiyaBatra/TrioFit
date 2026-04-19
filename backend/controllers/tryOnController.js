import axios from 'axios';
import FormData from 'form-data';

const processTryOn = async (userImageBuffer, userImageMimeType, productName) => {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    throw new Error('Missing OPENAI_API_KEY in backend environment');
  }

  const prompt = `A realistic photograph of the person in this image wearing the selected clothing item: ${productName}. The output should show the garment naturally applied to the user's body in a polished, photo-real style.`;

  const formData = new FormData();
  formData.append('model', 'gpt-image-1');
  formData.append('image[]', userImageBuffer, {
    filename: 'user-photo.png',
    contentType: userImageMimeType || 'image/png',
  });
  formData.append('prompt', prompt);
  formData.append('size', '1024x1024');
  formData.append('n', '1');

  const response = await axios.post('https://api.openai.com/v1/images/edits', formData, {
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      ...formData.getHeaders(),
    },
  });

  const imageData = response?.data?.data?.[0]?.b64_json;
  if (!imageData) {
    throw new Error('AI service did not return an image');
  }

  return {
    success: true,
    resultImage: `data:image/png;base64,${imageData}`,
    message: 'Try-on result generated successfully',
  };
};

const tryOnController = {
  async processTryOn(req, res) {
    try {
      const { productImage, productName } = req.body;
      const userImage = req.file;

      if (!userImage) {
        return res.status(400).json({ error: 'User image is required' });
      }

      if (!productImage) {
        return res.status(400).json({ error: 'Product image is required' });
      }

      // Process the try-on
      const result = await processTryOn(
        userImage.buffer,
        userImage.mimetype,
        productName
      );

      res.json({
        success: true,
        resultImage: result.resultImage,
        message: result.message,
      });

    } catch (error) {
      console.error('Try-on processing error:', error);
      res.status(500).json({
        error: 'Failed to process try-on',
        message: error.message
      });
    }
  }
};

export default tryOnController;