import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ type: string; id: number } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playHoverSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (type: string, id: number) => {
    setModalContent({ type, id });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a1f]">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/87273149-6fa5-4407-b212-b4e4eb9e7499/files/669d6b92-b23e-4831-a7b8-a55fb805e175.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1f]/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🌌</div>
              <div>
                <h1 className="text-2xl font-bold glow-text">Мир медиа</h1>
                <p className="text-xs text-accent font-['cursive'] italic">Creative Space</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'video', label: 'Видео', icon: 'Video' },
                { id: 'music', label: 'Музыка', icon: 'Music' },
                { id: 'blog', label: 'Блог', icon: 'BookOpen' },
                { id: 'upload', label: 'Загрузить', icon: 'Upload' },
                { id: 'contact', label: 'Контакты', icon: 'Mail' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-primary/20 hover:glow-border ${
                    activeSection === item.id ? 'text-primary glow-text' : 'text-white/80'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="text-sm font-medium hidden lg:block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24">
        <section id="home" className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center animate-slide-in">
            <h2 className="text-7xl font-bold mb-6 glow-text">Мир медиа</h2>
            <p className="text-4xl mb-4 text-accent font-['cursive'] italic">Creative Space</p>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Платформа для творчества: видео, музыка, блоги. Создавайте, делитесь, вдохновляйте.
            </p>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('upload')}
              className="bg-primary hover:bg-primary/80 text-white px-8 py-6 text-lg glow-border animate-pulse-glow"
            >
              <Icon name="Sparkles" size={24} className="mr-2" />
              Начать создавать
            </Button>
          </div>
        </section>

        <section id="video" className="min-h-screen py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <Icon name="Video" size={48} className="text-primary animate-float" />
              </div>
              <h2 className="text-5xl font-bold mb-4 glow-text">Видео</h2>
              <p className="text-xl text-white/70">Смотрите и создавайте уникальный видеоконтент</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card
                  key={item}
                  onMouseEnter={playHoverSound}
                  onClick={() => openModal('video', item)}
                  className="bg-card/60 backdrop-blur-lg border-primary/30 p-0 overflow-hidden group hover:glow-border transition-all cursor-pointer hover:scale-105 duration-300"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Icon name="Play" size={48} className="text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Видео проект {item}</h3>
                    <p className="text-sm text-white/60">Творческий контент с эффектами</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="music" className="min-h-screen py-20 px-6 cosmic-gradient">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <Icon name="Music" size={48} className="text-secondary animate-float" />
              </div>
              <h2 className="text-5xl font-bold mb-4 glow-text">Музыка</h2>
              <p className="text-xl text-white/70">Ваша музыкальная коллекция в космосе</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((item) => (
                <Card
                  key={item}
                  onMouseEnter={playHoverSound}
                  onClick={() => openModal('music', item)}
                  className="bg-card/60 backdrop-blur-lg border-secondary/30 p-6 group hover:glow-border transition-all cursor-pointer hover:scale-105 duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center">
                      <Icon name="Disc3" size={32} className="text-white animate-spin-slow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Трек {item}</h3>
                      <p className="text-sm text-white/60 mb-2">Исполнитель {item}</p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Icon name="Play" size={16} />
                        </Button>
                        <div className="flex-1 h-1 bg-white/20 rounded-full">
                          <div className="h-full w-1/3 bg-secondary rounded-full" />
                        </div>
                        <span className="text-xs text-white/60">3:42</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="min-h-screen py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <Icon name="BookOpen" size={48} className="text-accent animate-float" />
              </div>
              <h2 className="text-5xl font-bold mb-4 glow-text">Блог</h2>
              <p className="text-xl text-white/70">Истории и идеи из мира творчества</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((item) => (
                <Card
                  key={item}
                  onMouseEnter={playHoverSound}
                  onClick={() => openModal('blog', item)}
                  className="bg-card/60 backdrop-blur-lg border-accent/30 p-6 group hover:glow-border transition-all cursor-pointer hover:scale-105 duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center flex-shrink-0">
                      <Icon name="Feather" size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Статья {item}: Творческий процесс</h3>
                      <p className="text-sm text-white/60 mb-3">
                        Погрузитесь в мир креативности и узнайте секреты создания уникального контента...
                      </p>
                      <div className="flex items-center gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          15 окт 2025
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          5 мин
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="upload" className="min-h-screen py-20 px-6 cosmic-gradient">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <Icon name="Upload" size={48} className="text-primary animate-float" />
              </div>
              <h2 className="text-5xl font-bold mb-4 glow-text">Загрузить контент</h2>
              <p className="text-xl text-white/70">Поделитесь своим творчеством с миром</p>
            </div>
            <Card className="bg-card/60 backdrop-blur-lg border-primary/30 p-8 glow-border">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Тип контента</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { type: 'video', label: 'Видео', icon: 'Video' },
                      { type: 'music', label: 'Музыка', icon: 'Music' },
                      { type: 'blog', label: 'Блог', icon: 'FileText' },
                    ].map((type) => (
                      <Button
                        key={type.type}
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/20 hover:border-primary"
                      >
                        <Icon name={type.icon as any} size={18} className="mr-2" />
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Название</label>
                  <Input
                    placeholder="Введите название"
                    className="bg-input border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <Textarea
                    placeholder="Расскажите о вашем контенте..."
                    className="bg-input border-primary/30 focus:border-primary min-h-32"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Файл</label>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Icon name="Upload" size={32} className="mx-auto mb-3 text-primary" />
                    <p className="text-sm text-white/70">Перетащите файл или нажмите для выбора</p>
                    <p className="text-xs text-white/50 mt-1">Видео, аудио или изображения</p>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/80 text-white py-6 text-lg glow-border">
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Опубликовать
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <section id="contact" className="min-h-screen py-20 px-6 flex items-center">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <Icon name="Mail" size={48} className="text-secondary animate-float" />
              </div>
              <h2 className="text-5xl font-bold mb-4 glow-text">Контакты</h2>
              <p className="text-xl text-white/70">Свяжитесь с нами</p>
            </div>
            <Card className="bg-card/60 backdrop-blur-lg border-secondary/30 p-8 glow-border">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-[#0077FF] hover:bg-[#0066DD] text-white flex items-center gap-3"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zM12 15.88c-2.14 0-3.88-1.74-3.88-3.88S9.86 8.12 12 8.12s3.88 1.74 3.88 3.88-1.74 3.88-3.88 3.88zm5.92-9.21c-.54 0-.98-.44-.98-.98s.44-.98.98-.98.98.44.98.98-.44.98-.98.98z"/>
                    </svg>
                    ВКонтакте
                  </Button>
                </div>
                <div className="text-center text-sm text-white/60">
                  <p className="mb-2">Email: info@mirMedia.space</p>
                  <p>Telegram: @mirMedia</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-primary/20 bg-[#0a0a1f]/80 backdrop-blur-lg py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌌</span>
              <div>
                <p className="font-bold">Мир медиа</p>
                <p className="text-xs text-white/60">Creative Space</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-white/70">© 2025 Мир медиа. Все права защищены.</p>
              <p className="text-xs text-white/50 mt-1">Создано с любовью к творчеству</p>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-card border-primary/30 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl glow-text flex items-center gap-3">
              {modalContent?.type === 'video' && (
                <>
                  <Icon name="Video" size={28} className="text-primary" />
                  Видео проект {modalContent.id}
                </>
              )}
              {modalContent?.type === 'music' && (
                <>
                  <Icon name="Music" size={28} className="text-secondary" />
                  Трек {modalContent.id}
                </>
              )}
              {modalContent?.type === 'blog' && (
                <>
                  <Icon name="BookOpen" size={28} className="text-accent" />
                  Статья {modalContent.id}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-white/70">
              {modalContent?.type === 'video' && 'Творческий видеоконтент с ультрасовременными эффектами'}
              {modalContent?.type === 'music' && 'Музыкальная композиция в космическом стиле'}
              {modalContent?.type === 'blog' && 'Статья о творческом процессе и вдохновении'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {modalContent?.type === 'video' && (
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center glow-border">
                  <div className="text-center">
                    <Icon name="Play" size={64} className="text-white/50 mx-auto mb-4" />
                    <p className="text-white/70">Видео плеер</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Описание</h3>
                  <p className="text-sm text-white/70">
                    Уникальный видеопроект, созданный с применением современных техник монтажа и спецэффектов. 
                    Погрузитесь в атмосферу космического творчества и ощутите магию визуального искусства.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/80">
                    <Icon name="Play" size={18} className="mr-2" />
                    Воспроизвести
                  </Button>
                  <Button variant="outline" className="border-primary/30">
                    <Icon name="Share2" size={18} className="mr-2" />
                    Поделиться
                  </Button>
                </div>
              </div>
            )}

            {modalContent?.type === 'music' && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg glow-border">
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center flex-shrink-0">
                    <Icon name="Disc3" size={64} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">Трек {modalContent.id}</h3>
                    <p className="text-white/60 mb-4">Исполнитель {modalContent.id}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Button size="sm" className="bg-secondary hover:bg-secondary/80">
                          <Icon name="Play" size={16} />
                        </Button>
                        <div className="flex-1 h-2 bg-white/20 rounded-full">
                          <div className="h-full w-1/3 bg-secondary rounded-full" />
                        </div>
                        <span className="text-sm text-white/60">3:42</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">О треке</h3>
                  <p className="text-sm text-white/70">
                    Космическая музыкальная композиция, сочетающая электронные звуки с атмосферными мелодиями. 
                    Идеально подходит для творческой работы и медитации.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-secondary hover:bg-secondary/80">
                    <Icon name="Download" size={18} className="mr-2" />
                    Скачать
                  </Button>
                  <Button variant="outline" className="border-secondary/30">
                    <Icon name="Heart" size={18} className="mr-2" />
                    В избранное
                  </Button>
                </div>
              </div>
            )}

            {modalContent?.type === 'blog' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    15 октября 2025
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    5 минут чтения
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    Автор {modalContent.id}
                  </span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/70 leading-relaxed">
                    Творчество — это путешествие в неизведанное, где каждый шаг открывает новые горизонты возможностей. 
                    В этой статье мы исследуем, как космическое вдохновение влияет на современное искусство.
                  </p>
                  <p className="text-white/70 leading-relaxed mt-4">
                    Взгляните на звёздное небо — оно наполнено историями, ожидающими своего рассказчика. 
                    Каждая звезда — это возможность для творчества, каждая галактика — источник вдохновения.
                  </p>
                  <p className="text-white/70 leading-relaxed mt-4">
                    Мы приглашаем вас присоединиться к нашему космическому путешествию творчества, 
                    где границы существуют только в нашем воображении.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-accent hover:bg-accent/80 text-card">
                    <Icon name="BookmarkPlus" size={18} className="mr-2" />
                    Сохранить
                  </Button>
                  <Button variant="outline" className="border-accent/30">
                    <Icon name="Share2" size={18} className="mr-2" />
                    Поделиться
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;