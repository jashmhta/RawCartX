from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional, List
import os
from datetime import datetime, timezone

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(MONGO_URL)
db = client.rawkart_db

class ContactMessage(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str = Field(..., min_length=1)
    created_at: Optional[str] = None

class Product(BaseModel):
    id: int
    name: str
    image: str
    benefit: str
    attributes: List[str]
    industry: str
    functions: List[str]

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "RawKart API"}

@app.post("/api/contact")
async def submit_contact(contact: ContactMessage):
    try:
        contact_dict = contact.dict()
        contact_dict["created_at"] = datetime.now(timezone.utc).isoformat()
        
        result = await db.contacts.insert_one(contact_dict)
        
        return {
            "success": True,
            "message": "Thank you for contacting us! We'll get back to you soon.",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/products", response_model=List[Product])
async def get_products(
    industry: Optional[str] = None,
    function: Optional[str] = None,
    search: Optional[str] = None
):
    try:
        products_collection = await db.products.find({}, {"_id": 0}).to_list(1000)
        
        if not products_collection:
            return []
        
        filtered = products_collection
        
        if industry:
            filtered = [p for p in filtered if p.get("industry", "").lower() == industry.lower()]
        
        if function:
            filtered = [p for p in filtered if function.lower() in [f.lower() for f in p.get("functions", [])]]
        
        if search:
            search_lower = search.lower()
            filtered = [p for p in filtered if 
                       search_lower in p.get("name", "").lower() or
                       search_lower in p.get("benefit", "").lower()]
        
        return filtered
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/products/seed")
async def seed_products():
    try:
        existing = await db.products.count_documents({})
        if existing > 0:
            return {"message": "Products already seeded", "count": existing}
        
        products = [
    {
        "id": 1,
        "name": "BCAA 2:1:1",
        "image": "/assets/product_bca.jpg",
        "benefit": "Essential amino acids for muscle support and recovery during workouts.",
        "attributes": ["Natural Performance Fuel", "Muscle Support", "Recovery"],
        "industry": "Sports Nutrition",
        "functions": ["Muscle Support", "Recovery Enhancement"]
    },
    {
        "id": 2,
        "name": "Glycine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Non-essential amino acid supporting collagen synthesis and sleep quality.",
        "attributes": ["Pure", "Quality Tested"],
        "industry": "Sports Nutrition",
        "functions": ["Collagen Support", "Sleep Enhancement"]
    },
    {
        "id": 3,
        "name": "L-Alanine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Amino acid supporting energy metabolism and protein synthesis.",
        "attributes": ["Pure", "Non-GMO"],
        "industry": "Sports Nutrition",
        "functions": ["Energy Metabolism", "Protein Synthesis"]
    },
    {
        "id": 4,
        "name": "L-Arginine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Supports nitric oxide production and cardiovascular health.",
        "attributes": ["Pure", "Effective"],
        "industry": "Health Supplements",
        "functions": ["Blood Flow Support", "Cardiovascular Health"]
    },
    {
        "id": 5,
        "name": "L-Arginine A-Ketoglutarate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Enhanced form of L-Arginine for improved absorption and effectiveness.",
        "attributes": ["Enhanced Formula", "High Absorption"],
        "industry": "Sports Nutrition",
        "functions": ["Performance Enhancement", "Pump Support"]
    },
    {
        "id": 6,
        "name": "L-Arginine Aspartate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Combination form providing both arginine and aspartic acid benefits.",
        "attributes": ["Dual Action", "Performance"],
        "industry": "Sports Nutrition",
        "functions": ["Energy Production", "Endurance"]
    },
    {
        "id": 7,
        "name": "L-Arginine HCl",
        "image": "/assets/products_hero.jpg",
        "benefit": "Hydrochloride salt form of L-Arginine with enhanced stability.",
        "attributes": ["Stable", "Pure"],
        "industry": "Sports Nutrition",
        "functions": ["Nitric Oxide Support", "Vasodilation"]
    },
    {
        "id": 8,
        "name": "L-Arginine Nitrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Advanced form combining arginine with nitrate for enhanced performance.",
        "attributes": ["Advanced Formula", "Performance"],
        "industry": "Sports Nutrition",
        "functions": ["Pump Enhancement", "Endurance"]
    },
    {
        "id": 9,
        "name": "L-Asparagine Monohydrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Amino acid supporting nervous system function and protein synthesis.",
        "attributes": ["Pure", "Quality Tested"],
        "industry": "Health Supplements",
        "functions": ["Nervous System Support", "Protein Synthesis"]
    },
    {
        "id": 10,
        "name": "L-Aspartic Acid",
        "image": "/assets/products_hero.jpg",
        "benefit": "Amino acid important for energy production and neurotransmitter synthesis.",
        "attributes": ["Pure", "Effective"],
        "industry": "Health Supplements",
        "functions": ["Energy Production", "Brain Function"]
    },
    {
        "id": 11,
        "name": "L-Carnitine Base",
        "image": "/assets/products_hero.jpg",
        "benefit": "Supports energy metabolism and fat burning during exercise.",
        "attributes": ["Pure", "Effective", "Quality Tested"],
        "industry": "Sports Nutrition",
        "functions": ["Energy Metabolism", "Fat Oxidation"]
    },
    {
        "id": 12,
        "name": "L-Carnitine HCl",
        "image": "/assets/products_hero.jpg",
        "benefit": "Hydrochloride form of L-Carnitine with enhanced absorption.",
        "attributes": ["High Absorption", "Pure"],
        "industry": "Sports Nutrition",
        "functions": ["Fat Metabolism", "Energy Support"]
    },
    {
        "id": 13,
        "name": "L-Carnitine Fumarate",
        "image": "/assets/products_hero.jpg",
        "benefit": "L-Carnitine bound to fumaric acid for enhanced energy metabolism.",
        "attributes": ["Enhanced Formula", "Energy Support"],
        "industry": "Sports Nutrition",
        "functions": ["Energy Production", "Recovery"]
    },
    {
        "id": 14,
        "name": "L-Carnitine Tartrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Most bioavailable form of L-Carnitine for optimal absorption.",
        "attributes": ["High Bioavailability", "Premium"],
        "industry": "Sports Nutrition",
        "functions": ["Fat Metabolism", "Recovery Support"]
    },
    {
        "id": 15,
        "name": "L-Glutamic Acid",
        "image": "/assets/products_hero.jpg",
        "benefit": "Important neurotransmitter precursor and energy source.",
        "attributes": ["Pure", "Quality Tested"],
        "industry": "Health Supplements",
        "functions": ["Brain Function", "Energy Production"]
    },
    {
        "id": 16,
        "name": "L-Serine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Amino acid supporting brain health and nervous system function.",
        "attributes": ["Pure", "Neuroprotective"],
        "industry": "Health Supplements",
        "functions": ["Brain Health", "Cognitive Support"]
    },
    {
        "id": 17,
        "name": "L-Threonine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential amino acid supporting protein balance and immune function.",
        "attributes": ["Essential", "Pure"],
        "industry": "Health Supplements",
        "functions": ["Protein Synthesis", "Immune Support"]
    },
    {
        "id": 18,
        "name": "L-Tryptophan",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential amino acid and precursor to serotonin and melatonin.",
        "attributes": ["Essential", "Mood Support"],
        "industry": "Health Supplements",
        "functions": ["Sleep Quality", "Mood Enhancement"]
    },
    {
        "id": 19,
        "name": "L-Carnosine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Dipeptide with powerful antioxidant and anti-aging properties.",
        "attributes": ["Antioxidant", "Premium"],
        "industry": "Health Supplements",
        "functions": ["Antioxidant Support", "Anti-Aging"]
    },
    {
        "id": 20,
        "name": "L-Creatine Monohydrate 500 Mesh",
        "image": "/assets/products_hero.jpg",
        "benefit": "Micronized creatine for enhanced dissolution and absorption.",
        "attributes": ["Micronized", "Pure", "Proven"],
        "industry": "Sports Nutrition",
        "functions": ["Strength Enhancement", "Power Output"]
    },
    {
        "id": 21,
        "name": "L-Methionine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential sulfur-containing amino acid supporting detoxification.",
        "attributes": ["Essential", "Detox Support"],
        "industry": "Health Supplements",
        "functions": ["Detoxification", "Liver Support"]
    },
    {
        "id": 22,
        "name": "L-Leucine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential branched-chain amino acid crucial for muscle protein synthesis.",
        "attributes": ["BCAA", "Essential", "Anabolic"],
        "industry": "Sports Nutrition",
        "functions": ["Muscle Building", "Recovery"]
    },
    {
        "id": 23,
        "name": "L-Isoleucine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential BCAA supporting energy and endurance during exercise.",
        "attributes": ["BCAA", "Essential", "Energy"],
        "industry": "Sports Nutrition",
        "functions": ["Energy Production", "Endurance"]
    },
    {
        "id": 24,
        "name": "Beta Powder",
        "image": "/assets/products_hero.jpg",
        "benefit": "Specialized beta compound for various nutritional applications.",
        "attributes": ["Functional", "Quality Tested"],
        "industry": "Food Ingredients",
        "functions": ["Functional Enhancement"]
    },
    {
        "id": 25,
        "name": "Alpha Lipoic Acid",
        "image": "/assets/products_hero.jpg",
        "benefit": "Powerful antioxidant supporting glucose metabolism and nerve health.",
        "attributes": ["Antioxidant", "Neuroprotective"],
        "industry": "Health Supplements",
        "functions": ["Antioxidant Support", "Glucose Metabolism"]
    },
    {
        "id": 26,
        "name": "Beta Alanine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Enhances muscular endurance and reduces fatigue during high-intensity workouts.",
        "attributes": ["Performance Enhancer", "Endurance Support"],
        "industry": "Sports Nutrition",
        "functions": ["Endurance Enhancement", "Fatigue Reduction"]
    },
    {
        "id": 27,
        "name": "Betaine Anhydrous",
        "image": "/assets/products_hero.jpg",
        "benefit": "Supports power output, muscle endurance and cardiovascular health.",
        "attributes": ["Performance", "Heart Health"],
        "industry": "Sports Nutrition",
        "functions": ["Power Output", "Endurance"]
    },
    {
        "id": 28,
        "name": "Choline Bitartrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential nutrient supporting brain function and liver health.",
        "attributes": ["Brain Health", "Liver Support"],
        "industry": "Health Supplements",
        "functions": ["Cognitive Function", "Liver Health"]
    },
    {
        "id": 29,
        "name": "Conjugated Linoleic Acid (CLA 60%)",
        "image": "/assets/products_hero.jpg",
        "benefit": "Supports healthy body composition and fat metabolism.",
        "attributes": ["Fat Loss Support", "Body Composition"],
        "industry": "Sports Nutrition",
        "functions": ["Fat Metabolism", "Body Composition"]
    },
    {
        "id": 30,
        "name": "Creatine Nitrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Advanced creatine form combining strength benefits with pump enhancement.",
        "attributes": ["Advanced Formula", "Dual Action"],
        "industry": "Sports Nutrition",
        "functions": ["Strength", "Pump Enhancement"]
    },
    {
        "id": 31,
        "name": "Gamma Aminobutyric Acid (GABA)",
        "image": "/assets/products_hero.jpg",
        "benefit": "Natural neurotransmitter that promotes relaxation and supports restful sleep.",
        "attributes": ["Natural", "Calming", "Quality Tested"],
        "industry": "Health Supplements",
        "functions": ["Relaxation Support", "Sleep Quality"]
    },
    {
        "id": 32,
        "name": "L-Arginine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Precursor to nitric oxide supporting blood flow and cardiovascular health.",
        "attributes": ["Vasodilation", "Performance"],
        "industry": "Sports Nutrition",
        "functions": ["Blood Flow", "Performance"]
    },
    {
        "id": 33,
        "name": "Glutathione",
        "image": "/assets/products_hero.jpg",
        "benefit": "Master antioxidant supporting detoxification and immune function.",
        "attributes": ["Master Antioxidant", "Detox Support"],
        "industry": "Health Supplements",
        "functions": ["Antioxidant Support", "Detoxification"]
    },
    {
        "id": 34,
        "name": "Taurine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Amino acid supporting heart health, exercise performance and hydration.",
        "attributes": ["Heart Health", "Performance"],
        "industry": "Sports Nutrition",
        "functions": ["Cardiovascular Support", "Hydration"]
    },
    {
        "id": 35,
        "name": "Creatine HCL",
        "image": "/assets/products_hero.jpg",
        "benefit": "High solubility creatine form with reduced bloating and better absorption.",
        "attributes": ["High Solubility", "No Bloating"],
        "industry": "Sports Nutrition",
        "functions": ["Strength", "Power Output"]
    },
    {
        "id": 36,
        "name": "N-Acetyl L-Carnitine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Acetylated form of L-Carnitine crossing blood-brain barrier for cognitive support.",
        "attributes": ["Brain Health", "Enhanced Formula"],
        "industry": "Health Supplements",
        "functions": ["Cognitive Support", "Energy Metabolism"]
    },
    {
        "id": 37,
        "name": "N-Acetyl L-Cysteine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Powerful antioxidant supporting respiratory and liver health.",
        "attributes": ["Antioxidant", "Detox Support"],
        "industry": "Health Supplements",
        "functions": ["Respiratory Health", "Liver Support"]
    },
    {
        "id": 38,
        "name": "N-Acetyl L-Glutamic Acid",
        "image": "/assets/products_hero.jpg",
        "benefit": "Acetylated form supporting brain function and neurotransmitter balance.",
        "attributes": ["Brain Health", "Neuroprotective"],
        "industry": "Health Supplements",
        "functions": ["Cognitive Function", "Neurotransmitter Support"]
    },
    {
        "id": 39,
        "name": "N-Acetyl L-Glutamine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Enhanced glutamine form for improved stability and absorption.",
        "attributes": ["Enhanced Formula", "Stable"],
        "industry": "Sports Nutrition",
        "functions": ["Gut Health", "Recovery"]
    },
    {
        "id": 40,
        "name": "N-Acetyl L-Tyrosine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Highly soluble tyrosine form supporting focus and stress management.",
        "attributes": ["High Solubility", "Focus Support"],
        "industry": "Health Supplements",
        "functions": ["Mental Focus", "Stress Management"]
    },
    {
        "id": 41,
        "name": "Citric Acid Monohydrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Natural preservative and flavor enhancer widely used in food and beverages.",
        "attributes": ["Natural", "Food Grade"],
        "industry": "Food Ingredients",
        "functions": ["Preservation", "Flavor Enhancement"]
    },
    {
        "id": 42,
        "name": "Citric Acid Anhydrous",
        "image": "/assets/products_hero.jpg",
        "benefit": "Water-free citric acid for various food and beverage applications.",
        "attributes": ["Anhydrous", "Food Grade"],
        "industry": "Food Ingredients",
        "functions": ["Acidulant", "Preservation"]
    },
    {
        "id": 43,
        "name": "Di-Magnesium Sodium Citrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Mineral compound supporting hydration and electrolyte balance.",
        "attributes": ["Electrolyte", "Hydration"],
        "industry": "Sports Nutrition",
        "functions": ["Hydration", "Electrolyte Balance"]
    },
    {
        "id": 44,
        "name": "Potassium Citrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential electrolyte supporting muscle function and pH balance.",
        "attributes": ["Electrolyte", "Buffer"],
        "industry": "Sports Nutrition",
        "functions": ["Electrolyte Support", "pH Balance"]
    },
    {
        "id": 45,
        "name": "Potassium Chloride",
        "image": "/assets/products_hero.jpg",
        "benefit": "Key electrolyte mineral supporting heart and muscle function.",
        "attributes": ["Electrolyte", "Essential Mineral"],
        "industry": "Food Ingredients",
        "functions": ["Electrolyte Balance", "Muscle Function"]
    },
    {
        "id": 46,
        "name": "Magnesium Citrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Highly bioavailable magnesium supporting muscle and bone health.",
        "attributes": ["High Bioavailability", "Essential Mineral"],
        "industry": "Health Supplements",
        "functions": ["Muscle Health", "Bone Support"]
    },
    {
        "id": 47,
        "name": "Zinc Citrate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential mineral supporting immune function and wound healing.",
        "attributes": ["Immune Support", "Essential Mineral"],
        "industry": "Health Supplements",
        "functions": ["Immune Function", "Wound Healing"]
    },
    {
        "id": 48,
        "name": "Cocoa Powder",
        "image": "/assets/products_hero.jpg",
        "benefit": "Natural chocolate flavor rich in antioxidants and minerals.",
        "attributes": ["Natural", "Antioxidant-Rich", "Flavor"],
        "industry": "Food Ingredients",
        "functions": ["Flavoring", "Antioxidant Support"]
    },
    {
        "id": 49,
        "name": "Milk Powder",
        "image": "/assets/products_hero.jpg",
        "benefit": "Dried milk providing protein, calcium and creamy texture.",
        "attributes": ["Protein Source", "Calcium-Rich"],
        "industry": "Food Ingredients",
        "functions": ["Protein Fortification", "Texture Enhancement"]
    },
    {
        "id": 50,
        "name": "Sodium Bicarbonate",
        "image": "/assets/products_hero.jpg",
        "benefit": "Buffer supporting pH balance and reducing exercise-induced acidosis.",
        "attributes": ["Buffer", "Performance"],
        "industry": "Sports Nutrition",
        "functions": ["pH Balance", "Performance Enhancement"]
    },
    {
        "id": 51,
        "name": "Silicon Dioxide",
        "image": "/assets/products_hero.jpg",
        "benefit": "Anti-caking agent ensuring powder flowability and stability.",
        "attributes": ["Anti-Caking", "Flow Agent"],
        "industry": "Food Ingredients",
        "functions": ["Flow Enhancement", "Anti-Caking"]
    },
    {
        "id": 52,
        "name": "Sodium Chloride",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential electrolyte supporting hydration and nerve function.",
        "attributes": ["Electrolyte", "Essential"],
        "industry": "Food Ingredients",
        "functions": ["Electrolyte Balance", "Hydration"]
    },
    {
        "id": 53,
        "name": "Acesulfame K",
        "image": "/assets/products_hero.jpg",
        "benefit": "High-intensity sweetener with excellent heat stability.",
        "attributes": ["Zero Calorie", "Heat Stable"],
        "industry": "Sweeteners",
        "functions": ["Sweetening", "Sugar Replacement"]
    },
    {
        "id": 54,
        "name": "Aspartame",
        "image": "/assets/products_hero.jpg",
        "benefit": "Low-calorie sweetener with clean taste profile.",
        "attributes": ["Low Calorie", "Clean Taste"],
        "industry": "Sweeteners",
        "functions": ["Sweetening", "Calorie Reduction"]
    },
    {
        "id": 55,
        "name": "Sucralose",
        "image": "/assets/products_hero.jpg",
        "benefit": "Zero-calorie sweetener ideal for low-sugar and diet formulations.",
        "attributes": ["Zero Calorie", "High Sweetness", "Stable"],
        "industry": "Sweeteners",
        "functions": ["Sweetening", "Sugar Replacement"]
    },
    {
        "id": 56,
        "name": "Xylitol",
        "image": "/assets/products_hero.jpg",
        "benefit": "Natural sugar alcohol with dental health benefits.",
        "attributes": ["Natural", "Dental Health", "Low Glycemic"],
        "industry": "Sweeteners",
        "functions": ["Sweetening", "Dental Health Support"]
    },
    {
        "id": 57,
        "name": "Panax Ginseng Extract Grape Seed Extract",
        "image": "/assets/products_hero.jpg",
        "benefit": "Adaptogenic herb supporting energy, focus, and stress management.",
        "attributes": ["Adaptogenic", "Natural", "Premium Quality"],
        "industry": "Herbal Extracts",
        "functions": ["Energy Support", "Stress Management"]
    },
    {
        "id": 58,
        "name": "Olive Leaf Extract (Green) 20%",
        "image": "/assets/products_hero.jpg",
        "benefit": "Antioxidant-rich extract supporting cardiovascular and immune health.",
        "attributes": ["Antioxidant", "Heart Health"],
        "industry": "Herbal Extracts",
        "functions": ["Antioxidant Support", "Immune Function"]
    },
    {
        "id": 59,
        "name": "Goji Bioba Extract",
        "image": "/assets/products_hero.jpg",
        "benefit": "Superfruit extract rich in antioxidants and vitamins.",
        "attributes": ["Superfruit", "Antioxidant-Rich"],
        "industry": "Herbal Extracts",
        "functions": ["Antioxidant Support", "Vitality"]
    },
    {
        "id": 60,
        "name": "Green Tea Extract",
        "image": "/assets/products_hero.jpg",
        "benefit": "Rich in antioxidants and supports metabolism and overall wellness.",
        "attributes": ["Organic", "Antioxidant-Rich", "Natural"],
        "industry": "Herbal Extracts",
        "functions": ["Antioxidant Support", "Metabolism Boost"]
    },
    {
        "id": 61,
        "name": "Whey Protein Concentrate 80%",
        "image": "/assets/products_hero.jpg",
        "benefit": "High-quality protein with balanced amino acid profile.",
        "attributes": ["High Protein", "Complete Amino Acids"],
        "industry": "Protein",
        "functions": ["Muscle Building", "Recovery"]
    },
    {
        "id": 62,
        "name": "Coffee Bean Extract",
        "image": "/assets/products_hero.jpg",
        "benefit": "Natural source of caffeine and antioxidants for energy and focus.",
        "attributes": ["Natural Caffeine", "Antioxidant"],
        "industry": "Herbal Extracts",
        "functions": ["Energy Boost", "Mental Focus"]
    },
    {
        "id": 63,
        "name": "Pea Protein (Vegan)",
        "image": "/assets/products_hero.jpg",
        "benefit": "High-quality plant-based protein with excellent solubility and clean flavor.",
        "attributes": ["Vegan", "Non-GMO", "Gluten-Free"],
        "industry": "Protein",
        "functions": ["Protein Fortification", "Muscle Building"]
    },
    {
        "id": 64,
        "name": "Soy Protein Isolate 90%",
        "image": "/assets/products_hero.jpg",
        "benefit": "Complete plant protein with all essential amino acids.",
        "attributes": ["Vegan", "Complete Protein", "High Purity"],
        "industry": "Protein",
        "functions": ["Protein Fortification", "Muscle Support"]
    },
    {
        "id": 65,
        "name": "Whey Protein Isolate 90%",
        "image": "/assets/products_hero.jpg",
        "benefit": "Premium quality whey protein for rapid absorption and muscle building.",
        "attributes": ["High Protein", "Low Fat", "Fast Absorption"],
        "industry": "Protein",
        "functions": ["Muscle Building", "Post-Workout Recovery"]
    },
    {
        "id": 66,
        "name": "DL Methionine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Synthetic form of methionine for various nutritional applications.",
        "attributes": ["Synthetic", "Stable"],
        "industry": "Food Ingredients",
        "functions": ["Amino Acid Supplementation"]
    },
    {
        "id": 67,
        "name": "L-Cysteine Base",
        "image": "/assets/products_hero.jpg",
        "benefit": "Sulfur-containing amino acid supporting antioxidant production.",
        "attributes": ["Antioxidant Precursor", "Pure"],
        "industry": "Health Supplements",
        "functions": ["Antioxidant Support", "Detoxification"]
    },
    {
        "id": 68,
        "name": "L-Cystine",
        "image": "/assets/products_hero.jpg",
        "benefit": "Dimeric form of cysteine supporting protein structure and hair health.",
        "attributes": ["Structural", "Hair Health"],
        "industry": "Health Supplements",
        "functions": ["Protein Synthesis", "Hair Support"]
    },
    {
        "id": 69,
        "name": "L-Cysteine HCl",
        "image": "/assets/products_hero.jpg",
        "benefit": "Hydrochloride form of cysteine with enhanced stability.",
        "attributes": ["Stable", "Pure"],
        "industry": "Health Supplements",
        "functions": ["Antioxidant Support", "Protein Synthesis"]
    },
    {
        "id": 70,
        "name": "L-Norvaline",
        "image": "/assets/products_hero.jpg",
        "benefit": "Amino acid supporting nitric oxide production and blood flow.",
        "attributes": ["Pump Support", "Performance"],
        "industry": "Sports Nutrition",
        "functions": ["Nitric Oxide Support", "Blood Flow"]
    },
    {
        "id": 71,
        "name": "L-Lysine HCl",
        "image": "/assets/products_hero.jpg",
        "benefit": "Essential amino acid supporting collagen formation and immune function.",
        "attributes": ["Essential", "Immune Support"],
        "industry": "Health Supplements",
        "functions": ["Collagen Synthesis", "Immune Function"]
    }
]
        
        result = await db.products.insert_many(products)
        return {"message": "Products seeded successfully", "count": len(result.inserted_ids)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))