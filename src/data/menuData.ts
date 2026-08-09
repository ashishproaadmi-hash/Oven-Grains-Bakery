import { Product, Review, Order } from "../types";
import blackForestCakeImg from "../assets/images/black_forest_cake_1786260914007.jpg";
import blueberryCheesecakeImg from "../assets/images/blueberry_cheesecake_1786260926770.jpg";
import butterscotchCakeImg from "../assets/images/butterscotch_cake_1786260939988.jpg";
import chocPastrySliceImg from "../assets/images/choc_pastry_slice_1786261137238.jpg";
import chocoTruffleCakeImg from "../assets/images/choco_truffle_cake_1786260952372.jpg";
import designerCakeImg from "../assets/images/designer_cake_1786261005305.jpg";
import freshFruitCakeImg from "../assets/images/fresh_fruit_cake_1786260963839.jpg";
import heroBakeryBannerImg from "../assets/images/hero_bakery_banner_1786260897618.jpg";
import makhanaCookiesImg from "../assets/images/makhana_cookies_1786261019290.jpg";
import mangoCakeImg from "../assets/images/mango_cake_1786261031452.jpg";
import mangoCheesecakeImg from "../assets/images/mango_cheesecake_1786261044181.jpg";
import mangoPastryImg from "../assets/images/mango_pastry_1786261111431.jpg";
import orangeCheesecakeImg from "../assets/images/orange_cheesecake_1786261057111.jpg";
import oreoCheesecakeImg from "../assets/images/oreo_cheesecake_1786261069873.jpg";
import pineappleCakeImg from "../assets/images/pineapple_cake_1786261083905.jpg";
import rasmalaiCakeImg from "../assets/images/rasmalai_cake_1786260977701.jpg";
import redVelvetCakeImg from "../assets/images/red_velvet_cake_1786260989991.jpg";
import vanillaCakeImg from "../assets/images/vanilla_cake_1786261096323.jpg";
import vanillaPastryImg from "../assets/images/vanilla_pastry_1786261124883.jpg";


