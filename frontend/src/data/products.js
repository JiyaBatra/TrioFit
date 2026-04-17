// central product data using import.meta URLs for assets
const discountedProductIds = new Set([1, 5, 12, 15, 22, 26]);

const applyDiscount = (products, discountPercent) =>
  products.map((product) => ({
    ...product,
    isDiscounted: true,
    discountedPrice: Number((product.price * (1 - discountPercent / 100)).toFixed(2)),
    discount: `${discountPercent}% OFF`,
  }));

const menDiscountedProductIds = new Set([99, 100, 109, 110, 119, 120]);

const applyMenDiscount = (products) =>
  products.map((product) =>
    menDiscountedProductIds.has(product.id)
      ? {
          ...product,
          isDiscounted: true,
          discountedPrice: Number((product.price * 0.4).toFixed(2)),
          discount: "60% OFF",
        }
      : product
  );

const kidBoysDiscountedProductIds = new Set([31, 32, 41, 42, 46, 47, 56, 57]);

const applyKidBoysDiscount = (products) =>
  products.map((product) =>
    kidBoysDiscountedProductIds.has(product.id)
      ? {
          ...product,
          isDiscounted: true,
          discountedPrice: Number((product.price * 0.7).toFixed(2)),
          discount: "30% OFF",
        }
      : product
  );

const kidGirlsDiscountedProductIds = new Set([66, 67, 77, 78, 84, 85, 92, 93]);

const applyKidGirlsDiscount = (products) =>
  products.map((product) =>
    kidGirlsDiscountedProductIds.has(product.id)
      ? {
          ...product,
          isDiscounted: true,
          discountedPrice: Number((product.price * 0.5).toFixed(2)),
          discount: "50% OFF",
        }
      : product
  );

