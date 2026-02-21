from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model dosyalarını yükle (Masaüstünde olduklarından emin ol)
try:
    model = joblib.load('sentiment_model.pkl')
    vectorizer = joblib.load('vectorizer.pkl')
except:
    print("HATA: .pkl dosyaları bulunamadı!")

class AnalizIstegi(BaseModel):
    text: str

@app.post("/tahmin")
async def tahmin_et(istek: AnalizIstegi):
    text_vec = vectorizer.transform([istek.text])
    prediction = model.predict(text_vec)[0]
    return {"sonuc": "Olumlu" if prediction == "positive" else "Olumsuz"}