import React, { useState, useEffect, useRef } from 'react';
import { Gift, Music, VolumeX } from 'lucide-react';

import photo1 from "./assets/photos/photo1.jpg";
import photo2 from "./assets/photos/photo2.jpg";
import photo3 from "./assets/photos/photo3.jpg";
import photo4 from "./assets/photos/photo4.jpg";

import happy_music from "./assets/audio/happy_music.mp3";

interface Photo {
  id: number;
  url: string;
  caption: string;
}

const BirthdaySurprise: React.FC = () => {
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, y: number, color: string, emoji: string}>>([]);
  const [floatingCats, setFloatingCats] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const photos: Photo[] = [
    {
      id: 1,
      url: photo1,
      caption: "тигрицы 🐯"
    },
    {
      id: 2,
      url: photo2,
      caption: "обнимаемся 🤗"
    },
    {
      id: 3,
      url: photo3,
      caption: "какая же ты красивая!"
    },
    {
      id: 4,
      url: photo4,
      caption: "зайчонок любимый ❤️"
    }
  ];

  const birthdayMessage = `Маша! Солнышко! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧

Сегодня твой особенный день, и я хочу сказать тебе, какая ты замечательная! 💗
Твоя улыбка такая мягкая и приятная, что хочется смотреть на неё вечно, а наша дружба - одно из самых лучших, что случалось в моей жизни. Мне очень повезло встретиться с тобой! 🤗

Желаю тебе в этом новом году жизни:
✨ Бесконечного счастья и радости
🌸 Исполнения всех мечт. Тебе всё под силу!
💕 Любви, которая согревает душу и пронизывает всё тело
🎈 Всех возможных (и только хороших!) незабываемых приключений
🌙 И, конечно, крепкого здоровья и благополучия!

Спасибо за то, что ты есть в моей жизни!
Ты мой лучик солнца! ☀️

С днём рождения, котёнок! ദ്ദി ˉ͈̀꒳ˉ͈́ )✧

С бесконечной любовью и наилучшими пожеланиями,
Янчик 💌`;

