"use client";

import React, { useState } from 'react';

export default function MustafaZekaPaneli() {
  const [metin, setMetin] = useState('');
  const [sonuc, setSonuc] = useState<string | null>(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  // Sadece bu satır kalmalı, Vercel kasasına bağlanır
  const ANAHTAR = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const analizEt = async () => {
    if (!metin) return alert("Lütfen bir metin girin!");
    setYukleniyor(true);
    setSonuc(null);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ANAHTAR}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Bu metnin duygusunu analiz et ve sadece 'Olumlu', 'Olumsuz' veya 'Nötr' yaz. Yanına bir de emoji ekle: ${metin}` }] }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setSonuc(data.candidates[0].content.parts[0].text);
      } else {
        setSonuc("Cevap alınamadı, anahtarını kontrol et!");
      }
    } catch (hata) {
      setSonuc("Yapay zeka şu an meşgul!");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#3b82f6', fontSize: '32px', fontWeight: 'bold' }}>Mustafa'nın Dahi Analiz Paneli</h1>
      <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Gerçek Yapay Zeka Beyni Aktif 🚀</p>

      <textarea 
        value={metin} 
        onChange={(e) => setMetin(e.target.value)}
        placeholder="Bir şeyler yaz..."
        style={{ width: '100%', maxWidth: '600px', height: '150px', padding: '20px', borderRadius: '15px', border: '2px solid #3b82f6', backgroundColor: '#1a1a1a', color: 'white' }}
      />
      <br />
      <button 
        onClick={analizEt}
        disabled={yukleniyor}
        style={{ marginTop: '20px', padding: '15px 50px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {yukleniyor ? 'Düşünüyor...' : 'Gerçek Zeka Analizi'}
      </button>

      {sonuc && (
        <div style={{ marginTop: '40px', padding: '30px', border: '3px solid #2563eb', borderRadius: '20px', backgroundColor: '#111827' }}>
          <p style={{ fontSize: '30px', fontWeight: 'bold' }}>{sonuc}</p>
        </div>
      )}
    </div>
  );
}
