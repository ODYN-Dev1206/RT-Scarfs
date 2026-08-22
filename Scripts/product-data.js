const BASE_PRODUCTS = [
  {
    id: "velvet-winter-wrap",
    name: "Crimson Houndstooth Wrap",
    image: "/Scarfs_n_Accessories/flaviu-costin-oqCZdctdaL4-unsplash.jpg",
    alt: "Velvet Winter Wrap scarf",
    description: /*`/From the majestic Himalayas, brought to you by RT Scarfs
      is a 100% cotton scarf to elevate your fashion sense. Made from
      skin-friendly wool material to give a sense of comfort while
      elevating your fashion, bringing out the version you wish to be.`*/
      'A vivid red and ivory houndstooth wrap with a softly fringed edge and bold heritage character.',
    price: 45,
    rating: 5
  },
  {
    id: "bahareh-moradian-scarf",
    name: "Mustard Paisley Drape",
    price: 20,
    image: "/Scarfs_n_Accessories/bahareh-moradian-_jKQbGGLUGI-unsplash.jpg",
    description: "A rich mustard scarf with an intricate paisley-like pattern and an elegant, fluid drape."
  },
  {
    id: "the-hijab-company",
    name: "Ivory Botanical Hijab",
    price: 35,
    image: "/Scarfs_n_Accessories/the-hijab-company-EtlgHvq0s90-unsplash.jpg",
    description: "A light ivory hijab with delicate botanical detail, offering a clean and graceful frame."
  },
  {
    id: "masoud-razeghi",
    name: "Warm Sand Draped Scarf",
    price: 45,
    image: "/Scarfs_n_Accessories/masoud-razeghi-UPKo6hMUfHg-unsplash.jpg",
    description: "A softly draped sand-toned scarf with a generous silhouette for effortless layering."
  },
  {
    id: "sarah-crego",
    name: "Gilded Mosaic Silk Scarf",
    price: 75,
    image: "/Scarfs_n_Accessories/sarah-crego-ZllJjxtu2ho-unsplash.jpg",
    description: "A striking gold and black scarf with an ornate mosaic print and polished statement finish."
  },
  {
    id: "altansukh-e",
    name: "Sky Blue Fringe Wrap",
    price: 55,
    image: "/Scarfs_n_Accessories/altansukh-e-ymCgvsne3Y8-unsplash.jpg",
    description: "A cool sky-blue wrap with long fringe and a soft appearance made for airy winter layering."
  },
  {
    id: "karen-cantu",
    name: "Heather Grey Winter Wrap",
    price: 50,
    image: "/Scarfs_n_Accessories/karen-cantu-q-uYF7pziBO8Y-unsplash.jpg",
    description: "A plush heather-grey wrap with a generous, softly textured shape for cold-weather comfort."
  },
  {
    id: "mhrezaa-v",
    name: "Midnight Geometric Keffiyeh",
    price: 105,
    image: "/Scarfs_n_Accessories/mhrezaa-v-NdrZB1rMg-unsplash.jpg",
    description: "A dark geometric scarf with an ivory woven pattern and structured border for a timeless finish."
  },
  {
    id: "khaled-ghareeb",
    name: "Cocoa Satin Scarf",
    price: 25,
    image: "/Scarfs_n_Accessories/khaled-ghareeb-n84s3jgzhKk-unsplash.jpg",
    description: "A warm cocoa-brown scarf with a smooth satin-like appearance and understated elegance."
  },
  {
    id: "ash-edmonds",
    name: "Oatmeal Soft-Touch Wrap",
    price: 70,
    image: "/Scarfs_n_Accessories/ash-edmonds-vxxeDvOWbvQ-unsplash.jpg",
    description: "A neutral oatmeal wrap with a soft, brushed appearance and easy everyday coverage."
  },
  {
    id: "shemagh-style-scarf",
    name: "Shemagh Style Scarf",
    image: "/Blog_Scarfs/pexels-dauphotographer-36455711.jpg",
    alt: "Shemagh-style Scarf",
    description: `A timeless shemagh-style scarf woven for everyday wear...`,
    price: 100,
    rating: 4
  },
  {
    id: "new-arrival-coral-knit",
    name: "Coral Ribbed Knit Scarf",
    image: "/New_Arrivals/pexels-cottonbro-7496335.jpg",
    alt: "Coral ribbed knit scarf",
    description: "A chunky coral knit scarf with a richly textured ribbed weave for cozy seasonal layering.",
    price: 60,
    rating: 5
  },
  {
    id: "new-arrival-striped-wool",
    name: "Burgundy Charcoal Stripe Scarf",
    image: "/New_Arrivals/susan-wilkinson-9dDJk8lvUwg-unsplash.jpg",
    alt: "Burgundy and charcoal striped scarf",
    description: "A plush striped scarf blending burgundy, charcoal, rose, and slate tones with a softly fringed edge.",
    price: 65,
    rating: 5
  },
  {
    id: "new-arrival-lake-blue",
    name: "Lake Blue Fringe Wrap",
    image: "/New_Arrivals/pexels-momo-183274690-37609721.jpg",
    alt: "Lake blue fringed scarf",
    description: "A calm lake-blue wrap with long fringe and a generous drape inspired by quiet winter landscapes.",
    price: 55,
    rating: 4
  },
  {
    id: "new-arrival-frost-knit",
    name: "Frost Grey Knit Scarf",
    image: "/New_Arrivals/pexels-pavelpolyakov-9552153.jpg",
    alt: "Frost grey and white knit scarf",
    description: "A cozy frost-grey and white knit scarf with layered texture for bright, cold-weather styling.",
    price: 60,
    rating: 4
  },
  {
    id: "product-201",
    name: "Shemagh-style Scarf",
    image: "/Blog_Scarfs/pexels-serdargoksu-29182819.jpg",
    alt: "Silk Paisley Scarf",
    description: "A distinctive shemagh-style scarf with a refined paisley finish.",
    price: 120,
    rating: 4
  },
  {
    id: "product-202",
    name: "Shemagh-style Scarf",
    image: "/Blog_Scarfs/pexels-aminnaderloei-31976998.jpg",
    alt: "Silk Paisley Scarf",
    description: "A versatile shemagh-style scarf made for polished everyday dressing.",
    price: 120,
    rating: 4
  },
  {
    id: "product-203",
    name: "Shemagh-style Scarf",
    image: "/Scarfs_n_Accessories/flaviu-costin-oqCZdctdaL4-unsplash.jpg",
    alt: "Silk Paisley Scarf",
    description: "A soft, elegant scarf with a timeless paisley-inspired character.",
    price: 120,
    rating: 4
  },
  {
    id: "product-204",
    name: "Shemagh-style Scarf",
    image: "/Scarfs_n_Accessories/flaviu-costin-_BNH7RrIp0k-unsplash.jpg",
    alt: "Silk Paisley Scarf",
    description: "A statement scarf designed to bring texture and character to any look.",
    price: 120,
    rating: 4
  },
  {
    id: "product-205",
    name: "Shemagh-style Scarf",
    image: "/Blog_Scarfs/pexels-sam2piccs-14455241.jpg",
    alt: "Silk Paisley Scarf",
    description: "An accessible everyday scarf with an expressive, graceful drape.",
    price: 20,
    rating: 4
  },
  {
    id: "product-101",
    name: "Pexels 76506226 11217153",
    image: "/Blog_Scarfs/pexels-76506226-11217153.jpg",
    alt: "Pexels 76506226 11217153",
    description: "A carefully selected scarf with an easy silhouette and timeless appeal.",
    price: 120,
    rating: 4
  },
  {
    id: "product-102",
    name: "Pexels Ali Rezaei 83910116 15617511",
    image: "/Blog_Scarfs/pexels-ali-rezaei-83910116-15617511.jpg",
    alt: "Pexels Ali Rezaei 83910116 15617511",
    description: "A refined accessory made to complement both relaxed and formal styling.",
    price: 120,
    rating: 4
  },
  {
    id: "product-103",
    name: "Pexels Aminnaderloei 31977000",
    image: "/Blog_Scarfs/pexels-aminnaderloei-31977000.jpg",
    alt: "Pexels Aminnaderloei 31977000",
    description: "A graceful scarf with a polished finish for everyday elegance.",
    price: 120,
    rating: 4
  },
  {
    id: "product-104",
    name: "Pexels Aminnaderloei 32031992",
    image: "/Blog_Scarfs/pexels-aminnaderloei-32031992.jpg",
    alt: "Pexels Aminnaderloei 32031992",
    description: "A versatile scarf selected for its soft texture and elegant movement.",
    price: 120,
    rating: 4
  },
  {
    id: "product-105",
    name: "Pexels Aminnaderloei 33217046",
    image: "/Blog_Scarfs/pexels-aminnaderloei-33217046.jpg",
    alt: "Pexels Aminnaderloei 33217046",
    description: "A sophisticated scarf that adds a considered finishing touch.",
    price: 120,
    rating: 4
  },
  {
    id: "product-106",
    name: "Pexels Amir Mazlumi 507859842 30715222",
    image: "/Blog_Scarfs/pexels-amir-mazlumi-507859842-30715222.jpg",
    alt: "Pexels Amir Mazlumi 507859842 30715222",
    description: "An elegant accessory with a distinctive visual character.",
    price: 120,
    rating: 4
  },
  {
    id: "product-107",
    name: "Pexels Amirali Parsa 150087344 12744309",
    image: "/Blog_Scarfs/pexels-amirali-parsa-150087344-12744309.jpg",
    alt: "Pexels Amirali Parsa 150087344 12744309",
    description: "A timeless scarf suited to effortless layering and styling.",
    price: 120,
    rating: 4
  },
  {
    id: "product-108",
    name: "Pexels Anuj Yadav 34803963 7870646",
    image: "/Blog_Scarfs/pexels-anuj-yadav-34803963-7870646.jpg",
    alt: "Pexels Anuj Yadav 34803963 7870646",
    description: "A polished scarf with a soft drape and versatile appeal.",
    price: 120,
    rating: 4
  },
  {
    id: "product-109",
    name: "Pexels Atahandemir 14696810",
    image: "/Blog_Scarfs/pexels-atahandemir-14696810.jpg",
    alt: "Pexels Atahandemir 14696810",
    description: "A refined piece designed to bring quiet elegance to daily looks.",
    price: 120,
    rating: 4
  },
  {
    id: "product-110",
    name: "Pexels Atahandemir 14697013",
    image: "/Blog_Scarfs/pexels-atahandemir-14697013.jpg",
    alt: "Pexels Atahandemir 14697013",
    description: "A distinctive scarf with an easy shape and graceful finish.",
    price: 120,
    rating: 4
  },
  {
    id: "product-111",
    name: "Pexels Benedict 7029065",
    image: "/Blog_Scarfs/pexels-benedict-7029065.jpg",
    alt: "Pexels Benedict 7029065",
    description: "An understated scarf selected for elegant everyday wear.",
    price: 120,
    rating: 4
  },
  {
    id: "product-112",
    name: "Pexels Bobbydimas 30769966",
    image: "/Blog_Scarfs/pexels-bobbydimas-30769966.jpg",
    alt: "Pexels Bobbydimas 30769966",
    description: "A versatile accessory with a refined, contemporary feel.",
    price: 120,
    rating: 4
  },
  {
    id: "product-113",
    name: "Pexels Brianasarejr 12422261",
    image: "/Blog_Scarfs/pexels-brianasarejr-12422261.jpg",
    alt: "Pexels Brianasarejr 12422261",
    description: "A graceful scarf made to elevate simple outfits.",
    price: 120,
    rating: 4
  },
  {
    id: "product-114",
    name: "Pexels Carmel Nsenga 735492 11214241",
    image: "/Blog_Scarfs/pexels-carmel-nsenga-735492-11214241.jpg",
    alt: "Pexels Carmel Nsenga 735492 11214241",
    description: "A soft, wearable scarf with a polished finish.",
    price: 120,
    rating: 4
  },
  {
    id: "product-115",
    name: "Pexels Cottonbro 4972940",
    image: "/Blog_Scarfs/pexels-cottonbro-4972940.jpg",
    alt: "Pexels Cottonbro 4972940",
    description: "A versatile scarf for comfortable, considered styling.",
    price: 120,
    rating: 4
  },
  {
    id: "product-116",
    name: "Pexels Cottonbro 7496335",
    image: "/Blog_Scarfs/pexels-cottonbro-7496335.jpg",
    alt: "Pexels Cottonbro 7496335",
    description: "An elegant accessory with a relaxed and wearable character.",
    price: 120,
    rating: 4
  },
  {
    id: "product-117",
    name: "Pexels Danikprihodko 19510922",
    image: "/Blog_Scarfs/pexels-danikprihodko-19510922.jpg",
    alt: "Pexels Danikprihodko 19510922",
    description: "A timeless scarf designed for effortless layering.",
    price: 120,
    rating: 4
  },
  {
    id: "product-118",
    name: "Pexels Dauphotographer 36455711",
    image: "/Blog_Scarfs/pexels-dauphotographer-36455711.jpg",
    alt: "Pexels Dauphotographer 36455711",
    description: "A refined scarf with an expressive, comfortable drape.",
    price: 120,
    rating: 4
  },
  {
    id: "product-119",
    name: "Pexels Donald Dondada Matsoga 2557845 4625992",
    image: "/Blog_Scarfs/pexels-donald-dondada-matsoga-2557845-4625992.jpg",
    alt: "Pexels Donald Dondada Matsoga 2557845 4625992",
    description: "A statement accessory with a distinctive, modern presence.",
    price: 120,
    rating: 4
  },
  {
    id: "product-120",
    name: "Pexels Esra Salturk 1165434438 38264776",
    image: "/Blog_Scarfs/pexels-esra-salturk-1165434438-38264776.jpg",
    alt: "Pexels Esra Salturk 1165434438 38264776",
    description: "A polished scarf created for graceful everyday dressing.",
    price: 120,
    rating: 4
  },
  {
    id: "product-121",
    name: "Pexels Hiday T I Sg Nd Rsoy 1178625345 23092144",
    image: "/Blog_Scarfs/pexels-hiday-t-i-sg-nd-rsoy-1178625345-23092144.jpg",
    alt: "Pexels Hiday T I Sg Nd Rsoy 1178625345 23092144",
    description: "A versatile scarf with a softly structured silhouette.",
    price: 120,
    rating: 4
  },
  {
    id: "product-122",
    name: "Pexels Israyosoy 27155315",
    image: "/Blog_Scarfs/pexels-israyosoy-27155315.jpg",
    alt: "Pexels Israyosoy 27155315",
    description: "A graceful accessory that adds polish to every layer.",
    price: 120,
    rating: 4
  },
  {
    id: "product-123",
    name: "Pexels Jonathanborba 5533842",
    image: "/Blog_Scarfs/pexels-jonathanborba-5533842.jpg",
    alt: "Pexels Jonathanborba 5533842",
    description: "A classic scarf with an easy, elegant drape.",
    price: 120,
    rating: 4
  },
  {
    id: "product-124",
    name: "Pexels Khaliifah Hussein 1904370898 34225153",
    image: "/Blog_Scarfs/pexels-khaliifah-hussein-1904370898-34225153.jpg",
    alt: "Pexels Khaliifah Hussein 1904370898 34225153",
    description: "A refined piece designed for comfortable, expressive styling.",
    price: 120,
    rating: 4
  },
  {
    id: "product-125",
    name: "Pexels Kwnos Iv 250460536 27609511",
    image: "/Blog_Scarfs/pexels-kwnos-iv-250460536-27609511.jpg",
    alt: "Pexels Kwnos Iv 250460536 27609511",
    description: "A versatile accessory with a clean, timeless character.",
    price: 120,
    rating: 4
  },
  {
    id: "product-126",
    name: "Pexels Luizmartins 4185810",
    image: "/Blog_Scarfs/pexels-luizmartins-4185810.jpg",
    alt: "Pexels Luizmartins 4185810",
    description: "A soft scarf made for effortless everyday elegance.",
    price: 120,
    rating: 4
  },
  {
    id: "product-127",
    name: "Pexels Mahdibafande 11830673",
    image: "/Blog_Scarfs/pexels-mahdibafande-11830673.jpg",
    alt: "Pexels Mahdibafande 11830673",
    description: "A considered accessory with a graceful finish.",
    price: 120,
    rating: 4
  },
  {
    id: "product-128",
    name: "Pexels Manzano 27230001",
    image: "/Blog_Scarfs/pexels-manzano-27230001.jpg",
    alt: "Pexels Manzano 27230001",
    description: "A distinctive scarf with an elegant, wearable shape.",
    price: 120,
    rating: 4
  },
  {
    id: "product-129",
    name: "Pexels Manzano 27230009",
    image: "/Blog_Scarfs/pexels-manzano-27230009.jpg",
    alt: "Pexels Manzano 27230009",
    description: "A refined layer designed to bring texture and movement.",
    price: 120,
    rating: 4
  },
  {
    id: "product-130",
    name: "Pexels Mitrofan Pictures 9438661",
    image: "/Blog_Scarfs/pexels-mitrofan-pictures-9438661.jpg",
    alt: "Pexels Mitrofan Pictures 9438661",
    description: "A polished scarf for effortless day-to-evening styling.",
    price: 120,
    rating: 4
  },
  {
    id: "product-131",
    name: "Pexels Mizunokozuki 12887032",
    image: "/Blog_Scarfs/pexels-mizunokozuki-12887032.jpg",
    alt: "Pexels Mizunokozuki 12887032",
    description: "A soft, elegant accessory with a contemporary feel.",
    price: 120,
    rating: 4
  },
  {
    id: "product-132",
    name: "Pexels Mohammad Saaraan 3679231 5567211",
    image: "/Blog_Scarfs/pexels-mohammad-saaraan-3679231-5567211.jpg",
    alt: "Pexels Mohammad Saaraan 3679231 5567211",
    description: "A versatile scarf selected for its graceful styling potential.",
    price: 120,
    rating: 4
  },
  {
    id: "product-133",
    name: "Pexels Momo 183274690 37609721",
    image: "/Blog_Scarfs/pexels-momo-183274690-37609721.jpg",
    alt: "Pexels Momo 183274690 37609721",
    description: "A timeless accessory with a relaxed and polished finish.",
    price: 120,
    rating: 4
  },
  {
    id: "product-134",
    name: "Pexels Nelson Ribeiro 973316 5607318",
    image: "/Blog_Scarfs/pexels-nelson-ribeiro-973316-5607318.jpg",
    alt: "Pexels Nelson Ribeiro 973316 5607318",
    description: "A graceful scarf designed to finish a look with ease.",
    price: 120,
    rating: 4
  },
  {
    id: "product-135",
    name: "Pexels Nishantdas 33372359",
    image: "/Blog_Scarfs/pexels-nishantdas-33372359.jpg",
    alt: "Pexels Nishantdas 33372359",
    description: "A versatile piece with a soft, elegant silhouette.",
    price: 120,
    rating: 4
  },
  {
    id: "product-136",
    name: "Pexels Pavelpolyakov 9552153",
    image: "/Blog_Scarfs/pexels-pavelpolyakov-9552153.jpg",
    alt: "Pexels Pavelpolyakov 9552153",
    description: "A refined scarf made for expressive everyday layering.",
    price: 120,
    rating: 4
  },
  {
    id: "product-137",
    name: "Pexels Peg1997 20002323",
    image: "/Blog_Scarfs/pexels-peg1997-20002323.jpg",
    alt: "Pexels Peg1997 20002323",
    description: "A distinctive accessory with a graceful, wearable finish.",
    price: 120,
    rating: 4
  },
  {
    id: "product-138",
    name: "Pexels Rachel Claire 5864273",
    image: "/Blog_Scarfs/pexels-rachel-claire-5864273.jpg",
    alt: "Pexels Rachel Claire 5864273",
    description: "A polished scarf with an effortless, timeless character.",
    price: 120,
    rating: 4
  },
  {
    id: "product-139",
    name: "Pexels Rasul Lotfi 16110887 14416487",
    image: "/Blog_Scarfs/pexels-rasul-lotfi-16110887-14416487.jpg",
    alt: "Pexels Rasul Lotfi 16110887 14416487",
    description: "A statement-ready scarf that adds depth to simple dressing.",
    price: 120,
    rating: 4
  },
  {
    id: "product-140",
    name: "Pexels Rodrigo Ortega 2044210904 30213222",
    image: "/Blog_Scarfs/pexels-rodrigo-ortega-2044210904-30213222.jpg",
    alt: "Pexels Rodrigo Ortega 2044210904 30213222",
    description: "A versatile layer with a refined and contemporary presence.",
    price: 120,
    rating: 4
  },
  {
    id: "product-141",
    name: "Pexels Sahar Photography 914616632 19980514 1",
    image: "/Blog_Scarfs/pexels-sahar-photography-914616632-19980514 (1).jpg",
    alt: "Pexels Sahar Photography 914616632 19980514 1",
    description: "A graceful scarf with a soft finish and elegant drape.",
    price: 120,
    rating: 4
  },
  {
    id: "product-142",
    name: "Pexels Sahar Photography 914616632 19980514",
    image: "/Blog_Scarfs/pexels-sahar-photography-914616632-19980514.jpg",
    alt: "Pexels Sahar Photography 914616632 19980514",
    description: "A timeless accessory suited to polished everyday dressing.",
    price: 120,
    rating: 4
  },
  {
    id: "product-143",
    name: "Pexels Sara Kazemi 2148049458 30676581",
    image: "/Blog_Scarfs/pexels-sara-kazemi-2148049458-30676581.jpg",
    alt: "Pexels Sara Kazemi 2148049458 30676581",
    description: "A refined scarf with a distinctive and wearable silhouette.",
    price: 120,
    rating: 4
  },
  {
    id: "product-144",
    name: "Pexels Sasha Kim 8484117",
    image: "/Blog_Scarfs/pexels-sasha-kim-8484117.jpg",
    alt: "Pexels Sasha Kim 8484117",
    description: "A soft, elegant layer designed for versatile styling.",
    price: 120,
    rating: 4
  },
  {
    id: "product-145",
    name: "Pexels Sasha Kim 8484118",
    image: "/Blog_Scarfs/pexels-sasha-kim-8484118.jpg",
    alt: "Pexels Sasha Kim 8484118",
    description: "A polished scarf with a timeless everyday appeal.",
    price: 120,
    rating: 4
  },
  {
    id: "product-146",
    name: "Pexels Sasha Kim 8484157",
    image: "/Blog_Scarfs/pexels-sasha-kim-8484157.jpg",
    alt: "Pexels Sasha Kim 8484157",
    description: "A graceful accessory that adds texture and movement.",
    price: 120,
    rating: 4
  },
  {
    id: "product-147",
    name: "Pexels Sasha Kim 8484307",
    image: "/Blog_Scarfs/pexels-sasha-kim-8484307.jpg",
    alt: "Pexels Sasha Kim 8484307",
    description: "A versatile piece made for relaxed, refined dressing.",
    price: 120,
    rating: 4
  },
  {
    id: "product-148",
    name: "Pexels Seljansalim 27954375",
    image: "/Blog_Scarfs/pexels-seljansalim-27954375.jpg",
    alt: "Pexels Seljansalim 27954375",
    description: "A timeless scarf selected for its elegant finish.",
    price: 120,
    rating: 4
  },
  {
    id: "product-149",
    name: "Pexels Sepehr Ghadrdan 409202650 19552829",
    image: "/Blog_Scarfs/pexels-sepehr-ghadrdan-409202650-19552829.jpg",
    alt: "Pexels Sepehr Ghadrdan 409202650 19552829",
    description: "A distinctive layer with a polished, contemporary character.",
    price: 120,
    rating: 4
  },
  {
    id: "product-150",
    name: "Pexels Sol Pinto 3266054 13257488",
    image: "/Blog_Scarfs/pexels-sol-pinto-3266054-13257488.jpg",
    alt: "Pexels Sol Pinto 3266054 13257488",
    description: "A refined accessory for effortless day-to-evening styling.",
    price: 120,
    rating: 4
  },
  {
    id: "product-151",
    name: "Pexels Spaceprince 8891490",
    image: "/Blog_Scarfs/pexels-spaceprince-8891490.jpg",
    alt: "Pexels Spaceprince 8891490",
    description: "A graceful scarf with a soft, versatile drape.",
    price: 120,
    rating: 4
  },
  {
    id: "product-152",
    name: "Pexels Tarek Shahin 153182669 12369786",
    image: "/Blog_Scarfs/pexels-tarek-shahin-153182669-12369786.jpg",
    alt: "Pexels Tarek Shahin 153182669 12369786",
    description: "A polished piece designed to bring character to any look.",
    price: 120,
    rating: 4
  },
  {
    id: "product-153",
    name: "Pexels Thirdman 6500614",
    image: "/Blog_Scarfs/pexels-thirdman-6500614.jpg",
    alt: "Pexels Thirdman 6500614",
    description: "A versatile everyday scarf with a timeless finish.",
    price: 120,
    rating: 4
  },
  {
    id: "product-154",
    name: "Pexels Thisisjooh 31714352",
    image: "/Blog_Scarfs/pexels-thisisjooh-31714352.jpg",
    alt: "Pexels Thisisjooh 31714352",
    description: "A considered accessory with an elegant, wearable shape.",
    price: 120,
    rating: 4
  },
  {
    id: "product-155",
    name: "Pexels Viktoria Stelmakh 31300553 15017422",
    image: "/Blog_Scarfs/pexels-viktoria-stelmakh-31300553-15017422.jpg",
    alt: "Pexels Viktoria Stelmakh 31300553 15017422",
    description: "A refined scarf designed for graceful layering.",
    price: 120,
    rating: 4
  },
  {
    id: "product-156",
    name: "Pexels Vitalyagorbachev 13234233",
    image: "/Blog_Scarfs/pexels-vitalyagorbachev-13234233.jpg",
    alt: "Pexels Vitalyagorbachev 13234233",
    description: "A polished scarf with an easy and expressive character.",
    price: 120,
    rating: 4
  },
  {
    id: "product-157",
    name: "Puscas Adryan 0iLzAb4 L A Unsplash 1",
    image: "/Blog_Scarfs/puscas-adryan-0iLzAb4_-lA-unsplash (1).jpg",
    alt: "Puscas Adryan 0iLzAb4 L A Unsplash 1",
    description: "A distinctive finishing piece with an elegant, modern feel.",
    price: 120,
    rating: 4
  }
];