useEffect(() => {
    audioRef.current = new Audio(happy_music);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(error => {
          console.log("Не удалось запустить музыку:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    const catEmojis = ['💌', '🤗', '😺', '😸', '😻', '😘', '🌸', '💖', '✨', '🎀'];
    const newFloatingCats = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: catEmojis[Math.floor(Math.random() * catEmojis.length)]
    }));
    setFloatingCats(newFloatingCats);
  }, []);

  useEffect(() => {
    if (isBoxOpened) {
      setShowFireworks(true);
      const confettiEmojis = ['💕', '🌸', '✨', '💖', '🎀', '🌙', '⭐', '💫'];
      setConfetti(Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#ff69b4', '#ff1493', '#ff6b9d', '#ffb6c1', '#ffc0cb'][Math.floor(Math.random() * 5)],
        emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)]
      })));
    }
  }, [isBoxOpened]);

  const openBox = () => {
    setIsBoxOpened(true);
    setIsMusicPlaying(true);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-400 to-red-500 overflow-hidden relative">
      <div className="absolute inset-0">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {['✨', '💖', '🌸', '⭐', '💫'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {floatingCats.map(cat => (
        <div
          key={cat.id}
          className="absolute text-3xl animate-bounce opacity-70"
          style={{
            left: `${cat.x}%`,
            top: `${cat.y}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {cat.emoji}
        </div>
      ))}

      {showFireworks && confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute text-xl animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${Math.random() * 1}s`,
            animationDuration: `${1.5 + Math.random()}s`
          }}
        >
          {particle.emoji}
        </div>
      ))}

      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-pink-200/50 backdrop-blur-sm rounded-full p-3 text-pink-700 hover:bg-pink-200/70 transition-all duration-300 shadow-lg"
        >
          {isMusicPlaying ? <Music className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>

      <div className="absolute top-4 left-4 text-4xl animate-pulse">🐱</div>
      <div className="absolute bottom-4 right-4 text-4xl animate-pulse">😻</div>
      <div className="absolute top-1/2 left-4 text-3xl animate-bounce">🌸</div>
      <div className="absolute top-1/2 right-4 text-3xl animate-bounce">💖</div>

      <div className="flex items-center justify-center min-h-screen p-4">
        {!isBoxOpened ? (
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-pulse">
                🎉 Сюрприз! 🎉
              </h1>
              <p className="text-2xl text-white/95 mb-4">
                Для самой лучшей подруги на свете! ✨
              </p>
              <div className="text-4xl mb-4">
                (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ 💕
              </div>
            </div>
            
            <div 
              className="relative cursor-pointer transform transition-all duration-500 hover:scale-110 hover:rotate-6"
              onClick={openBox}
            >
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 w-56 h-56 mx-auto rounded-3xl shadow-2xl border-8 border-pink-200 animate-bounce relative">
                <div className="absolute inset-4 bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl flex items-center justify-center">
                  <Gift className="w-24 h-24 text-rose-600" />
                  <div className="absolute -top-2 -left-2 text-2xl">🐱</div>
                  <div className="absolute -bottom-2 -right-2 text-2xl">😻</div>
                </div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-pink-300 rounded-full border-4 border-pink-200 shadow-lg"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-16 bg-pink-300 rounded-full border-3 border-pink-200"></div>
                <div className="absolute -top-4 -left-4 text-3xl animate-spin">✨</div>
                <div className="absolute -bottom-4 -right-4 text-3xl animate-spin">💖</div>
              </div>
              <div className="mt-8 text-white text-xl animate-bounce">
                Нажми, чтобы открыть подарок! 🎁
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-6xl font-bold text-white mb-4 animate-bounce">
                С Днём Рождения! 🎂
              </h1>
              <div className="text-4xl mb-4">
                ♡(˃͈ દ ˂͈ ༶ )
              </div>
              <div className="flex justify-center space-x-6 mb-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="text-3xl animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
                    {['💖', '🌸', '✨', '🎀', '💫', '🌙'][i]}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
  <div className="bg-pink-200/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-pink-200/30">
    <h3 className="text-3xl font-bold text-white mb-6 text-center">
      Фоточки 📸
      <div className="text-2xl mt-2">ฅ(＾◡＾)ฅ</div>
    </h3>
    
    <div className="relative">
      <div className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-2xl shadow-lg border-4 border-pink-200/50 bg-gradient-to-br from-pink-100/30 via-purple-100/20 to-pink-200/40 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">🌸</div>
          <div className="absolute top-20 right-16 text-4xl animate-bounce">💕</div>
          <div className="absolute bottom-20 left-16 text-5xl animate-pulse">🌺</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-bounce">💖</div>
          <div className="absolute top-1/2 left-1/4 text-3xl animate-pulse">✨</div>
          <div className="absolute top-1/3 right-1/3 text-3xl animate-bounce">🦋</div>
        </div>

        <img 
          src={photos[currentPhotoIndex].url} 
          alt={photos[currentPhotoIndex].caption} 
          className="w-full h-full object-contain relative z-10" 
        />
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white">
        <p className="text-lg md:text-xl font-medium bg-pink-900/70 backdrop-blur-md rounded-xl px-6 py-3 shadow-lg border border-pink-200/30 text-center whitespace-nowrap">
          {photos[currentPhotoIndex].caption}
        </p>
      </div>
      
      <button 
        onClick={prevPhoto}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-pink-200/70 hover:bg-pink-200/90 backdrop-blur-sm rounded-full p-4 text-pink-700 transition-all duration-300 text-2xl font-bold shadow-lg hover:scale-110"
      >
        👈
      </button>
      
      <button 
        onClick={nextPhoto}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-pink-200/70 hover:bg-pink-200/90 backdrop-blur-sm rounded-full p-4 text-pink-700 transition-all duration-300 text-2xl font-bold shadow-lg hover:scale-110"
      >
        👉
      </button>
      
      <div className="absolute -top-3 -right-3 text-3xl animate-bounce">🌸</div>
      <div className="absolute -bottom-3 -left-3 text-3xl animate-pulse">💖</div>
    </div>
    
    <div className="flex justify-center mt-8 space-x-4">
      {photos.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPhotoIndex(index)}
          className={`text-3xl transition-all duration-300 hover:scale-110 ${
            index === currentPhotoIndex 
              ? 'animate-bounce scale-125' 
              : 'opacity-50 hover:opacity-80'
          }`}
        >
          ❤️
        </button>
      ))}
    </div>
  </div>

              <div className="bg-pink-200/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border-2 border-pink-200/30">
                <h3 className="text-3xl font-bold text-white mb-4 text-center">
                  Письмо для тебя 💌
                  <div className="text-2xl mt-2">ღ(´͈ ᵕ `͈ )</div>
                </h3>
                <div className="bg-pink-50/95 rounded-2xl p-6 shadow-inner border-2 border-pink-200/50 relative">
                  <div className="absolute -top-3 -left-3 text-2xl animate-bounce">🐱</div>
                  <div className="absolute -top-3 -right-3 text-2xl animate-bounce">💕</div>
                  <div className="absolute -bottom-3 -right-3 text-2xl animate-pulse">🌸</div>
                  
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {birthdayMessage}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 space-y-6">
              <div className="inline-flex items-center space-x-4 bg-pink-200/20 backdrop-blur-lg rounded-full px-8 py-4 border-2 border-pink-200/30">
                <div className="text-2xl animate-spin">✨</div>
                <span className="text-white text-xl font-medium">Люблю тебя!</span>
                <div className="text-2xl animate-spin" style={{ animationDirection: 'reverse' }}>💖</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isMusicPlaying && (
        <div className="absolute bottom-4 left-4 bg-pink-200/50 backdrop-blur-sm rounded-full px-6 py-3 text-pink-700 text-sm flex items-center space-x-2 shadow-lg">
          <div className="text-lg">🎵</div>
          <span>Играет праздничная музыка...</span>
          <div className="text-lg animate-bounce">💖</div>
        </div>
      )}

      <div className="absolute bottom-8 right-8 text-white text-right">
        <div className="text-2xl mb-2">ლ(╹◡╹ლ)</div>
        <div className="text-sm opacity-75">Сделано с любовью</div>
      </div>
    </div>
  );
};

export default BirthdaySurprise;