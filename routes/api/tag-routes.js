const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      // Includes Products
      include: [{ model: Product, through: ProductTag }],
});
res.status(200).json(tagData);
} catch(err) {
  res.status(500).json(err);
}
});

// GET Request for tags based on their IDs
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST request to create a new tag
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
