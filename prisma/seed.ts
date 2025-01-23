import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const anniversaryCategory = await prisma.category.upsert({
    where: { name: 'Anniversary' },
    update: {},
    create: {
      name: 'Anniversary',
    },
  });

  const autumnCategory = await prisma.category.upsert({
    where: { name: 'Autumn' },
    update: {},
    create: {
      name: 'Autumn',
    },
  });

  const birthdayCategory = await prisma.category.upsert({
    where: { name: 'Birthday' },
    update: {},
    create: {
      name: 'Birthday',
    },
  });

  const graduationCategory = await prisma.category.upsert({
    where: { name: 'Graduation' },
    update: {},
    create: {
      name: 'Graduation',
    },
  });

  const springCategory = await prisma.category.upsert({
    where: { name: 'Spring' },
    update: {},
    create: {
      name: 'Spring',
    },
  });

  const summerCategory = await prisma.category.upsert({
    where: { name: 'Summer' },
    update: {},
    create: {
      name: 'Summer',
    },
  });

  const valentinesDayCategory = await prisma.category.upsert({
    where: { name: `Valentine's Day` },
    update: {},
    create: {
      name: `Valentine's Day`,
    },
  });

  const weddingCategory = await prisma.category.upsert({
    where: { name: 'Wedding' },
    update: {},
    create: {
      name: 'Wedding',
    },
  });

  const winterCategory = await prisma.category.upsert({
    where: { name: 'Winter' },
    update: {},
    create: {
      name: 'Winter',
    },
  });

  const daffodil = await prisma.flower.upsert({
    where: { name: 'Daffodil' },
    update: {},
    create: {
      name: 'Daffodil',
    },
  });
  
  const daisy = await prisma.flower.upsert({
    where: { name: 'Daisy' },
    update: {},
    create: {
      name: 'Daisy',
    },
  });
  
  const gerbera = await prisma.flower.upsert({
    where: { name: 'Gerbera' },
    update: {},
    create: {
      name: 'Gerbera',
    },
  });
  
  const hibiscus = await prisma.flower.upsert({
    where: { name: 'Hibiscus' },
    update: {},
    create: {
      name: 'Hibiscus',
    },
  });
  
  const hydrangea = await prisma.flower.upsert({
    where: { name: 'Hydrangea' },
    update: {},
    create: {
      name: 'Hydrangea',
    },
  });
  
  const jasmine = await prisma.flower.upsert({
    where: { name: 'Jasmine' },
    update: {},
    create: {
      name: 'Jasmine',
    },
  });
  
  const lavender = await prisma.flower.upsert({
    where: { name: 'Lavender' },
    update: {},
    create: {
      name: 'Lavender',
    },
  });
  
  const lily = await prisma.flower.upsert({
    where: { name: 'Lily' },
    update: {},
    create: {
      name: 'Lily',
    },
  });
  
  const magnolia = await prisma.flower.upsert({
    where: { name: 'Magnolia' },
    update: {},
    create: {
      name: 'Magnolia',
    },
  });
  
  const orchid = await prisma.flower.upsert({
    where: { name: 'Orchid' },
    update: {},
    create: {
      name: 'Orchid',
    },
  });
  
  const peony = await prisma.flower.upsert({
    where: { name: 'Peony' },
    update: {},
    create: {
      name: 'Peony',
    },
  });
  
  const rose = await prisma.flower.upsert({
    where: { name: 'Rose' },
    update: {},
    create: {
      name: 'Rose',
    },
  });
  
  const sunflower = await prisma.flower.upsert({
    where: { name: 'Sunflower' },
    update: {},
    create: {
      name: 'Sunflower',
    },
  });
  
  const tulip = await prisma.flower.upsert({
    where: { name: 'Tulip' },
    update: {},
    create: {
      name: 'Tulip',
    },
  });
  
  const violet = await prisma.flower.upsert({
    where: { name: 'Violet' },
    update: {},
    create: {
      name: 'Violet',
    },
  });

  await prisma.product.upsert({
    where: { name: 'Bouquet A' },
    update: {},
    create: {
      name: 'Bouquet A',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 99.99,
      stock: 10,
      categoryId: weddingCategory.id,
      flowers: {
        connect: [{ id: jasmine.id }, { id: rose.id }, { id: lily.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet B' },
    update: {},
    create: {
      name: 'Bouquet B',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 79.99,
      stock: 15,
      categoryId: birthdayCategory.id,
      flowers: {
        connect: [{ id: rose.id }, { id: lily.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet C' },
    update: {},
    create: {
      name: 'Bouquet C',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 89.99,
      stock: 8,
      categoryId: anniversaryCategory.id,
      flowers: {
        connect: [{ id: orchid.id }, { id: sunflower.id }, { id: peony.id }, { id: rose.id }, { id: jasmine.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet D' },
    update: {},
    create: {
      name: 'Bouquet D',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 110.99,
      stock: 12,
      categoryId: springCategory.id,
      flowers: {
        connect: [{ id: tulip.id }, { id: magnolia.id }, { id: daisy.id }, { id: rose.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet E' },
    update: {},
    create: {
      name: 'Bouquet E',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 125.99,
      stock: 5,
      categoryId: summerCategory.id,
      flowers: {
        connect: [{ id: hydrangea.id }, { id: peony.id }, { id: violet.id }, { id: jasmine.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet F' },
    update: {},
    create: {
      name: 'Bouquet F',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 95.99,
      stock: 18,
      categoryId: weddingCategory.id,
      flowers: {
        connect: [{ id: gerbera.id }, { id: jasmine.id }, { id: tulip.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet G' },
    update: {},
    create: {
      name: 'Bouquet G',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 112.99,
      stock: 7,
      categoryId: graduationCategory.id,
      flowers: {
        connect: [{ id: daffodil.id }, { id: hibiscus.id }, { id: sunflower.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet H' },
    update: {},
    create: {
      name: 'Bouquet H',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 98.99,
      stock: 10,
      categoryId: autumnCategory.id,
      flowers: {
        connect: [{ id: orchid.id }, { id: peony.id }, { id: violet.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet I' },
    update: {},
    create: {
      name: 'Bouquet I',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 103.99,
      stock: 14,
      categoryId: valentinesDayCategory.id,
      flowers: {
        connect: [{ id: lily.id }, { id: rose.id }, { id: daffodil.id }, { id: jasmine.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet J' },
    update: {},
    create: {
      name: 'Bouquet J',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 109.99,
      stock: 15,
      categoryId: winterCategory.id,
      flowers: {
        connect: [{ id: sunflower.id }, { id: magnolia.id }, { id: hydrangea.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet K' },
    update: {},
    create: {
      name: 'Bouquet K',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 119.99,
      stock: 10,
      categoryId: anniversaryCategory.id,
      flowers: {
        connect: [{ id: jasmine.id }, { id: gerbera.id }, { id: daffodil.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet L' },
    update: {},
    create: {
      name: 'Bouquet L',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 129.99,
      stock: 12,
      categoryId: weddingCategory.id,
      flowers: {
        connect: [{ id: peony.id }, { id: rose.id }, { id: sunflower.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet M' },
    update: {},
    create: {
      name: 'Bouquet M',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 109.99,
      stock: 15,
      categoryId: springCategory.id,
      flowers: {
        connect: [{ id: lavender.id }, { id: lily.id }, { id: magnolia.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet N' },
    update: {},
    create: {
      name: 'Bouquet N',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 79.99,
      stock: 20,
      categoryId: birthdayCategory.id,
      flowers: {
        connect: [{ id: hibiscus.id }, { id: violet.id }, { id: tulip.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet O' },
    update: {},
    create: {
      name: 'Bouquet O',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 98.99,
      stock: 18,
      categoryId: valentinesDayCategory.id,
      flowers: {
        connect: [{ id: peony.id }, { id: daffodil.id }, { id: hydrangea.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet P' },
    update: {},
    create: {
      name: 'Bouquet P',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 89.99,
      stock: 7,
      categoryId: autumnCategory.id,
      flowers: {
        connect: [{ id: orchid.id }, { id: daisy.id }, { id: lavender.id }, { id: daffodil.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet Q' },
    update: {},
    create: {
      name: 'Bouquet Q',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 114.99,
      stock: 10,
      categoryId: summerCategory.id,
      flowers: {
        connect: [{ id: gerbera.id }, { id: tulip.id }, { id: magnolia.id }, { id: daffodil.id }, { id: daisy.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet R' },
    update: {},
    create: {
      name: 'Bouquet R',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 119.99,
      stock: 6,
      categoryId: winterCategory.id,
      flowers: {
        connect: [{ id: jasmine.id }, { id: sunflower.id }, { id: peony.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet S' },
    update: {},
    create: {
      name: 'Bouquet S',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 94.99,
      stock: 15,
      categoryId: graduationCategory.id,
      flowers: {
        connect: [{ id: rose.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet T' },
    update: {},
    create: {
      name: 'Bouquet T',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 108.99,
      stock: 11,
      categoryId: springCategory.id,
      flowers: {
        connect: [{ id: tulip.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet U' },
    update: {},
    create: {
      name: 'Bouquet U',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 125.99,
      stock: 9,
      categoryId: anniversaryCategory.id,
      flowers: {
        connect: [{ id: peony.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet V' },
    update: {},
    create: {
      name: 'Bouquet V',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 119.99,
      stock: 18,
      categoryId: birthdayCategory.id,
      flowers: {
        connect: [{ id: jasmine.id }, { id: violet.id }, { id: magnolia.id }, { id: sunflower.id }, { id: peony.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet W' },
    update: {},
    create: {
      name: 'Bouquet W',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 115.99,
      stock: 16,
      categoryId: weddingCategory.id,
      flowers: {
        connect: [{ id: rose.id }, { id: sunflower.id }, { id: hydrangea.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet X' },
    update: {},
    create: {
      name: 'Bouquet X',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 105.99,
      stock: 14,
      categoryId: summerCategory.id,
      flowers: {
        connect: [{ id: tulip.id }, { id: orchid.id }, { id: daisy.id }, { id: peony.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet Y' },
    update: {},
    create: {
      name: 'Bouquet Y',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 89.99,
      stock: 12,
      categoryId: summerCategory.id,
      flowers: {
        connect: [{ id: hydrangea.id }, { id: rose.id }, { id: peony.id }],
      },
    },
  });
  
  await prisma.product.upsert({
    where: { name: 'Bouquet Z' },
    update: {},
    create: {
      name: 'Bouquet Z',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 99.99,
      stock: 8,
      categoryId: autumnCategory.id,
      flowers: {
        connect: [{ id: lavender.id }],
      },
    },
  });

  console.log('Seeding finished!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
