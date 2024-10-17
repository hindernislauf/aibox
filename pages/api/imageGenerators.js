import imageGenerators from '../../data/categories/imageGenerators';

export default function handler(req, res) {
  const { page = 1, limit = 12 } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const totalServices = imageGenerators.length;
  const totalPages = Math.ceil(totalServices / limitNumber);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;
  const paginatedServices = imageGenerators.slice(startIndex, endIndex);

  res.status(200).json({
    services: paginatedServices,
    currentPage: pageNumber,
    totalPages: totalPages,
    totalServices: totalServices
  });
}
