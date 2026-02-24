"use client";

import React, { useState } from 'react';

export default function MustafaZekaPaneli() {
  const [metin, setMetin] = useState('');
  const [sonuc, setSonuc] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  // Vercel'deki anahtarı çeker
  const ANAHTAR = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const analizEt = async () => {
    if (!metin) return alert("Lütfen bir metin girin!");
    
    setYukleniyor(true);
    setSonuc(null);

    try {
      // Google API'sine anahtarı URL üzerinden gönderiyoruz
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ANAHTAR}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Aşağıdaki metni analiz et ve sadece 'Olumlu' veya 'Olumsuz' diye cevap ver: ${metin}` }] }]
        })
      });

      const data = await response.json();
      
      // Gelen cevabı ekrana yazdırıyoruz
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setSonuc(data.candidates[0].content.parts[0].text);
      } else {
        setSonuc("Cevap alınamadı, anahtarını kontrol et!");
      }
    } catch (error) {
      setSonuc("Bir hata oluştu. Bağlantıyı kontrol et!");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#3b82f6' }}>Mustafa'nın Dahi Analiz Paneli</h1>
      <p>Gerçek Yapay Zeka Beyni Aktif 🚀</p>

      <textarea 
        value={metin}
        onChange={(e) => setMetin(e.target.value)}
        placeholder="Buraya bir şeyler yaz..."
        style={{ width: '80%', height: '150px', borderRadius: '15px', padding: '15px', backgroundColor: '#111', color: '#fff', border: '2px solid #3b82f6' }}
      />

      <br />

      <button 
        onClick={analizEt}
        disabled={yukleniyor}
        style={{ marginTop: '20px', padding: '15px 40px', borderRadius: '10px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {yukleniyor ? 'Analiz Ediliyor...' : 'Gerçek Zeka Analizi'}
      </button>

      {sonuc && (
        <div style={{ marginTop: '30px', padding: '20px', borderRadius: '15px', border: '2px dashed #3b82f6', fontSize: '24px' }}>
          {sonuc}
        </div>
      )}
    </div>
  );
}