const BEST_SELL_IDS = new Set([
  'velvet-winter-wrap', 'bahareh-moradian-scarf', 'the-hijab-company',
  'masoud-razeghi', 'sarah-crego', 'altansukh-e', 'karen-cantu',
  'mhrezaa-v', 'khaled-ghareeb', 'ash-edmonds'
]);
const NEW_ARRIVAL_IDS = new Set([
  'new-arrival-coral-knit', 'new-arrival-striped-wool',
  'new-arrival-lake-blue', 'new-arrival-frost-knit'
]);
const COLLECTION_IDS = new Set(['product-201', 'product-202', 'product-203', 'product-204', 'product-205']);

function getProductCategories(product) {
  const searchableText = `${product.name} ${product.description}`.toLowerCase();
  const categories = ['fashion', 'accessories'];

  if (BEST_SELL_IDS.has(product.id) || /^product-20[1-5]$/.test(product.id)) categories.push('best-sell');
  if (NEW_ARRIVAL_IDS.has(product.id) || /^product-10[1-9]$/.test(product.id)) categories.push('new-arrival', 'new-season');
  if (COLLECTION_IDS.has(product.id) || searchableText.includes('silk')) categories.push('collection');
  if ((product.rating || 0) >= 4) categories.push('top-choice');
  if (searchableText.includes('winter') || searchableText.includes('seasonal') || searchableText.includes('wool') || searchableText.includes('knit')) {
    categories.push('new-season');
  }

  return [...new Set(categories)];
}