const topProductsData = [
    {
        id: 1,
        name: "Solid Women Dark Blue Top",
        price: 1199,
        image: new URL("../assets/images/women/women/Topwear/1.0/top1.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/1.0/top1.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/1.1/top1.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/1.2/top1.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 2,
        name: "Women Striped Formal Pink Shirt",
        price: 1299,
        image: new URL("../assets/images/women/women/Topwear/2.0/top2.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/2.0/top2.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/2.1/top2.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/2.2/top2.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 3,
        name: "Solid Casual Black Shirt",
        price: 1399,
        image: new URL("../assets/images/women/women/Topwear/3.0/top3.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/3.0/top3.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/3.1/top3.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/3.2/top3.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 4,
        name: "Pure Cotton Black Tshirt",
        price: 1499,
        image: new URL("../assets/images/women/women/Topwear/4.0/top4.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/4.0/top4.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/4.1/top4.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/4.2/top4.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 5,
        name: "Solid Women Beige Top",
        price: 1599,
        image: new URL("../assets/images/women/women/Topwear/5.0/top5.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/5.0/top5.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/5.1/top5.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/5.2/top5.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 6,
        name: " Solid Women Dark Green Top",
        price: 1699,
        image: new URL("../assets/images/women/women/Topwear/6.0/top6.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/6.0/top6.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/6.1/top6.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/6.2/top6.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 7,
        name: " Sleeveless Solid Women Maroon Top",
        price: 1799,
        image: new URL("../assets/images/women/women/Topwear/7.0/top7.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/7.0/top7.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/7.1/top7.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/7.2/top7.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 8,
        name: " Solid Women Black Top",
        price: 1899,
        image: new URL("../assets/images/women/women/Topwear/8.0/top8.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/8.0/top8.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/8.1/top8.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/8.2/top8.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 9,
        name: " One Shoulder Solid Women White Top",
        price: 1999,
        image: new URL("../assets/images/women/women/Topwear/9.0/top9.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/9.0/top9.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/9.1/top9.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/9.2/photo_2026-01-23_22-23-26.jpg", import.meta.url).href,
        ],
    },
    {
        id: 10,
        name: "Sleeveless Women Dark Blue Top",
        price: 2099,
        image: new URL("../assets/images/women/women/Topwear/10.0/top10.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Topwear/10.0/top10.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/10.1/top10.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Topwear/10.2/top10.2.jpg", import.meta.url).href,
        ],
    },
];

export const topProducts = applyDiscount(topProductsData);

const bottomProductsData = [
    {
        id: 11,
        name: "Straight Fit High-Rise Stretchable Jeans",
        price: 999,
        image: new URL("../assets/images/women/women/bottomwear/1.0/bottom1.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/1.0/bottom1.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/1.1/bottom1.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 12,
        name: "Straight Fit High Rise Black Jeans",
        price: 1099,
        image: new URL("../assets/images/women/women/bottomwear/2.0/bottom2.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/2.0/bottom2.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/2.1/bottom2.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 13,
        name: "Women Flared High Rise Blue Jeans",
        price: 1199,
        image: new URL("../assets/images/women/women/bottomwear/3.0/bottom3.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/3.0/bottom3.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/3.1/bottom3.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 14,
        name: "Women’S Cargo Flap Pocket Jeans",
        price: 1299,
        image: new URL("../assets/images/women/women/bottomwear/4.0/bottom4.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/4.0/bottom4.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/4.1/bottom4.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 15,
        name: "Women Flared Grey Cotton Trousers",
        price: 1399,
        image: new URL("../assets/images/women/women/bottomwear/5.0/bottom5.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/5.0/bottom5.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/5.1/bottom5.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 16,
        name: "Woman Pants Women's Formal",
        price: 1499,
        image: new URL("../assets/images/women/women/bottomwear/6.0/bottom6.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/6.0/bottom6.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/6.1/bottom6.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 17,
        name: "Denim Pencil Midi Skirt",
        price: 1599,
        image: new URL("../assets/images/women/women/bottomwear/7.0/bottom7.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/7.0/bottom7.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/7.1/bottom7.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 18,
        name: " Regular Fit Black Rayon Trousers",
        price: 1699,
        image: new URL("../assets/images/women/women/bottomwear/8.0/bottom8.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/8.0/bottom8.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/8.1/bottom8.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 19,
        name: "Women's Beige Relaxed Viscose Rayon Trousers",
        price: 1799,
        image: new URL("../assets/images/women/women/bottomwear/9.0/bottom9.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/9.0/bottom9.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/9.1/bottom9.1.jpg", import.meta.url).href,
        ],
    },
    {
        id: 20,
        name: "Tailored Mini Skort",
        price: 1899,
        image: new URL("../assets/images/women/women/bottomwear/10.0/bottom10.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/bottomwear/10.0/bottom10.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/bottomwear/10.1/bottom10.1.jpg", import.meta.url).href,
        ],
    },
];

export const bottomProducts = applyDiscount(bottomProductsData);

const ethnicProductsData = [
    {
        id: 21,
        name: "blue floral print corset back kurti",
        price: 1299,
        image: new URL("../assets/images/women/women/Ethnic/1.0/ethnic1.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/1.0/ethnic1.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/1.1/ethnic1.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/1.2/ethnic1.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 22,
        name: "green floral printed cotton empire top",
        price: 1399,
        image: new URL("../assets/images/women/women/Ethnic/2.0/ethnic2.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/2.0/ethnic2.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/2.1/ethnic2.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/2.2/ethnic2.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 23,
        name: "women's ethnic motifs printed panelled kurta",
        price: 1499,
        image: new URL("../assets/images/women/women/Ethnic/3.0/ethnic3.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/3.0/ethnic3.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/3.1/ethnic3.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/3.2/ethnic3.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 24,
        name: "Kurti Pant Dupatta Set",
        price: 1599,
        image: new URL("../assets/images/women/women/Ethnic/4.0/ethnic4.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/4.0/ethnic4.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/4.1/ethnic4.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/4.2/ethnic4.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 25,
        name: "maroon printed Anarkali Kurta Palazzo Set ",
        price: 1699,
        image: new URL("../assets/images/women/women/Ethnic/5.0/ethnic5.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/5.0/ethnic5.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/5.1/ethnic5.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/5.2/ethnic5.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 26,
        name: "green Rayon floral Anarkali long gown",
        price: 1799,
        image: new URL("../assets/images/women/women/Ethnic/6.0/ethnic6.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/6.0/ethnic6.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/6.1/ethnic6.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/6.2/ethnic6.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 27,
        name: "Solid Semi Stitched Lehenga Choli",
        price: 1899,
        image: new URL("../assets/images/women/women/Ethnic/7.0/ethnic7.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/7.0/ethnic7.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/7.1/ethnic7.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/7.2/ethnic7.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 28,
        name: "Embroidered Semi Stitched Lehenga Choli (Purple)",
        price: 1999,
        image: new URL("../assets/images/women/women/Ethnic/8.0/ethnic8.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/8.0/ethnic8.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/8.1/ethnic8.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/8.2/ethnic8.2.jpg", import.meta.url).href,
        ],
    },
    {
        id: 29,
        name: "Royal Blue embroidered silk blend lehenga choli",
        price: 2099,
        image: new URL("../assets/images/women/women/Ethnic/9.0/ethnic9.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/9.0/ethnic9.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/9.1/ethnic9.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/9.3/ethnic9.3.jpg", import.meta.url).href,
        ],
    },
    {
        id: 30,
        name: "grey embellished organza satin silk saree",
        price: 2199,
        image: new URL("../assets/images/women/women/Ethnic/10.0/ethnic10.0.jpg", import.meta.url).href,
        variants: [
            new URL("../assets/images/women/women/Ethnic/10.0/ethnic10.0.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/10.1/ethnic10.1.jpg", import.meta.url).href,
            new URL("../assets/images/women/women/Ethnic/10.2/ethnic10.2.jpg", import.meta.url).href,
        ],
    },
];

export const ethnicProducts = applyDiscount(ethnicProductsData);

const kidEthnicProductsData = [
    {
        id: 31,
        name: "Cutiekins boys'printed kurta ",

        price: 799,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/1/1.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/1/1.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/1/1.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/1/1.3.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/1/1.4.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 32,
        name: "VASTRAMAY Boys' Sherwani Set",
        price: 849,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/2/2.2.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/2/2.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/2/2.3.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 33,
        name: "Baby Boys Festive & Party Kurta",
        price: 899,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/3/3.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/3/3.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/3/3.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/3/3.3.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 34,
        name: "Boys Festive & Party Kurta ",
        price: 949,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/4/4.2.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/4/4.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/4/4.3.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/4/4.4.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 35,
        name: "Boys Casual Kurta and Pyjama Set",
        price: 999,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/5/5.2.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/5/5.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/5/5.3.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/5/5.4.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 36,
        name: "Cream Floral  Kurta with Churidar Pant",
        price: 1049,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/6/6.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/6/6.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/6/6.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/6/6.3.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 37,
        name: "Boys Festive & Party Dhoti & Kurta Set ",
        price: 1099,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/7/7.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/7/7.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/7/7.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/7/7.3.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/7/7.4.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 38,
        name: "Boys Casual Dhoti & Kurta Set",
        price: 1149,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/8/8.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/8/8.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/8/8.2.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 39,
        name: "Boy Suit Kids Floral Assemetric Traditional Outfit",
        price: 1199,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/9/9.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/9/9.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/9/9.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/9/9.3.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/9/9.4.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 40,
        name: "Boys Festive & Party Kurta and Pyjama Set ",
        price: 1249,
        image: new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/10/10.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/10/10.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/10/10.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/10/10.3.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/10/10.4.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/ethnic wear/10/10.5.jpeg", import.meta.url).href,
        ],
    },
];
export const kidEthnicProducts = applyDiscount(kidEthnicProductsData, 30);
const kidJeansProductsData = [
    {
        id: 41,
        name: "Boys Relaxed Fit Woven Cargo Trousers",
        price: 699,
        image: new URL("../assets/images/kid/kid/boys'clothing/jeans/1/1.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/jeans/1/1.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/1/1.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/1/1.3.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 42,
        name: "Loose Fit Mid Rise Blue Jeans",
        price: 749,
        image: new URL("../assets/images/kid/kid/boys'clothing/jeans/2/2.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/jeans/2/2.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/2/2.2.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 43,
        name: "Boys Mid-Rise Light Fade Stretchable Cargo Styles Jeans",
        price: 799,
        image: new URL("../assets/images/kid/kid/boys'clothing/jeans/3/3.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/jeans/3/3.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/3/3.2.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 44,
        name: "kid's cargo jeans",
        price: 849,
        image: new URL("../assets/images/kid/kid/boys'clothing/jeans/4/4.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/jeans/4/4.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/4/4.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/4/4.3.jpeg", import.meta.url).href,
        ],
    },
    {
        id: 45,
        name: "Boys Comfort Mid-Rise Heavy Fade Jeans",
        price: 899,
        image: new URL("../assets/images/kid/kid/boys'clothing/jeans/5/5.1.jpeg", import.meta.url).href,
        variants: [
            new URL("../assets/images/kid/kid/boys'clothing/jeans/5/5.1.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/5/5.2.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/5/5.3.jpeg", import.meta.url).href,
            new URL("../assets/images/kid/kid/boys'clothing/jeans/5/5.4.jpeg", import.meta.url).href,
        ],
    },
];
export const kidJeansProducts = applyDiscount(kidJeansProductsData, 30);
const kidShirtsProductsData = [
{
    id: 46,
    name: "Kids black and white cotton chequered casual shirt",
    price: 599,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/1/1.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/1/1.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/1/1.2.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/1/1.3.jpeg", import.meta.url).href,
    ],
},
{
    id: 47,
    name: "FRELURO Men Printed Casual White Shirt. ",
    price: 649,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/2/2.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/2/2.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/2/2.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 48,
    name: "Boys Regular Fit Printed Casual Shirt. ",
    price: 699,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/3/3.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/3/3.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/3/3.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 49,
    name: "boys' green and white geometric print shirt ",
    price: 699,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/4/4.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/4/4.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/4/4.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 50,
    name: "pink regular fit casual shirt ",
    price: 749,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/5/5.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/5/5.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/5/5.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 51,
    name: "Crimsoune Club Boys Brown Regular Fit Chequered Jacket. ",
    price: 799,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/6/6.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/6/6.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/6/6.2.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/6/6.3.jpeg", import.meta.url).href,
    ],
},
{
    id: 52,
    name: "boys' casual shirt in blue and black ",
    price: 849,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/7/7.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/7/7.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/7/7.2.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/7/7.3.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/7/7.4.jpeg", import.meta.url).href,
    ],
},
{
    id: 53,
    name: " Zans & Mens Boys Long Sleeve shirt",
    price: 849,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/8/8.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/8/8.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/8/8.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 54,
    name: "white cotton blend textured casual shirt",
    price: 899,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/9/9.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/9/9.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/9/9.2.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/9/9.3.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/9/9.4.jpeg", import.meta.url).href,
    ],
},
{
    id: 55,
    name: "solid pink casual over-shirt",
    price: 949,
    image: new URL("../assets/images/kid/kid/boys'clothing/shirts/10/10.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/shirts/10/10.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/10/10.2.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/10/10.3.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/shirts/10/10.4.jpeg", import.meta.url).href,
    ],
},
];
export const kidShirtsProducts = applyKidBoysDiscount(kidShirtsProductsData);

export const kidShirtsProducts = applyDiscount(kidShirtsProductsData, 30);
const kidTShirtsProductsData = [
{
    id: 56,
    name: "Vigilante brand t-shirt is a boys",
    price: 499,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/1/1.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/1/1.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/1/1.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 57,
    name: "beige JACKBOY 705 Boys Graphic Polo T-Shirt ",
    price: 549,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/2/2.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/2/2.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/2/2.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 58,
    name: "patterned cotton polo shirt ",
    price: 599,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/3/3.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/3/3.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/3/3.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 59,
    name: "Googo Gaaga boy's cotton teddy printed t-shirt",
    price: 649,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/4/4.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/4/4.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/4/4.2.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/4/4.3.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/4/4.4.jpeg", import.meta.url).href,
    ],
},
{
    id: 60,
    name: "Little Ninja boys' cotton graphic t-shirt",
    price: 599,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/5/5.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/5/5.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/5/5.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 61,
    name: "printed polo T-shirt",
    price: 649,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/6/6.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/6/6.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/6/6.2.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/6/6.3.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/6/6.4.jpeg", import.meta.url).href,
    ],
},
{
    id: 62,
    name: "floral print polo t-shirt ",
    price: 699,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/7/7.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/7/7.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/7/7.2.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/7/7.3.jpeg", import.meta.url).href,
    ],
},
{
    id: 63,
    name: " yellow and grey color-blocked polo T-shirt",
    price: 649,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/8/8.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/8/8.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/8/8.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 64,
    name: "black printed polo t-shirt ",
    price: 699,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/9/9.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/9/9.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/9/9.2.jpeg", import.meta.url).href,
    ],
},
{
    id: 65,
    name: "cotton cartoon tiger print t-shirt ",
    price: 749,
    image: new URL("../assets/images/kid/kid/boys'clothing/tshirts/10/10.1.jpeg", import.meta.url).href,
    variants: [
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/10/10.1.jpeg", import.meta.url).href,
        new URL("../assets/images/kid/kid/boys'clothing/tshirts/10/10.2.jpeg", import.meta.url).href,
    ],
},
];
export const kidTShirtsProducts = applyDiscount(kidTShirtsProductsData, 30);
const kidGirlsBottomProductsData = [
  {
    id: 66,
    name: "light blue denim bell-bottom jeans ",
    price: 499,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/1/1.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/1/1.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/1/1.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/1/1.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 67,
    name: "Button high-waisted black skinny jeans. ",
    price: 549,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/2/2.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/2/2.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/2/2.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 68,
    name: "Guti flared girls purple jeans",
    price: 599,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/3/3.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/3/3.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/3/3.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 69,
    name: " flared blue jeans",
    price: 599,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/4/4.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/4/4.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/4/4.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 70,
    name: "pink denim washed joggers for girls ",
    price: 649,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/5/5.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/5/5.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/5/5.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 71,
    name: "blue denim wide-leg jeans",
    price: 699,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/6/6.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/6/6.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/6/6.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/6/6.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 72,
    name: "Solid girls Flared Purple Skirt",
    price: 749,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/7/7.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/7/7.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/7/7.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/7/7.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 73,
    name: "blue denim mini skirt ",
    price: 749,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/8/8.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/8/8.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/8/8.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 74,
    name: "Cutecumber Girls Denim Shorts ",
    price: 799,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/9/9.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/9/9.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/9/9.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/9/9.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 75,
    name: " RUDRAEDGE baby girls casual T-shirt ",
    price: 849,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/10/10.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/10/10.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/10/10.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/10/10.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 76,
    name: " baby girl's unicorn-themed top",
    price: 899,
    image: new URL("../assets/images/kid/kid/girls clothing/bottom wear/11/11.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/11/11.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/bottom wear/11/11.2.jpeg", import.meta.url).href,
    ],
  },
];
export const kidGirlsBottomProducts = applyDiscount(kidGirlsBottomProductsData, 50);
const kidGirlsDressProductsData = [
  {
    id: 77,
    name: "Cutiepie Elegant Girls Frocks Dresses",
    price: 699,
    image: new URL("../assets/images/kid/kid/girls clothing/dresses/1/1.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/dresses/1/1.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/1/1.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/1/1.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 78,
    name: "Pink mesh fairy princess costume set,",
    price: 749,
    image: new URL("../assets/images/kid/kid/girls clothing/dresses/2/2.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/dresses/2/2.1.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 79,
    name: " light blue girls' party dress",
    price: 799,
    image: new URL("../assets/images/kid/kid/girls clothing/dresses/3/3.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/dresses/3/3.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/3/3.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 80,
    name: "sage green ribbed knit dress",
    price: 799,
    image: new URL("../assets/images/kid/kid/girls clothing/dresses/4/4.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/dresses/4/4.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/4/4.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 81,
    name: "Girls Cotton Blend Top & Bottom Set ",
    price: 849,
    image: new URL("../assets/images/kid/kid/girls clothing/dresses/5/5.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/dresses/5/5.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/5/5.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/5/5.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 82,
    name: "baby girl's party dress set ",
    price: 899,
    image: new URL("../assets/images/kid/kid/girls clothing/dresses/6/6.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/dresses/6/6.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/6/6.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/6/6.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 83,
    name: "girls' lavender georgette frock ",
    price: 949,
    image: new URL("../assets/images/kid/kid/girls clothing/dresses/7/7.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/dresses/7/7.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/7/7.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/dresses/7/7.3.jpeg", import.meta.url).href,
    ],
  },
];
export const kidGirlsDressProducts = applyDiscount(kidGirlsDressProductsData, 50);
const kidGirlsEthnicProductsData = [
  {
    id: 84,
    name: "festive and party kurta and skirt set",
    price: 799,
    image: new URL("../assets/images/kid/kid/girls clothing/ethnic wear/1/1.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/1/1.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/1/1.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 85,
    name: " embroidered crop top and matching palazzo pants",
    price: 849,
    image: new URL("../assets/images/kid/kid/girls clothing/ethnic wear/2/2.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/2/2.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/2/2.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 86,
    name: "bandhani printed with dhoti pants set",
    price: 899,
    image: new URL("../assets/images/kid/kid/girls clothing/ethnic wear/3/3.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/3/3.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/3/3.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 87,
    name: "Anarkali suit set",
    price: 949,
    image: new URL("../assets/images/kid/kid/girls clothing/ethnic wear/4/4.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/4/4.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/4/4.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 88,
    name: "Ethnic Kurta and Palazzo Set",
    price: 999,
    image: new URL("../assets/images/kid/kid/girls clothing/ethnic wear/5/5.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/5/5.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/5/5.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/5/5.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 89,
    name: "Anarkali-style kurta",
    price: 1049,
    image: new URL("../assets/images/kid/kid/girls clothing/ethnic wear/6/6.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/6/6.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/6/6.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/6/6.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 90,
    name: "floral embroidered kurta with a matching sharara set",
    price: 1099,
    image: new URL("../assets/images/kid/kid/girls clothing/ethnic wear/7/7.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/7/7.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/7/7.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 91,
    name: "Bandhani printed kurti and sharara set",
    price: 1149,
    image: new URL("../assets/images/kid/kid/girls clothing/ethnic wear/8/8.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/8/8.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/ethnic wear/8/8.2.jpeg", import.meta.url).href,
    ],
  },
];
export const kidGirlsEthnicProducts = applyDiscount(kidGirlsEthnicProductsData, 50);
const kidGirlsTopProductsData = [
  {
    id: 92,
    name: "short-sleeve crop top",
    price: 499,
    image: new URL("../assets/images/kid/kid/girls clothing/tshirt and top/1/1.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/1/1.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/1/1.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 93,
    name: "long-sleeve crop top",
    price: 549,
    image: new URL("../assets/images/kid/kid/girls clothing/tshirt and top/2/2.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/2/2.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/2/2.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 94,
    name: "black long-sleeved crop top",
    price: 599,
    image: new URL("../assets/images/kid/kid/girls clothing/tshirt and top/3/3.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/3/3.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/3/3.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 95,
    name: "black graphic t-shirt ",
    price: 649,
    image: new URL("../assets/images/kid/kid/girls clothing/tshirt and top/4/4.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/4/4.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/4/4.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 96,
    name: "Girls Top 5floral printed sleeveless top",
    price: 699,
    image: new URL("../assets/images/kid/kid/girls clothing/tshirt and top/5/5.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/5/5.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/5/5.2.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/5/5.3.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 97,
    name: "red and black crop top",
    price: 749,
    image: new URL("../assets/images/kid/kid/girls clothing/tshirt and top/6/6.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/6/6.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/6/6.2.jpeg", import.meta.url).href,
    ],
  },
  {
    id: 98,
    name: " Party Cotton Blend Crop Top",
    price: 799,
    image: new URL("../assets/images/kid/kid/girls clothing/tshirt and top/7/7.1.jpeg", import.meta.url).href,
    variants: [
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/7/7.1.jpeg", import.meta.url).href,
      new URL("../assets/images/kid/kid/girls clothing/tshirt and top/7/7.2.jpeg", import.meta.url).href,
    ],
  },
];
export const kidGirlsTopProducts = applyDiscount(kidGirlsTopProductsData, 50);
const menBottomProductsData = [
  {
    id: 99,
    name: " Loose Fit Men Silver Trousers",
    price: 999,
    image: new URL("../assets/images/man/man/bottomwear/bottom 1/1.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 1/1.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 1/1.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 1/1.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 100,
    name: "Men's grey cargo joggers ",
    price: 1049,
    image: new URL("../assets/images/man/man/bottomwear/bottom 2/2.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 2/2.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 2/2.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 2/2.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 101,
    name: "Men's casual black cargo pants ",
    price: 1099,
    image: new URL("../assets/images/man/man/bottomwear/bottom 3/3.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 3/3.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 3/3.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 3/3.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 102,
    name: "Men's beige  casual pants",
    price: 1149,
    image: new URL("../assets/images/man/man/bottomwear/bottom 4/4.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 4/4.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 4/4.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 4/4.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 103,
    name: "Men Track Pants",
    price: 1199,
    image: new URL("../assets/images/man/man/bottomwear/bottom 5/5.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 5/5.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 5/5.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 5/5.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 104,
    name: "Men's Lycra Blend Korean Trousers",
    price: 1249,
    image: new URL("../assets/images/man/man/bottomwear/bottom 6/6.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 6/6.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 6/6.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 6/6.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 105,
    name: "Beige textured  trousers",
    price: 1299,
    image: new URL("../assets/images/man/man/bottomwear/bottom 7/7.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 7/7.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 7/7.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 7/7.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 106,
    name: " Men's Dark Grey Loose Baggy Fit Washed Jeans",
    price: 1349,
    image: new URL("../assets/images/man/man/bottomwear/bottom 8/8.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 8/8.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 8/8.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 8/8.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 107,
    name: "Light Wash Straight Leg Jeans",
    price: 1399,
    image: new URL("../assets/images/man/man/bottomwear/bottom 9/9.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 9/9.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 9/9.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 9/9.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 108,
    name: "white loose fit baggy jeans",
    price: 1449,
    image: new URL("../assets/images/man/man/bottomwear/bottom 10/10.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/bottomwear/bottom 10/10.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 10/10.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/bottomwear/bottom 10/10.3.jpg", import.meta.url).href,
    ],
  },
];
export const menBottomProducts = applyDiscount(menBottomProductsData, 60);
const menEthnicProductsData = [
  {
    id: 109,
    name: "Men's white printed cotton blend kurta ",
    price: 1499,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 1/1.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 1/1.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 1/1.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 1/1.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 110,
    name: "white cotton blend kurta pyjama set",
    price: 1549,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 2/2.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 2/2.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 2/2.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 2/2.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 111,
    name: "peach-colored jacquard silk kurta ",
    price: 1599,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 3/3.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 3/3.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 3/3.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 3/3.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 112,
    name: "Men's white solid cotton dhoti",
    price: 1649,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 4/4.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 4/4.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 4/4.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 4/4.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 113,
    name: "Unique Fort Men kurta pajama set ",
    price: 1699,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 5/5.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 5/5.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 5/5.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 5/5.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 114,
    name: "white kurta dhoti set for men ",
    price: 1749,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 6/6.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 6/6.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 6/6.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 6/6.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 115,
    name: "Men Floral Print Viscose Rayon Straight Kurta",
    price: 1799,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 7/7.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 7/7.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 7/7.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 7/7.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 116,
    name: "men's sequined embroidered traditional kurta",
    price: 1849,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 8/8.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 8/8.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 8/8.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 8/8.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 117,
    name: "black cotton kurta and white salwar set for men",
    price: 1899,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 9/9.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 9/9.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 9/9.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 9/9.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 118,
    name: "Sage Green Embroidered Straight Kurta for Men",
    price: 1949,
    image: new URL("../assets/images/man/man/Ethnic wear/Ethnic 10/10.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 10/10.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 10/10.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Ethnic wear/Ethnic 10/10.3.jpg", import.meta.url).href,
    ],
  },
];
export const menEthnicProducts = applyDiscount(menEthnicProductsData, 60);
const menTopProductsData = [
  {
    id: 119,
    name: "Slim Fit Polo Shirt",
    price: 899,
    image: new URL("../assets/images/man/man/Topwear/Top 1/1.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 1/1.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 1/1.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 1/1.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 120,
    name: "Spykar Sage Green Blended Slim Fit Polo T-shirt",
    price: 949,
    image: new URL("../assets/images/man/man/Topwear/Top 2/2.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 2/2.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 2/2.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 2/2.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 121,
    name: "Purple textured casual shirt",
    price: 999,
    image: new URL("../assets/images/man/man/Topwear/Top 3/3.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 3/3.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 3/3.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 3/3.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 122,
    name: "Men's light blue striped casual shirt",
    price: 1049,
    image: new URL("../assets/images/man/man/Topwear/Top 4/4.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 4/4.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 4/4.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 4/4.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 123,
    name: "Men's solid peach regular fit shirt",
    price: 1099,
    image: new URL("../assets/images/man/man/Topwear/Top 5/5.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 5/5.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 5/5.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 5/5.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 124,
    name: " Men's Casual Striped Shirt in Grey",
    price: 1149,
    image: new URL("../assets/images/man/man/Topwear/Top 6/6.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 6/6.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 6/6.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 6/6.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 125,
    name: "Men's  Round Neck Dark Green T-Shirt",
    price: 1199,
    image: new URL("../assets/images/man/man/Topwear/Top 7/7.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 7/7.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 7/7.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 7/7.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 126,
    name: "Men's Round Neck Brown T-Shirt",
    price: 1249,
    image: new URL("../assets/images/man/man/Topwear/Top 8/8.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 8/8.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 8/8.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 8/8.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 127,
    name: "Black Crew Neck T-Shirt from ",
    price: 1299,
    image: new URL("../assets/images/man/man/Topwear/Top 9/9.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 9/9.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 9/9.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 9/9.3.jpg", import.meta.url).href,
    ],
  },
  {
    id: 128,
    name: "Men's Polo Neck T-Shirt in Black",
    price: 1349,
    image: new URL("../assets/images/man/man/Topwear/Top 10/10.1.jpg", import.meta.url).href,
    variants: [
      new URL("../assets/images/man/man/Topwear/Top 10/10.1.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 10/10.2.jpg", import.meta.url).href,
      new URL("../assets/images/man/man/Topwear/Top 10/10.3.jpg", import.meta.url).href,
    ],
  },
];
export const menTopProducts = applyDiscount(menTopProductsData, 60);