export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Vanilla Cake",
    price: 364,
    description: "Vanilla sponge with soft and delicious cream. Inside white chocolate added.",
    image: vanillaCakeImg,
    category: "Birthday Cakes",
    rating: 4.8,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Classic Vanilla", "White Chocolate Crunch"],
    tags: ["Vegetarian", "Vanilla", "Melt-In-Mouth"],
    isSignature: false
  },
  {
    id: "p2",
    name: "Choco Vanilla Cake [454 G]",
    price: 432,
    description: "One layer of chocolate sponge and inside black choco chips added and chocolate truffles coated.",
    image: chocoTruffleCakeImg,
    category: "Birthday Cakes",
    rating: 4.9,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Choco Vanilla Fusion", "Chocolate Truffle Core"],
    tags: ["Vegetarian", "Best Seller", "Chocoholic"],
    isSignature: true
  },
  {
    id: "p3",
    name: "Butterscotch Cake [454 G]",
    price: 473,
    description: "[Veg preparation] Pure butterscotch with roasted premium nuts.",
    image: butterscotchCakeImg,
    category: "Birthday Cakes",
    rating: 4.7,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Pure Butterscotch", "Classic Caramel Twist"],
    tags: ["Vegetarian", "Nutty", "Popular"],
    isSignature: false
  },
  {
    id: "p4",
    name: "Pineapple Filling Cake [454 G]",
    price: 473,
    description: "Inside pineapple slices. With less cream, light and refreshing.",
    image: pineappleCakeImg,
    category: "Birthday Cakes",
    rating: 4.9,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Pineapple Delight", "Classic Vanilla Pineapple"],
    tags: ["Vegetarian", "Fresh Fruit", "Signature"],
    isSignature: true
  },
  {
    id: "p5",
    name: "Orange Filling Cake [454 G]",
    price: 500,
    description: "Yummy orange flavour with real orange pulp very delicious.",
    image: orangeCheesecakeImg,
    category: "Birthday Cakes",
    rating: 4.8,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Tangy Orange Pulp", "Citrus Vanilla"],
    tags: ["Vegetarian", "Fruity", "New Launch"],
    isSignature: false
  },
  {
    id: "p6",
    name: "Dark Forest Cake [454 G]",
    price: 473,
    description: "Premium dark cocoa sponge layered with rich whipped cream and sweet dark cherries.",
    image: blackForestCakeImg,
    category: "Birthday Cakes",
    rating: 4.7,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Rich Dark Forest", "Double Chocolate Cherry"],
    tags: ["Vegetarian", "Classic", "Rich Chocolate"],
    isSignature: false
  },
  {
    id: "p7",
    name: "Black Forest Cake [454 G]",
    price: 473,
    description: "Delectable layers of chocolate sponge filled with fresh cherries, rich whipped cream and chocolate flakes.",
    image: blackForestCakeImg,
    category: "Birthday Cakes",
    rating: 4.8,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Classic Black Forest", "Chocolate Cherry Fusion"],
    tags: ["Vegetarian", "All-Time Favorite"],
    isSignature: false
  },
  {
    id: "p8",
    name: "Mango Filling Cake [454 G]",
    price: 500,
    description: "Delicious seasonal mango pulp layers folded with sweet dairy cream and vanilla sponge.",
    image: mangoCakeImg,
    category: "Birthday Cakes",
    rating: 4.9,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Alphonso Mango Nectar", "Creamy Mango Fusion"],
    tags: ["Vegetarian", "Fruity", "Summer Delight"],
    isSignature: false
  },
  {
    id: "p9",
    name: "Blueberry Filling Cake [454 G]",
    price: 500,
    description: "Moist vanilla sponge filled with juicy wild blueberry compote and light whipped cream frosting.",
    image: blueberryCheesecakeImg,
    category: "Birthday Cakes",
    rating: 4.8,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Wild Blueberry Compote", "Berry Vanilla Cream"],
    tags: ["Vegetarian", "Berry Delight", "Gourmet"],
    isSignature: false
  },
  {
    id: "p10",
    name: "White Forest Cake [454 G]",
    price: 500,
    description: "[Veg preparation] Soft vanilla sponge cake with juicy cherries and milky white chocolate flakes.",
    image: vanillaCakeImg,
    category: "Birthday Cakes",
    rating: 4.7,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["White Forest Cherry", "Creamy Milky Way"],
    tags: ["Vegetarian", "White Chocolate"],
    isSignature: false
  },
  {
    id: "p11",
    name: "Chocolate Cake [454 G]",
    price: 540,
    description: "[Veg preparation] Rich and indulgent dark chocolate sponge with silky chocolate fudge frosting.",
    image: chocoTruffleCakeImg,
    category: "Birthday Cakes",
    rating: 4.9,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Classic Chocolate Fudge", "Premium Cocoa Melt"],
    tags: ["Vegetarian", "Chocoholic", "Best Seller"],
    isSignature: false
  },
  {
    id: "p12",
    name: "Guava Cake [454 G]",
    price: 540,
    description: "Exotic tropical pink guava flavor with a hint of sweet chili spice and real guava pulp.",
    image: freshFruitCakeImg,
    category: "Birthday Cakes",
    rating: 4.6,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Pink Guava Chili", "Sweet Tropical Guava"],
    tags: ["Vegetarian", "Spicy Sweet", "Unique"],
    isSignature: false
  },
  {
    id: "p13",
    name: "Choco Chips Cake [454 G]",
    price: 608,
    description: "Rich chocolate sponge with chocolate cream and loaded with dark chocolate chips inside and out.",
    image: chocoTruffleCakeImg,
    category: "Birthday Cakes",
    rating: 4.8,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Double Choco Chips", "Crunchy Cocoa Fudge"],
    tags: ["Vegetarian", "Crunchy", "Chocoholic"],
    isSignature: false
  },
  {
    id: "p14",
    name: "Rasmalai Cake [454 G]",
    price: 675,
    description: "Cardamom-infused soft sponge layered with real rich Rasmalai, saffron syrup, and crunchy nuts.",
    image: rasmalaiCakeImg,
    category: "Custom Cakes",
    rating: 5.0,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Royal Rasmalai Twist", "Saffron Cardamom"],
    tags: ["Vegetarian", "Fusion Elite", "Signature"],
    isSignature: true
  },
  {
    id: "p15",
    name: "Red Velvet Cake [454 G]",
    price: 675,
    description: "[Veg preparation] Luxurious red velvet cocoa sponge paired with thick cream cheese layers.",
    image: redVelvetCakeImg,
    category: "Custom Cakes",
    rating: 4.9,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Red Velvet Cheese", "Cocoa Crimson Cream"],
    tags: ["Vegetarian", "Elite Choice", "Creamy"],
    isSignature: true
  },
  {
    id: "p16",
    name: "Milky Delight Cake [454 G]",
    price: 743,
    description: "Sweet milky sponge layered with thick condensed milk cream and rich white chocolate curls.",
    image: vanillaCakeImg,
    category: "Custom Cakes",
    rating: 4.8,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Condensed Milky Bliss", "White Satin Cream"],
    tags: ["Vegetarian", "Super Sweet"],
    isSignature: false
  },
  {
    id: "p17",
    name: "Hazelnut Cake [454 G]",
    price: 810,
    description: "[Veg preparation] Silky hazelnut chocolate praline whipped cream layered between moist cocoa sponge.",
    image: chocoTruffleCakeImg,
    category: "Custom Cakes",
    rating: 4.9,
    sizes: ["0.5 kg", "1.0 kg", "2.0 kg"],
    flavors: ["Hazelnut Praline", "Nutella Velvet Chocolate"],
    tags: ["Vegetarian", "Premium Nutty", "Chocoholic"],
    isSignature: false
  },
  {
    id: "p18",
    name: "Chocolate Truffle Cake [600 G]",
    price: 878,
    description: "[Veg preparation] Extra dense chocolate sponge coated in premium Belgian dark chocolate truffle glaze.",
    image: chocoTruffleCakeImg,
    category: "Custom Cakes",
    rating: 5.0,
    sizes: ["0.6 kg", "1.2 kg", "2.0 kg"],
    flavors: ["Belgian Cocoa Truffle", "Dark Satin Fudge"],
    tags: ["Vegetarian", "Best Seller", "Super Rich"],
    isSignature: true
  },
  {
    id: "p19",
    name: "White Truffle Cake [600 G]",
    price: 1013,
    description: "Decadent white chocolate truffle layers with sweet milky cream and premium white chocolate shavings.",
    image: vanillaCakeImg,
    category: "Custom Cakes",
    rating: 4.8,
    sizes: ["0.6 kg", "1.2 kg"],
    flavors: ["White Velvet Truffle", "Creamy Dreamy Milk"],
    tags: ["Vegetarian", "Luxury Cream"],
    isSignature: false
  },
  {
    id: "p20",
    name: "Belgium Chocolate Cake [600 G]",
    price: 1080,
    description: "[Veg preparation] Real imported Belgian chocolate ganache folded with dark cocoa sponge layers.",
    image: chocoTruffleCakeImg,
    category: "Custom Cakes",
    rating: 5.0,
    sizes: ["0.6 kg", "1.2 kg", "2.4 kg"],
    flavors: ["Deep Belgian Ganache", "Intense Dark Mud"],
    tags: ["Vegetarian", "Premium", "Chocoholic Dream"],
    isSignature: true
  },
  {
    id: "p21",
    name: "Silk Chocolate Cake [600 G]",
    price: 1080,
    description: "Luxuriously smooth milk chocolate silk cream layered between fluffy chocolate chiffon sponges.",
    image: chocoTruffleCakeImg,
    category: "Custom Cakes",
    rating: 4.9,
    sizes: ["0.6 kg", "1.2 kg"],
    flavors: ["Silk Chocolate Satin", "Creamy Cocoa Velvet"],
    tags: ["Vegetarian", "Extra Smooth"],
    isSignature: false
  },
  {
    id: "p22",
    name: "Blueberry Cheesecake [800 G]",
    price: 1080,
    description: "[Veg preparation] Rich and creamy baked cheesecake base finished with thick wild blueberry glaze.",
    image: blueberryCheesecakeImg,
    category: "Custom Cakes",
    rating: 4.9,
    sizes: ["0.8 kg", "1.6 kg"],
    flavors: ["Classic New York Berry", "Baked Cheese Blueberry"],
    tags: ["Vegetarian", "Cheese Specialty", "Premium"],
    isSignature: false
  },
  {
    id: "p23",
    name: "Mango Cheesecake [800 G]",
    price: 1080,
    description: "[Veg preparation] Baked cream cheese cake infused and glazed with sweet organic Alphonso mango nectar.",
    image: mangoCheesecakeImg,
    category: "Custom Cakes",
    rating: 4.8,
    sizes: ["0.8 kg", "1.6 kg"],
    flavors: ["Alphonso Cheese Baked", "Tropical Mango Swirl"],
    tags: ["Vegetarian", "Cheesecake", "Fruity"],
    isSignature: false
  },
  {
    id: "p24",
    name: "Pineapple Cheesecake [800 G]",
    price: 1080,
    description: "[Veg preparation] Rich baked cheesecake topped with caramelized pineapple slices and fresh nectar glaze.",
    image: pineappleCakeImg,
    category: "Custom Cakes",
    rating: 4.7,
    sizes: ["0.8 kg"],
    flavors: ["Baked Pineapple Cream", "Pineapple Compote Swirl"],
    tags: ["Vegetarian", "Tangy Sweet"],
    isSignature: false
  },
  {
    id: "p25",
    name: "Orange Cheesecake [800 G]",
    price: 1080,
    description: "[Veg preparation] Light and citrusy baked cheesecake topped with a gorgeous tangy real orange pulp layer.",
    image: orangeCheesecakeImg,
    category: "Custom Cakes",
    rating: 4.7,
    sizes: ["0.8 kg"],
    flavors: ["Zesty Orange Baked", "Citrus Cheese Swirl"],
    tags: ["Vegetarian", "Citrus", "Cheesecake"],
    isSignature: false
  },
  {
    id: "p26",
    name: "Oreo Cheesecake [800 G]",
    price: 1080,
    description: "Rich chocolate biscuit crust with dense baked cream cheese filled with crushed Oreo chunks.",
    image: oreoCheesecakeImg,
    category: "Custom Cakes",
    rating: 4.9,
    sizes: ["0.8 kg", "1.6 kg"],
    flavors: ["Oreo Cookie Crumble", "Chocolate Biscuit Cheese"],
    tags: ["Vegetarian", "Cookies & Cream", "All-Time Love"],
    isSignature: false
  },
  {
    id: "p27",
    name: "Fresh Fruit Cake [500 G]",
    price: 750,
    description: "Fresh vanilla cake decorated generously with freshly sliced seasonal fruits and sweet fruit glaze.",
    image: freshFruitCakeImg,
    category: "Custom Cakes",
    rating: 5.0,
    sizes: ["0.5 kg", "1.0 kg"],
    flavors: ["Seasonal Fruit Medley", "Vanilla Custard Fruit"],
    tags: ["Vegetarian", "Healthy Vibe", "Fresh Fruit"],
    isSignature: true
  },
  {
    id: "p28",
    name: "Pineapple Pastry [70 G]",
    price: 65,
    description: "Delicious single-serve slice of soft pineapple cake with pineapple bits and vanilla whipped cream.",
    image: vanillaPastryImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Individual Slice", "Pineapple"],
    isSignature: false
  },
  {
    id: "p29",
    name: "Butterscotch Pastry [70 G]",
    price: 65,
    description: "[Veg preparation] Fluffy pastry layered with sweet butterscotch cream and crunchy cashew praline.",
    image: butterscotchCakeImg,
    category: "Pastries",
    rating: 4.7,
    tags: ["Vegetarian", "Classic", "Nutty Crunch"],
    isSignature: false
  },
  {
    id: "p30",
    name: "Blueberry Pastry [70 G]",
    price: 70,
    description: "[Veg preparation] Soft single pastry layered with tasty wild blueberry sauce and sweet white cream.",
    image: blueberryCheesecakeImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Berry Delight"],
    isSignature: false
  },
  {
    id: "p31",
    name: "Black Forest Pastry [70 G]",
    price: 65,
    description: "Delectable single-portion slice of classic Black Forest cake topped with cherries and chocolate flakes.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.7,
    tags: ["Vegetarian", "All-Time Classic"],
    isSignature: false
  },
  {
    id: "p32",
    name: "White Forest Pastry [70 G]",
    price: 70,
    description: "Soft vanilla pastry single-portion layered with juicy red cherries and white chocolate curls.",
    image: vanillaPastryImg,
    category: "Pastries",
    rating: 4.7,
    tags: ["Vegetarian", "White Chocolate"],
    isSignature: false
  },
  {
    id: "p33",
    name: "Orange Pastry [70 G]",
    price: 70,
    description: "Zesty and sweet orange flavored single-slice pastry with soft vanilla sponge.",
    image: orangeCheesecakeImg,
    category: "Pastries",
    rating: 4.6,
    tags: ["Vegetarian", "Citrusy"],
    isSignature: false
  },
  {
    id: "p34",
    name: "Red Velvet Pastry [70 G]",
    price: 99,
    description: "[Veg preparation] Elegant single portion of soft velvet crimson cocoa sponge with silky cream cheese layers.",
    image: redVelvetCakeImg,
    category: "Pastries",
    rating: 4.9,
    tags: ["Vegetarian", "Elite Snack", "Creamy"],
    isSignature: false
  },
  {
    id: "p35",
    name: "Belgium Pastry [80 G]",
    price: 110,
    description: "[Veg preparation] Dense, intense dark mud chocolate pastry iced with premium Belgian cocoa ganache.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.9,
    tags: ["Vegetarian", "Super Rich", "Gourmet chocolate"],
    isSignature: false
  },
  {
    id: "p36",
    name: "Silk Pastry [80 G]",
    price: 110,
    description: "Incredibly smooth milk chocolate pastry that melts in your mouth with chocolate silk cream.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Dairy Chocolate", "Melt-In-Mouth"],
    isSignature: false
  },
  {
    id: "p37",
    name: "Tiramisu Pastry [75 G]",
    price: 120,
    description: "Espresso-soaked light sponge layers with rich, whipped mascarpone cheese and cocoa powder dusting.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.9,
    tags: ["Vegetarian", "Coffee Lover", "Italian Fusion"],
    isSignature: false
  },
  {
    id: "p38",
    name: "Chocolate Pastry [75 G]",
    price: 80,
    description: "Classic and dependable single portion of chocolate fudge pastry with dark chocolate cream.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Chocoholic"],
    isSignature: false
  },
  {
    id: "p39",
    name: "Chocolate Truffle Pastry [90 G]",
    price: 130,
    description: "[Veg preparation] Thick, indulgent dark Belgian chocolate truffle cream layered generously in chocolate sponge.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 5.0,
    tags: ["Vegetarian", "Rich Truffle", "Best Seller"],
    isSignature: true
  },
  {
    id: "p40",
    name: "Mango Pastry [70 G]",
    price: 70,
    description: "Light, summery pastry with sweet alphonso mango cream and soft white vanilla sponge.",
    image: mangoPastryImg,
    category: "Pastries",
    rating: 4.7,
    tags: ["Vegetarian", "Fruit Lover"],
    isSignature: false
  },
  {
    id: "p41",
    name: "Rasmalai Pastry [90 G]",
    price: 110,
    description: "Fascinating Indian fusion pastry with saffron-cardamom sponge and real cottage cheese Rasmalai bits.",
    image: rasmalaiCakeImg,
    category: "Pastries",
    rating: 4.9,
    tags: ["Vegetarian", "Indian Sweet Fusion", "Unique"],
    isSignature: false
  },
  {
    id: "p42",
    name: "Choco Lava Pastry [70 G]",
    price: 80,
    description: "Warm, chocolate sponge containing an incredibly rich, molten dark chocolate liquid center.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.9,
    tags: ["Vegetarian", "Molten Lava", "Warm Delight"],
    isSignature: false
  },
  {
    id: "p43",
    name: "Red Velvet Choco Lava Pastry [70 G]",
    price: 110,
    description: "Soft velvet-red cocoa shell featuring a molten, liquid hot white chocolate core.",
    image: redVelvetCakeImg,
    category: "Pastries",
    rating: 4.9,
    tags: ["Vegetarian", "Molten Core", "White Chocolate"],
    isSignature: false
  },
  {
    id: "p44",
    name: "Chocolate Donut Pastry [70 G]",
    price: 70,
    description: "[Veg preparation] Soft, fluffy baked ring donut completely glazed in dark Belgian chocolate ganache.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Donut Classic"],
    isSignature: false
  },
  {
    id: "p45",
    name: "Oven Grains Caramel Donut Pastry [75 G]",
    price: 95,
    description: "Sweet baked ring donut coated in dense caramel fudge and detailed with white chocolate loops.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.7,
    tags: ["Vegetarian", "Caramel Glide"],
    isSignature: false
  },
  {
    id: "p46",
    name: "Oven Grains Makhana Pineapple Pastry [80 G]",
    price: 95,
    description: "Healthy fusion: Butterscotch-pineapple sponge infused with finely roasted and crushed local Ranchi Makhana.",
    image: pineappleCakeImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Makhana Fusion", "Local Specialty"],
    isSignature: true
  },
  {
    id: "p47",
    name: "Oven Grains Makhana Buttersctoch Pastry [80 G]",
    price: 95,
    description: "Classic butterscotch pastry layered with cream and toasted crunchy ground Makhana bites.",
    image: makhanaCookiesImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Healthy Twist", "Crunchy"],
    isSignature: true
  },
  {
    id: "p48",
    name: "Oven Grains Makhana Chocolate Pastry [95 G]",
    price: 110,
    description: "Indulgent dark chocolate mud sponge balanced with slow-roasted Ranchi Makhana crunch.",
    image: chocPastrySliceImg,
    category: "Pastries",
    rating: 4.9,
    tags: ["Vegetarian", "Makhana Chocolate", "Ranchi Original"],
    isSignature: true
  },
  {
    id: "p49",
    name: "Blueberry Cheese Pastry [110 G]",
    price: 150,
    description: "Luxury individual serving of baked blueberry cream cheesecake, rich and smooth.",
    image: blueberryCheesecakeImg,
    category: "Pastries",
    rating: 4.9,
    tags: ["Vegetarian", "Cheese Specialty", "Premium"],
    isSignature: false
  },
  {
    id: "p50",
    name: "Mango Cheese Pastry [110 G]",
    price: 150,
    description: "Premium single slice of baked cream cheese pastry glazed with Alphonso mango pulp.",
    image: mangoCheesecakeImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Mango Swirl", "Cheesecake"],
    isSignature: false
  },
  {
    id: "p51",
    name: "Orange Cheese Pastry [110 G]",
    price: 150,
    description: "Baked cream cheese single-slice pastry topped with sweet zesty orange compote glaze.",
    image: orangeCheesecakeImg,
    category: "Pastries",
    rating: 4.8,
    tags: ["Vegetarian", "Citrus Cheese", "Cheesecake"],
    isSignature: false
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev1",
    author: "Dr. Vivek Kumar",
    rating: 5,
    text: "The Royal Rasmalai Cake from Oven Grains is an absolute masterpiece! Not too sweet, perfectly moist, and has authentic Indian flavors. My guests at Harmu Road were deeply impressed.",
    date: "2026-06-28",
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23c29b38'/%3E%3Cpath d='M50 45a15 15 0 1 0 0-30 15 15 0 0 0 0 30zm0 10c-20 0-35 12-35 25v5h70v-5c0-13-15-25-35-25z' fill='%23ffffff'/%3E%3C/svg%3E",
    verified: true
  },
  {
    id: "rev2",
    author: "Priya Sharma",
    rating: 5,
    text: "Highly recommend their Pineapple Cake for kids' birthdays. Extremely soft and eggless sponge options are very delicious. Seamless delivery to Lalpur. Oven Grains is my go-to bakery in Ranchi!",
    date: "2026-06-30",
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23c29b38'/%3E%3Cpath d='M50 45a15 15 0 1 0 0-30 15 15 0 0 0 0 30zm0 10c-20 0-35 12-35 25v5h70v-5c0-13-15-25-35-25z' fill='%23ffffff'/%3E%3C/svg%3E",
    verified: true
  },
  {
    id: "rev3",
    author: "Vikash Oraon",
    rating: 5,
    text: "The gourmet pastries at Oven Grains are phenomenal. A luxurious flavor profile combined with fine premium creams. Absolute luxury in Ranchi. Excellent customer service over WhatsApp too.",
    date: "2026-07-01",
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23c29b38'/%3E%3Cpath d='M50 45a15 15 0 1 0 0-30 15 15 0 0 0 0 30zm0 10c-20 0-35 12-35 25v5h70v-5c0-13-15-25-35-25z' fill='%23ffffff'/%3E%3C/svg%3E",
    verified: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-2771",
    status: "pending",
    paymentStatus: "pending",
    paymentId: "COD_PENDING",
    createdAt: "2026-07-03T10:09:04.536Z",
    paymentMethod: "COD",
    items: [
      {
        id: "p4",
        product: INITIAL_PRODUCTS[3],
        quantity: 1
      }
    ],
    customerName: "Ashish",
    phone: "+91 99391 23878",
    whatsapp: "+91 99391 23878",
    email: "ashishproaadmi@gmail.com",
    address: "Harmu Road, Sahjanand Chowk, Ranchi",
    deliveryType: "delivery",
    totalAmount: 473,
    orderNotes: "Please make it extra fresh"
  }
];

export function getLocalRecommendations(cartItems: any[]) {
  const cartCategories = new Set(cartItems.map((item) => item.product.category));
  const cartProductIds = new Set(cartItems.map((item) => item.product.id));

  const available = INITIAL_PRODUCTS.filter((p) => !cartProductIds.has(p.id));

  let heading = "Complete your celebration with these delicious bakery treats!";
  let recommended = available.filter((p) => p.category === "Pastries");

  if (cartCategories.has("Birthday Cakes") || cartCategories.has("Custom Cakes")) {
    heading = "Pairs wonderfully with your cake! Try these gourmet pastries:";
  } else if (cartCategories.has("Pastries")) {
    heading = "Complete your order with our popular signature cakes:";
    recommended = available.filter((p) => p.category === "Birthday Cakes" || p.category === "Custom Cakes");
  }

  if (recommended.length < 3) {
    const extra = available.filter((p) => !recommended.some((r) => r.id === p.id));
    recommended = [...recommended, ...extra];
  }

  return {
    heading,
    recommendedIds: recommended.slice(0, 3).map((p) => p.id)
  };
}