const SHOP_PRODUCT_DETAILS = {
  "product-201": { name: "Ivory Floral Silk Scarf", description: "A luminous ivory scarf with delicate floral accents, designed to frame the face with a soft, polished finish." },
  "product-202": { name: "Mushroom Plush Wrap", description: "A warm mushroom-toned wrap with a softly brushed texture for relaxed cold-weather layering." },
  "product-203": { name: "Crimson Houndstooth Keffiyeh", description: "A bold crimson and white woven scarf with a classic houndstooth-inspired pattern and fringed edges." },
  "product-204": { name: "Noir Heritage Keffiyeh", description: "A dramatic black and ivory woven scarf with a tactile heritage pattern and generous coverage." },
  "product-205": { name: "Champagne Stripe Silk Scarf", description: "A glossy champagne scarf finished with refined burgundy striping for elegant neck or hair styling." },
  "product-101": { name: "Winter Tartan Stole", description: "A dark winter stole with fine red and blue tartan lines, made for tailored coats and everyday layering." },
  "product-102": { name: "Ivory Linework Silk Scarf", description: "A lightweight ivory scarf with subtle linear artwork for a clean, artistic accent." },
  "product-103": { name: "Sienna Abstract Silk Scarf", description: "A warm brown and cream scarf with an expressive abstract print and smooth drape." },
  "product-104": { name: "Arctic Blue Fringe Wrap", description: "A pale blue oversized wrap with long fringe, bringing soft color and generous warmth to winter looks." },
  "product-105": { name: "Burnt Orange Check Scarf", description: "A vivid burnt-orange and charcoal checked scarf with a plush weave and bold seasonal presence." },
  "product-106": { name: "Monochrome Floral Silk Scarf", description: "A black and ivory floral scarf with a graphic botanical print and fluid silk-like finish." },
  "product-107": { name: "Crimson Tartan Wool Scarf", description: "A classic red, black, and grey tartan scarf with a soft winter weave and practical length." },
  "product-108": { name: "Cream Windowpane Stole", description: "A generous cream stole marked with broad grey windowpane lines and delicate fringe." },
  "product-109": { name: "Ivory Floral Silk Headscarf", description: "A bright ivory headscarf scattered with fine botanical detail for a graceful vintage-inspired look." },
  "product-110": { name: "Sunlit Multicolor Silk Scarf", description: "A vibrant silk scarf combining turquoise, coral, and orange with an expressive illustrated pattern." },
  "product-111": { name: "Cream Monogram Print Scarf", description: "A cream scarf with a repeating dark monogram-style motif and a softly tailored neckerchief shape." },
  "product-112": { name: "Black Abstract Print Scarf", description: "A black and ivory scarf with fluid abstract markings, sized for versatile everyday wrapping." },
  "product-113": { name: "Navy Fuchsia Paisley Shawl", description: "A deep navy shawl alive with fuchsia paisley motifs, offering a dramatic layer with generous coverage." },
  "product-114": { name: "Cobalt Gold Baroque Scarf", description: "A lustrous cobalt scarf framed by ornate gold baroque borders for polished statement styling." },
  "product-115": { name: "Monochrome Floral Beach Scarf", description: "A lightweight black and white floral scarf with a relaxed drape for warm-weather wrapping." },
  "product-116": { name: "Pastel Wool Layering Scarf", description: "A soft, multi-tone wool scarf blending ice blue, cream, sage, and blush in a gentle layered palette." },
  "product-117": { name: "Forest Tartan Scarf", description: "A dark green, navy, and burgundy tartan scarf with fine lines and a classic fringed finish." },
  "product-118": { name: "Charcoal Signature Scarf", description: "A refined charcoal scarf with a subtle repeating pattern, tailored for modern menswear layering." },
  "product-119": { name: "Cobalt Gold Silk Hood Scarf", description: "A rich blue and gold silk scarf styled as a hood, with ornate borders and a confident drape." },
  "product-120": { name: "Cobalt Gold Lounge Scarf", description: "A silky cobalt and gold scarf with ornamental detailing, designed for relaxed glamour." },
  "product-121": { name: "Hand-Dyed Botanical Scarf", description: "A soft scarf with loose botanical shapes and a painterly, hand-drawn character." },
  "product-122": { name: "Black Floral Bandana", description: "A compact black scarf with ivory and crimson floral motifs, ideal for neck or hair styling." },
  "product-123": { name: "Cream Fringed Winter Scarf", description: "A plush cream wrap with generous fringe, offering a softly textured finish for cold days." },
  "product-124": { name: "Leopard Print Wool Scarf", description: "A warm leopard-print scarf with a confident pattern and substantial coverage for winter layering." },
  "product-125": { name: "Ivory Graphite Line Scarf", description: "A crisp ivory scarf traced with graphic charcoal lines for a modern, architectural look." },
  "product-126": { name: "Black Stripe Neckerchief", description: "A compact black and ivory striped scarf with a neat tied silhouette and graphic contrast." },
  "product-127": { name: "Moss Texture Winter Scarf", description: "A plush moss and charcoal scarf with a mottled texture for understated cold-weather comfort." },
  "product-128": { name: "Cinnamon Monogram Silk Scarf", description: "A warm cinnamon scarf with a repeating geometric monogram-inspired print and satin-like finish." },
  "product-129": { name: "Blue Gold Chain Scarf", description: "A black, ivory, and gold scarf with chain borders and a bold, luxurious graphic rhythm." },
  "product-130": { name: "Silver Knit Winter Set", description: "A chunky silver-grey knit scarf and hat pairing designed for cozy texture and dependable warmth." },
  "product-131": { name: "Rosebud Pastel Neckerchief", description: "A delicate pastel neckerchief with small floral details and a light, feminine drape." },
  "product-132": { name: "Ink Floral Silk Scarf", description: "A deep blue and cream scarf with flowing floral forms for an artful, elegant finish." },
  "product-133": { name: "Cinnamon Chain Silk Scarf", description: "A cinnamon and ivory scarf with repeating chain geometry, bringing graphic polish to simple outfits." },
  "product-134": { name: "Blue Fringe River Wrap", description: "A soft blue wrap with long fringe and a generous silhouette for cool-weather layering." },
  "product-135": { name: "Sky Blue Tartan Stole", description: "A pale blue and ivory plaid stole with soft fringe, suited to relaxed outdoor styling." },
  "product-136": { name: "Black Floral Border Scarf", description: "A black scarf edged with warm botanical detailing, combining a refined base with an expressive border." },
  "product-137": { name: "Ivory Botanical Display Scarf", description: "A lightweight ivory scarf with hand-drawn botanical illustrations and a softly fringed edge." },
  "product-138": { name: "Graphite Floral Scarf", description: "A charcoal and ivory floral scarf with a quiet, painterly pattern and easy everyday drape." },
  "product-139": { name: "Black White Stripe Hood Scarf", description: "A black and ivory striped scarf styled as a neat hood, finished with a soft tie at the neck." },
  "product-140": { name: "Leopard Luxe Wrap", description: "A warm leopard-print wrap with a softly brushed look for confident winter layering." },
  "product-141": { name: "Cream Fringe Comfort Scarf", description: "A substantial cream scarf with long fringe and a cocooning silhouette for cold-weather comfort." },
  "product-142": { name: "Black Star Silk Scarf", description: "A lightweight black scarf scattered with fine white stars, finished in a compact neckerchief shape." },
  "product-143": { name: "Soft Ivory Fringe Wrap", description: "A neutral ivory wrap with a softly brushed finish and relaxed fringe for everyday warmth." },
  "product-144": { name: "Burgundy Alpine Tartan Scarf", description: "A deep burgundy and charcoal tartan scarf made for crisp mountain air and winter coats." },
  "product-145": { name: "Chain Border Noir Stole", description: "A black and ivory stole with ornate chain borders, bringing polished contrast to layered outfits." },
  "product-146": { name: "Geometric Camel Silk Scarf", description: "A camel and black geometric scarf with a bold repeating pattern and smooth, lightweight drape." },
  "product-147": { name: "Mango Knit Winter Scarf", description: "A warm mango-orange knit scarf with a tactile weave and playful fringed finish." },
  "product-148": { name: "Blue Chain Print Silk Scarf", description: "A cool blue scarf with colorful chain and medallion details for bright, expressive styling." },
  "product-149": { name: "Spiced Orange Knit Scarf", description: "A rich orange ribbed knit scarf with a long, cozy silhouette for winter layering." },
  "product-150": { name: "Black Gold Heritage Shawl", description: "A dramatic black shawl with cream and gold ornamental borders, designed for elegant coverage." },
  "product-151": { name: "Camel Geometric Print Scarf", description: "A camel scarf with bold black geometric lettering-inspired shapes and a distinctive graphic finish." },
  "product-152": { name: "Black White Abstract Wrap", description: "A black and ivory wrap with an expressive abstract pattern and generous, fluid coverage." },
  "product-153": { name: "Slate Blue Winter Stole", description: "A cool slate-blue stole with a soft woven texture and long fringe for practical warmth." },
  "product-154": { name: "Blue Chain Silk Hood", description: "A deep blue silk scarf with cream chain motifs, styled as a graceful hooded wrap." },
  "product-155": { name: "Cobalt Gold Silk Wrap", description: "A luminous cobalt and gold ornamental scarf with a fluid drape and statement border." },
  "product-156": { name: "Cobalt Gold Resting Scarf", description: "A rich cobalt and gold scarf with ornate detailing, designed to hold its shape beautifully when draped." },
  "product-157": { name: "Camel Geometric Silk Scarf", description: "A warm camel scarf with black geometric motifs and a smooth finish for polished everyday styling." }
};

export const PRODUCTS = BASE_PRODUCTS.map((product) => ({
  ...product,
  ...(SHOP_PRODUCT_DETAILS[product.id] || {}),
  categories: getProductCategories({ ...product, ...(SHOP_PRODUCT_DETAILS[product.id] || {}) })
}));