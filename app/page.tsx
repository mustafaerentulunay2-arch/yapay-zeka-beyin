"use client";

import React, { useState } from 'react';

export default function MustafaZekaPaneli() {
  const [metin, setMetin] = useState('');
  const [sonuc, setSonuc] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  // NOT: Eğer gerçek bir Gemini anahtarın yoksa şimdilik burayı boş bırakabilirsin.
  // Ama gerçek zeka istiyorsan tırnak içine o uzun kodu yapıştır.
  const ANAHTAR = "AIzaSyCsecfq02D1uD-6o6y-w9EnZvAgdi8X1uQ";

  const analizEt = async () => {
    if (!metin) return alert("Lütfen bir metin girin!");
    setYukleniyor(true);
    setSonuc(null);

    try {
      // Bu kod direkt Google'ın en hızlı yapay zekasına bağlanır
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ANAHTAR}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Bu metnin duygusunu analiz et ve sadece 'Olumlu', 'Olumsuz' veya 'Nötr' yaz. Yanına bir de emoji ekle: ${metin}` }] }]
        })
      });

      const data = await response.json();
      
      // Yapay zekadan gelen cevabı ekrana yazar
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setSonuc(data.candidates[0].content.parts[0].text);
      } else {
        setSonuc("Anahtar hatası veya kota doldu!");
      }
    } catch (hata) {
      setSonuc("Bağlantı hatası: Lütfen anahtarını kontrol et!");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#3b82f6', fontSize: '32px', fontWeight: 'bold' }}>Mustafa'nın Dahi Analiz Paneli</h1>
      <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Gerçek Yapay Zeka (Gemini 1.5) ile donatıldı.</p>

      <textarea 
        value={metin} 
        onChange={(e) => setMetin(e.target.value)}
        placeholder="Cümleni buraya yaz, duygusunu ben anlayayım..."
        style={{ width: '100%', maxWidth: '600px', height: '150px', padding: '20px', borderRadius: '15px', fontSize: '18px', border: '2px solid #3b82f6', backgroundColor: '#1a1a1a', color: 'white', outline: 'none' }}
      />
      <br />
      <button 
        onClick={analizEt}
        disabled={yukleniyor}
        style={{ marginTop: '20px', padding: '15px 50px', backgroundColor: yukleniyor ? '#4b5563' : '#2563eb', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '20px', transition: '0.3s' }}
      >
        {yukleniyor ? 'Düşünüyor...' : 'Gerçek Zeka Analizi'}
      </button>

      {sonuc && (
        <div style={{ marginTop: '40px', padding: '30px', border: '3px solid #2563eb', borderRadius: '20px', backgroundColor: '#111827', display: 'inline-block', minWidth: '350px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#9ca3af', textTransform: 'uppercase' }}>Analiz Sonucu:</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#ffffff' }}>{sonuc}</p>
        </div>
      )}
    </div>
  );
}
