import { Track, Quote } from '../types';

export const PLAYLIST_TITLE = 'देशभक्ति के अमर सुर (Patriotic Music Collection)';
export const YOUTUBE_VIDEO_ID = 'PL0Z67tlyTaWo-c_QyUnhsoa4cUwceCmRu';
export const YOUTUBE_URL = 'https://www.youtube.com/watch?v=wF_B_aagLfI&list=PL0Z67tlyTaWo-c_QyUnhsoa4cUwceCmRu';

// Helper to extract YouTube Video ID from any valid YouTube URL format
export function extractYoutubeVideoId(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  // Standard video ID check (11 characters alphanumeric + _ -)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);
  return match && match[1] ? match[1] : '';
}

export function getTrackVideoId(track: Track): string {
  if (!track) return 'PL0Z67tlyTaWo-c_QyUnhsoa4cUwceCmRu';
  if (track.youtubeUrl) {
    const extracted = extractYoutubeVideoId(track.youtubeUrl);
    if (extracted) return extracted;
  }
  return track.youtubeVideoId || 'PL0Z67tlyTaWo-c_QyUnhsoa4cUwceCmRu';
}

// Each track with its official YouTube Video ID & YouTube URL matching user specifications
export const PATRIOTIC_TRACKS: Track[] = [
  {
    id: 1,
    title: 'ऐ मेरे वतन के लोगों',
    titleEn: 'Aye Mere Watan Ke Logo',
    movieOrArtist: 'Lata Mangeshkar • C. Ramchandra',
    originalSinger: 'स्वरकोकिला लता मंगेशकर',
    youtubeVideoId: '8S30u7XtFbZrJi4e',
    youtubeUrl: 'https://youtu.be/Wvr8sX5-T_8?si=8S30u7XtFbZrJi4e',
    duration: 385,
    highlightLyrics: 'जो शहीद हुए हैं उनकी ज़रा याद करो कुर्बानी...',
    lyricsMeaning: 'Remember the supreme sacrifices made by our brave soldiers.',
    category: 'emotional'
  },
  {
    id: 2,
    title: 'कर चले हम फ़िदा',
    titleEn: 'Kar Chale Hum Fida',
    movieOrArtist: 'Haqeeqat (1964) • Mohammed Rafi',
    originalSinger: 'मोहम्मद रफ़ी • कैफ़ी आज़मी',
    youtubeVideoId: 'bq13L7pacBhMlNG-',
    youtubeUrl: 'https://youtu.be/shctdsYL0SA?si=bq13L7pacBhMlNG-',
    duration: 320,
    highlightLyrics: 'कर चले हम फ़िदा जान-ओ-तन साथियों, अब तुम्हारे हवाले वतन साथियों...',
    lyricsMeaning: 'We sacrifice our lives for the motherland, now it is in your hands.',
    category: 'emotional'
  },
  {
    id: 3,
    title: 'तेरी मिट्टी',
    titleEn: 'Teri Mitti',
    movieOrArtist: 'Kesari (2019) • B Praak',
    originalSinger: 'बी प्राक • मनोज मुंतशिर',
    youtubeVideoId: 'tionpZAVPd4',
    youtubeUrl: 'https://youtu.be/tionpZAVPd4?si=AWoFtEN0BS1dBug5',
    duration: 315,
    highlightLyrics: 'ओ माई मेरी क्या फ़िक्र तुझे, क्यों आँख से दरिया बहता है...',
    lyricsMeaning: 'O Mother India, have no fear, your sons protect your soil.',
    category: 'anthem'
  },
  {
    id: 4,
    title: 'माँ तुझे सलाम (वंदे मातरम्)',
    titleEn: 'Maa Tujhe Salaam',
    movieOrArtist: 'Vande Mataram • A.R. Rahman',
    originalSinger: 'ए. आर. रहमान',
    youtubeVideoId: 'jDn2bn7_YSM',
    youtubeUrl: 'https://youtu.be/jDn2bn7_YSM?si=OK-dfafthDcEwCgJ',
    duration: 360,
    highlightLyrics: 'यहाँ-वहाँ सारा जहाँ देख लिया, अब तक भी तेरे जैसा कोई नहीं...',
    lyricsMeaning: 'Salutations to Mother India, there is none like you in the world.',
    category: 'anthem'
  },
  {
    id: 5,
    title: 'संदेशे आते हैं',
    titleEn: 'Sandese Aate Hain',
    movieOrArtist: 'Border (1997) • Sonu Nigam & Roop Kumar Rathod',
    originalSinger: 'सोनू निगम व रूप कुमार राठौड़',
    youtubeVideoId: 'yccGxvIydKg',
    youtubeUrl: 'https://youtu.be/yccGxvIydKg?si=P2mYWNu6kNt8RLT0',
    duration: 430,
    highlightLyrics: 'संदेशे आते हैं, हमें तड़पाते हैं, जो चिट्ठी आती है, वो पूछे जाती है...',
    lyricsMeaning: 'Letters from home remind our soldiers of family and homeland.',
    category: 'emotional'
  },
  {
    id: 6,
    title: 'मेरा रंग दे बसंती चोला',
    titleEn: 'Mera Rang De Basanti Chola',
    movieOrArtist: 'The Legend of Bhagat Singh / Shaheed',
    originalSinger: 'मुकेश, महेंद्र कपूर / उदित नारायण',
    youtubeVideoId: 'esV069YrVh4',
    youtubeUrl: 'https://youtu.be/esV069YrVh4?si=Kd_3I-gd0bfGCJX0',
    duration: 290,
    highlightLyrics: 'दम निकले इस देश की खातिर बस इतना अरमान है...',
    lyricsMeaning: 'Dye my cloak saffron with the passion of freedom.',
    category: 'energetic'
  },
  {
    id: 7,
    title: 'ये देश है वीर जवानों का',
    titleEn: 'Yeh Desh Hai Veer Jawanon Ka',
    movieOrArtist: 'Naya Daur (1957) • Mohammed Rafi & Balbir',
    originalSinger: 'मोहम्मद रफ़ी व साथी',
    youtubeVideoId: 'yRKE_4xwfag',
    youtubeUrl: 'https://youtu.be/yRKE_4xwfag?si=tQUW9LTALAkgzoXH',
    duration: 280,
    highlightLyrics: 'ये देश है वीर जवानों का, अलबेलों का, मस्तानों का...',
    lyricsMeaning: 'This is the land of brave soldiers, unity, and joyful spirit.',
    category: 'energetic'
  },
  {
    id: 8,
    title: 'भारत हमको जान से प्यारा है',
    titleEn: 'Bharat Humko Jaan Se Pyara Hai',
    movieOrArtist: 'Roja (1992) • Hariharan',
    originalSinger: 'हरिहरन • ए. आर. रहमान',
    youtubeVideoId: '7q5DUIgLs_4',
    youtubeUrl: 'https://youtu.be/7q5DUIgLs_4?si=USpEegLqn8IjxwxE',
    duration: 310,
    highlightLyrics: 'उजड़े नहीं अपना चमन, टूटे नहीं अपना वतन...',
    lyricsMeaning: 'India is dearer to us than our own lives.',
    category: 'timeless'
  },
  {
    id: 9,
    title: 'कंधों से मिलते हैं कंधे',
    titleEn: 'Kandhon Se Milte Hain Kandhe',
    movieOrArtist: 'Lakshya (2004) • Shankar Mahadevan & Chorus',
    originalSinger: 'शंकर महादेवन, सोनू निगम, हरिहरन',
    youtubeVideoId: 'FGjQIHVUECk',
    youtubeUrl: 'https://youtu.be/FGjQIHVUECk?si=sSggCu71SrgDopNR',
    duration: 340,
    highlightLyrics: 'कंधों से मिलते हैं कंधे, कदमों से कदम मिलते हैं...',
    lyricsMeaning: 'Marching shoulder to shoulder in defense of our borders.',
    category: 'energetic'
  },
  {
    id: 10,
    title: 'चक दे इंडिया',
    titleEn: 'Chak De India',
    movieOrArtist: 'Chak De! India (2007) • Sukhwinder Singh',
    originalSinger: 'सुखविंदर सिंह • सलीम-सुलेमान',
    youtubeVideoId: 'bnqLzCsffwY',
    youtubeUrl: 'https://youtu.be/bnqLzCsffwY?si=3LwWsfNVEK0uQlgc',
    duration: 275,
    highlightLyrics: 'कुछ करिए, कुछ करिए नस-नस मेरी खोले, कुछ करिए...',
    lyricsMeaning: 'Rise up and make the nation proud on the world stage.',
    category: 'energetic'
  },
  {
    id: 11,
    title: 'मेरे देश की धरती',
    titleEn: 'Mere Desh Ki Dharti',
    movieOrArtist: 'Upkar (1967) • Mahendra Kapoor',
    originalSinger: 'महेंद्र कपूर • कल्याणजी-आनंदजी',
    youtubeVideoId: 'p2nexm8TmUp5o2Uf',
    youtubeUrl: 'https://youtu.be/F5GPstAAuSM?si=p2nexm8TmUp5o2Uf',
    duration: 360,
    highlightLyrics: 'मेरे देश की धरती सोना उगले, उगले हीरे मोती...',
    lyricsMeaning: 'The fertile soil of my country yields gold, diamonds, and pearls.',
    category: 'timeless'
  },
  {
    id: 12,
    title: 'है प्रीत जहाँ की रीत सदा',
    titleEn: 'Hai Preet Jahan Ki Reet Sada',
    movieOrArtist: 'Purab Aur Paschim (1970) • Mahendra Kapoor',
    originalSinger: 'महेंद्र कपूर',
    youtubeVideoId: 'w8sgPjtqb_e2R97t',
    youtubeUrl: 'https://youtu.be/oMcPeh_O9s4?si=w8sgPjtqb_e2R97t',
    duration: 320,
    highlightLyrics: 'भारत का रहने वाला हूँ, भारत की बात सुनाता हूँ...',
    lyricsMeaning: 'I belong to India, where love and peace are eternal traditions.',
    category: 'timeless'
  },
  {
    id: 13,
    title: 'ऐ वतन मेरे वतन (राज़ी)',
    titleEn: 'Ae Watan (Raazi)',
    movieOrArtist: 'Raazi (2018) • Arijit Singh',
    originalSinger: 'अरिजीत सिंह • गुलज़ार',
    youtubeVideoId: 'Wvr8sX5-T_8',
    youtubeUrl: 'https://youtu.be/Wvr8sX5-T_8?si=ik-0Nr4IqL9j9hHa',
    duration: 225,
    highlightLyrics: 'ऐ वतन, वतन मेरे, आबाद रहे तू, मैं जहाँ रहूँ जहाँ में याद रहे तू...',
    lyricsMeaning: 'O my beloved homeland, may you always prosper and thrive.',
    category: 'anthem'
  },
  {
    id: 14,
    title: 'जन गण मन (राष्ट्रगान)',
    titleEn: 'Jana Gana Mana (National Anthem)',
    movieOrArtist: 'National Anthem of India • Rabindranath Tagore',
    originalSinger: 'राष्ट्रगान • सामूहिक स्वर',
    youtubeVideoId: 'HtMF973tXIY',
    youtubeUrl: 'https://youtu.be/HtMF973tXIY?si=rgdFo5-EeVMDuc0F',
    duration: 52,
    highlightLyrics: 'जन गण मन अधिनायक जय हे, भारत भाग्य विधाता...',
    lyricsMeaning: 'Thou art the ruler of the minds of all people, dispenser of India’s destiny.',
    category: 'anthem'
  },
  {
    id: 15,
    title: 'तिरंगा (योद्धा) • Tiranga',
    titleEn: 'YODHA: Tiranga',
    movieOrArtist: 'Yodha (2024) • Sidharth Malhotra, Raashii Khanna',
    originalSinger: 'बी प्राक • तनिष्क बागची • मनोज मुंतशिर',
    youtubeVideoId: 'cOdvYPc890P24bKx',
    youtubeUrl: 'https://youtu.be/l71aOtTJ1gE?si=cOdvYPc890P24bKx',
    duration: 260,
    highlightLyrics: 'तेरा हिमालय आकाश छू ले, बहती रहे तेरी गंगा',
    lyricsMeaning: 'May I merge into your soil and bloom like a flower; let the Tricolor soar high.',
    category: 'anthem'
  },
  {
    id: 16,
    title: 'लहरा दो (83) • Lehra Do',
    titleEn: 'Lehra Do - 83',
    movieOrArtist: '83 (2021) • Ranveer Singh, Kabir Khan',
    originalSinger: 'अरिजीत सिंह • प्रीतम • कौसर मुनीर',
    youtubeVideoId: 'd0iw4rhLMFKiqpYk',
    youtubeUrl: 'https://youtu.be/diT_XLLJiF8?si=d0iw4rhLMFKiqpYk',
    duration: 215,
    highlightLyrics: 'लहरा दो, लहरा दो, सरकशी का परचम लहरा दो...',
    lyricsMeaning: 'Wave the Tricolor high with pride, let the flag of determination fly.',
    category: 'energetic'
  },
  {
    id: 17,
    title: 'माये (स्काई फोर्स) • Maaye',
    titleEn: 'Maaye - Sky Force',
    movieOrArtist: 'Sky Force (2025) • Akshay Kumar, Veer P, Sara Ali Khan, Nimrat Kaur',
    originalSinger: 'बी प्राक • तनिष्क बागची • मनोज मुंतशिर',
    youtubeVideoId: 'TPpuw7MAC56346qc',
    youtubeUrl: 'https://youtu.be/y_ts4eyU9c4?si=TPpuw7MAC56346qc',
    duration: 270,
    highlightLyrics: 'माये तेरी मिट्टी पे निसार मेरी जान... तिरंगा कफ़न मेरा बने!',
    lyricsMeaning: 'O Mother, my life is devoted to your soil, proud to serve the nation.',
    category: 'emotional'
  },
  {
    id: 18,
    title: 'देश पहले (मैं अटल हूँ) • Desh Pehle',
    titleEn: 'Desh Pehle - Main ATAL Hoon',
    movieOrArtist: 'Main ATAL Hoon (2024) • Pankaj Tripathi • Vinod B, Ravi J',
    originalSinger: 'जुबिन नौटियाल, पायल देव • मनोज मुंतशिर',
    youtubeVideoId: '5jb-pJZIoNJoaAwa',
    youtubeUrl: 'https://youtu.be/01KY8yDlCBc?si=5jb-pJZIoNJoaAwa',
    duration: 250,
    highlightLyrics: 'देश पहले, धर्म पहले, ये वतन है जान से पहले...',
    lyricsMeaning: 'Nation comes first, the motherland is above everything.',
    category: 'anthem'
  },
  {
    id: 19,
    title: 'सारे जहाँ से अच्छा • Saare Jahan Se Acchha',
    titleEn: 'Saare Jahan Se Acchha',
    movieOrArtist: 'Classic Anthem • Allama Iqbal / Lata Mangeshkar',
    originalSinger: 'लता मंगेशकर • पंडित रविशंकर',
    youtubeVideoId: 'Z_rQhdPEJYxLD3KL',
    youtubeUrl: 'https://youtu.be/5ahXODbIPxc?si=Z_rQhdPEJYxLD3KL',
    duration: 310,
    highlightLyrics: 'सारे जहाँ से अच्छा हिन्दोसिताँ हमारा, हम बुलबुलें हैं इसकी ये गुलसिताँ हमारा...',
    lyricsMeaning: 'Better than the entire world is our India; we are its nightingales and this is our garden.',
    category: 'timeless'
  },
  {
    id: 20,
    title: 'बढ़ते चलो (सैम बहादुर) • Badhte Chalo',
    titleEn: 'Badhte Chalo - Sam Bahadur',
    movieOrArtist: 'Sam Bahadur (2023) • Vicky Kaushal & Fatima S • SEL',
    originalSinger: 'शंकर महादेवन, विशाल ददलानी, दिव्या कुमार • गुलज़ार',
    youtubeVideoId: 'WyKlPGSt66TtjLyT',
    youtubeUrl: 'https://youtu.be/pM2K5UNN6CE?si=WyKlPGSt66TtjLyT',
    duration: 245,
    highlightLyrics: 'सरहद पे चलें, सरहद पे हमें आवाज़ लगानी है... माथे पे तिलक जय हिंद लगा!',
    lyricsMeaning: 'March ahead to the borders with the tilak of Jai Hind upon our brows.',
    category: 'energetic'
  },
  {
    id: 21,
    title: 'पलटन (शीर्षक गीत) • Paltan Title Track',
    titleEn: 'Paltan - Title Track',
    movieOrArtist: 'Paltan (2018) • Jackie Shroff, Arjun Rampal, Sonu Sood • J P Dutta',
    originalSinger: 'दिव्य कुमार, इरफ़ान, आदर्श • अनु मलिक • जावेद अख्तर',
    youtubeVideoId: 'THNVsJhqfDqu3qzo',
    youtubeUrl: 'https://youtu.be/g3fnG1LSRBQ?si=THNVsJhqfDqu3qzo',
    duration: 350,
    highlightLyrics: 'पलटन के सिपाही हैं हम, सरहद के निगहबान हैं हम... भारत माँ की शान हैं हम!',
    lyricsMeaning: 'We are the soldiers of the battalion, guardians of India’s borders.',
    category: 'energetic'
  },
  {
    id: 22,
    title: 'सौगंध मुझे इस मिट्टी की • Saugandh Mujhe Iss Mitti Ki',
    titleEn: 'Saugandh Mujhe Iss Mitti Ki (PM Narendra Modi)',
    movieOrArtist: 'PM Narendra Modi (2019) • Vivek Oberoi',
    originalSinger: 'सुखविंदर सिंह, शशि सुमन • प्रसून जोशी',
    youtubeVideoId: 'qb1c5cnp8ZY5gwVo',
    youtubeUrl: 'https://youtu.be/TNluTc0OAGg?si=qb1c5cnp8ZY5gwVo',
    duration: 230,
    highlightLyrics: 'सौगंध मुझे इस मिट्टी की, मैं देश नहीं झुकने दूंगा, मैं देश नहीं मिटने दूंगा!',
    lyricsMeaning: 'I swear by this sacred soil, I will never let my nation bow or falter.',
    category: 'energetic'
  },
  {
    id: 23,
    title: 'मिट्टी (फाइटर) • Mitti (FIGHTER)',
    titleEn: 'FIGHTER: Mitti',
    movieOrArtist: 'Fighter (2024) • Hrithik Roshan, Deepika Padukone, Anil Kapoor',
    originalSinger: 'विशाल-शेखर (Vishal-Sheykhar) • कुमार',
    youtubeVideoId: 'bTRnfBNtifrGvmDA',
    youtubeUrl: 'https://youtu.be/9QvzrledPxg?si=bTRnfBNtifrGvmDA',
    duration: 210,
    highlightLyrics: 'तुझपे लुटा देंगे जान अपनी, ऐ मिट्टी हम तेरे हैं... आसमान में गूँजेगा नाम हमारा!',
    lyricsMeaning: 'We dedicate our lives to our sacred motherland, our names echoing in the skies.',
    category: 'emotional'
  },
  {
    id: 24,
    title: 'छल्ला (मैं लड़ जाणा) • Challa (URI)',
    titleEn: 'Challa (Main Lad Jaana) - URI',
    movieOrArtist: 'URI: The Surgical Strike (2019) • Vicky Kaushal, Yami Gautam',
    originalSinger: 'शाश्वत सचदेव, रोमी, विवेक हरिहरन',
    youtubeVideoId: 'c-s-H36h5OlWsBAe',
    youtubeUrl: 'https://youtu.be/g62J-8nV5FI?si=c-s-H36h5OlWsBAe',
    duration: 205,
    highlightLyrics: 'मैं लड़ जाणा, मैं लड़ जाणा... इक वार नहीं सौ वार सही, देश के लिए जान लड़ा दूँगा!',
    lyricsMeaning: 'I will fight a hundred times over with unwavering valour for my motherland.',
    category: 'energetic'
  }
];

