"use client";

import React, { useState } from 'react';

export default function AkilliAnalizPaneli() {
  const [metin, setMetin] = useState('');
  const [sonuc, setSonuc] = useState<string | null>(null);

  const analizEt = () => {
    if (!metin) return alert("Lütfen bir metin girin!");

    // BURASI ARTIK AKILLI: Kelimeleri kontrol ediyor
    const kucukMetin = metin.toLowerCase();
    const olumsuzKelimeler = ['kötü', 'berbat', 'hayır', 'olmaz', 'mutsuz', 'nefret', 'çirkin', 'başarısız'];
    const olumluKelimeler = ['iyi', 'güzel', 'evet', 'harika', 'mutlu', 'seviyorum', 'başarılı', 'muazzam'];

    let analizSonucu = "Nötr (Duygu anlaşılamadı)";

    // Olumsuzluk kontrolü
    if (olumsuzKelimeler.some(kelime => kucukMetin.includes(kelime))) {
      analizSonucu = "Olumsuz 🔴";
    } 
    // Olumluluk kontrolü
    else if (olumluKelimeler.some(kelime => kucukMetin.includes(kelime))) {
      analizSonucu = "Olumlu 🟢";
    }

    setSonuc(analizSonucu);
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#3b82f6' }}>Mustafa'nın Akıllı Analiz Paneli</h1>
      <p style={{ marginBottom: '20px', color: '#9ca3af' }}>Yazdığınız kelimelerin duygusunu analiz ederim.</p>
      
      <textarea 
        value={metin} 
        onChange={(e) => setMetin(e.target.value)}
        placeholder="Örn: Bu yemek çok kötü veya Bugün harika bir gün..."
        style={{ width: '100%', maxWidth: '600px', height: '150px', padding: '15px', color: 'black', borderRadius: '12px', fontSize: '16px', border: 'none' }}
      />
      
      <br />
      
      <button 
        onClick={analizEt}
        style={{ marginTop: '20px', padding: '15px 40px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', transition: '0.3s' }}
      >
        Duyguyu Analiz Et
      </button>

      {sonuc && (
        <div style={{ marginTop: '40px', padding: '25px', border: '2px solid #3b82f6', borderRadius: '15px', backgroundColor: '#111827', display: 'inline-block', minWidth: '300px' }}>
          <h2 style={{ margin: '0', fontSize: '20px' }}>Analiz Sonucu:</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px', color: sonuc.includes('Olumlu') ? '#10b981' : (sonuc.includes('Olumsuz') ? '#ef4444' : '#f59e0b') }}>
            {sonuc}
          </p>
        </div>
      )}
    </div>
  );
}