export const PATRIOTIC_QUOTES: Quote[] = [
  {
    id: 1,
    textHindi: 'देश सिर्फ मिट्टी नहीं, हमारी पहचान है।',
    authorOrContext: 'मातृभूमि का नमन',
    tag: 'राष्ट्र गौरव'
  },
  {
    id: 2,
    textHindi: 'वतन से खूबसूरत कोई एहसास नहीं।',
    authorOrContext: 'अमर देशभक्ति भावना',
    tag: 'वतन प्रेम'
  },
  {
    id: 3,
    textHindi: 'तिरंगा हमारी आन, बान और शान है।',
    authorOrContext: 'राष्ट्रीय ध्वज सम्मान',
    tag: 'तिरंगा'
  },
  {
    id: 4,
    textHindi: 'जहाँ देशभक्ति हो, वहाँ दिल खुद गुनगुनाता है।',
    authorOrContext: 'संगीत और राष्ट्र',
    tag: 'सुर वतन के'
  },
  {
    id: 5,
    textHindi: 'भारत मेरा देश है, भारत मेरी पहचान है।',
    authorOrContext: 'सदाबहार राष्ट्र संकल्प',
    tag: 'हमारा भारत'
  },
  {
    id: 6,
    textHindi: 'सरफ़रोशी की तमन्ना अब हमारे दिल में है, देखना है ज़ोर कितना बाज़ू-ए-क़ातिल में है।',
    authorOrContext: 'राम प्रसाद बिस्मिल',
    tag: 'अमर क्रांति'
  },
  {
    id: 7,
    textHindi: 'कुछ नशा तिरंगे की आन का है, कुछ नशा मातृभूमि की शान का है!',
    authorOrContext: 'युवा भारत की पुकार',
    tag: 'अखंड भारत'
  },
  {
    id: 8,
    textHindi: 'सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः।',
    authorOrContext: 'मुण्डकोपनिषद् • राष्ट्रीय आदर्श वाक्य',
    tag: 'सत्यमेव जयते'
  }
];
