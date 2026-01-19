import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const carTypes = ['Все', 'Минивэн 7 мест', 'Минивэн 8 мест'];

const cars = [
  { id: 1, name: 'Hyundai Grand Starex VIP', type: 'Минивэн 7 мест', price: 4500, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/4f158deb-99e5-4fdc-a7a6-9ab6a278f9ec.jpg', interior: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/eecd29c1-4626-4318-843e-62377820f0bf.jpg', seats: 7, transmission: 'Автомат', year: 2024 },
  { id: 2, name: 'Hyundai Grand Starex Комфорт', type: 'Минивэн 8 мест', price: 4000, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/df0fff68-3f4d-4105-b38d-1690d3b1ec6e.jpg', interior: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/eecd29c1-4626-4318-843e-62377820f0bf.jpg', seats: 8, transmission: 'Автомат', year: 2023 },
  { id: 3, name: 'Hyundai Grand Starex Premium', type: 'Минивэн 7 мест', price: 5000, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/4f158deb-99e5-4fdc-a7a6-9ab6a278f9ec.jpg', interior: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/eecd29c1-4626-4318-843e-62377820f0bf.jpg', seats: 7, transmission: 'Автомат', year: 2024 },
];

const routes = [
  { 
    id: 1, 
    name: 'Золотое кольцо России', 
    duration: '3-4 дня', 
    distance: '740 км от Москвы', 
    price: '13 500',
    images: [
      'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/cdc5a3fe-0c04-4090-9b78-b1623b0ef4c3.jpg',
      'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/04ddf242-cd7c-45bd-af29-f78dbe1aa973.jpg',
    ],
    description: 'Москва → Сергиев Посад → Переславль-Залесский → Ростов Великий → Ярославль → Кострома → Иваново → Суздаль → Владимир → Москва',
    highlights: ['8 древних городов', 'Белокаменная архитектура', 'Монастыри и храмы', 'Русская кухня']
  },
  { 
    id: 2, 
    name: 'Байкал: путь к великому озеру', 
    duration: '14-16 дней', 
    distance: '5 280 км от Москвы',
    price: '64 000',
    images: [
      'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/a52295a6-d201-4234-993f-43c73763ff7f.jpg',
      'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/df0fff68-3f4d-4105-b38d-1690d3b1ec6e.jpg',
    ],
    description: 'Москва → Казань → Екатеринбург → Тюмень → Новосибирск → Красноярск → Иркутск → Листвянка → Ольхон → обратно',
    highlights: ['Самое глубокое озеро', 'Остров Ольхон', 'Кругобайкальская железная дорога', 'Сибирская тайга']
  },
  { 
    id: 3, 
    name: 'Крымское побережье', 
    duration: '7-9 дней', 
    distance: '1 400 км от Москвы',
    price: '31 500',
    images: [
      'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/6a6c4f2a-fdae-42fe-a457-0346662f5f49.jpg',
      'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/04ddf242-cd7c-45bd-af29-f78dbe1aa973.jpg',
    ],
    description: 'Москва → Воронеж → Ростов-на-Дону → Керчь → Феодосия → Судак → Алушта → Ялта → Севастополь → обратно',
    highlights: ['Чёрное море', 'Ласточкино гнездо', 'Ай-Петри', 'Крымские вина']
  },
  { 
    id: 4, 
    name: 'Карелия: край озёр', 
    duration: '5-6 дней', 
    distance: '1 020 км от Москвы',
    price: '22 500',
    images: [
      'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/887a2086-0037-413d-bac5-5d7ab8825e46.jpg',
      'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/df0fff68-3f4d-4105-b38d-1690d3b1ec6e.jpg',
    ],
    description: 'Москва → Валаам → Кижи → Петрозаводск → Рускеала → Сортавала → Санкт-Петербург → Москва',
    highlights: ['Мраморный каньон Рускеала', 'Остров Кижи', 'Валаамский монастырь', 'Северная природа']
  },
];

const reviews = [
  { id: 1, name: 'Алексей Морозов', rating: 5, avatar: '👨‍💼', text: 'Ездили всей семьёй из 6 человек в Суздаль на выходные. Grand Starex оказался идеальным выбором - просторно, комфортно, все довольны! Отдельное спасибо менеджеру Ивану за помощь с маршрутом.', date: '12.01.2026', route: 'Золотое кольцо', duration: '3 дня' },
  { id: 2, name: 'Мария Ковалёва', rating: 5, avatar: '👩‍🦰', text: 'Это была наша первая поездка на Байкал, и она стала незабываемой! Hyundai Starex прошёл 10 000 км без единой проблемы. Машина 2024 года, чистая, ухоженная. Будем брать ещё!', date: '05.01.2026', route: 'Байкал', duration: '15 дней' },
  { id: 3, name: 'Дмитрий Соколов', rating: 5, avatar: '👨', text: 'Компания друзей из 7 человек ездили в Крым. Минивэн оказался очень экономичным - расход около 11л на трассе. Кондиционер работал отлично даже в жару +35. Рекомендую!', date: '28.12.2025', route: 'Крым', duration: '8 дней' },
  { id: 4, name: 'Елена Сергеева', rating: 5, avatar: '👩', text: 'Брали машину на неделю для поездки в Карелию. Очень понравилось обслуживание - встретили в удобное время, всё объяснили, дали советы по маршруту. Сам автомобиль комфортный, места всем хватило.', date: '20.12.2025', route: 'Карелия', duration: '6 дней' },
];

export default function Index() {
  const [selectedType, setSelectedType] = useState('Все');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | null>(null);

  const filteredCars = cars.filter(car => {
    const typeMatch = selectedType === 'Все' || car.type === selectedType;
    return typeMatch;
  });

  const calculatePrice = () => {
    if (!dateFrom || !dateTo || !selectedCar) return 0;
    const days = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24));
    const car = cars.find(c => c.id === selectedCar);
    return days * (car?.price || 0);
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-shrink-0">
              <img src="https://cdn.poehali.dev/files/IMG_1080.PNG" alt="Русская Фантазия" className="h-12 w-auto" />
            </div>
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">Арендатору</a>
              <a href="#routes" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">Маршруты</a>
              <a href="#booking" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">Бронировать</a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">Стоимость</a>
            </div>
            <Button variant="default" className="gap-2 whitespace-nowrap flex-shrink-0">
              <Icon name="Phone" size={16} />
              <span className="hidden sm:inline">+7 (495) 123-45-67</span>
              <span className="sm:hidden">Позвонить</span>
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/files/IMG_1122.PNG" 
            alt="Русская Фантазия" 
            className="w-full h-full object-contain object-center"
          />
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center hover-scale border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <CardTitle>Полная страховка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">КАСКО и ОСАГО включены в стоимость</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale border-secondary/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Icon name="Users" size={32} className="text-secondary" />
                </div>
                <CardTitle>Для больших компаний</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Вместительные минивэны на 7-8 мест</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale border-accent/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Icon name="Fuel" size={32} className="text-accent" />
                </div>
                <CardTitle>Экономичность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Расход 10-12 л на 100 км по трассе</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <CardTitle>24/7 поддержка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Всегда на связи в любой точке России</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Hyundai Grand Starex</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наш автопарк</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Все автомобили 2023-2024 года, в идеальном техническом состоянии
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {carTypes.map(type => (
              <Button 
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(type)}
                className="transition-all"
                size="lg"
              >
                {type}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredCars.map(car => (
              <Card key={car.id} className="overflow-hidden hover-scale group cursor-pointer border-2" onClick={() => setSelectedCar(car.id)}>
                <div className="relative h-56 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <Badge className="absolute top-4 right-4 bg-primary text-lg px-3 py-1">{car.year} год</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{car.name}</CardTitle>
                  <CardDescription>{car.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Users" size={18} className="text-primary" />
                      <span>{car.seats} мест</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Settings" size={18} className="text-secondary" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{car.price.toLocaleString()} ₽</span>
                    <span className="text-muted-foreground">/сутки</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        <Icon name="Image" size={18} className="mr-2" />
                        Смотреть салон
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <img src={car.interior} alt="Салон" className="w-full rounded-lg" />
                    </DialogContent>
                  </Dialog>
                  <Button className="w-full" variant={selectedCar === car.id ? 'default' : 'outline'} size="lg">
                    {selectedCar === car.id ? '✓ Выбрано' : 'Забронировать'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Онлайн бронирование</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Рассчитайте стоимость</h2>
            <p className="text-muted-foreground text-lg">Выберите даты и получите точную цену</p>
          </div>
          
          <Card className="max-w-4xl mx-auto animate-scale-in border-2 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl">Калькулятор аренды</CardTitle>
              <CardDescription className="text-base">Без скрытых платежей и доплат</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Icon name="CalendarArrowDown" size={18} className="text-primary" />
                    Дата начала аренды
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal h-12 text-base" size="lg">
                        <Icon name="Calendar" size={18} className="mr-2" />
                        {dateFrom ? format(dateFrom, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Icon name="CalendarArrowUp" size={18} className="text-secondary" />
                    Дата окончания аренды
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal h-12 text-base" size="lg">
                        <Icon name="Calendar" size={18} className="mr-2" />
                        {dateTo ? format(dateTo, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Icon name="Car" size={18} className="text-accent" />
                  Автомобиль
                </label>
                <Select value={selectedCar?.toString()} onValueChange={(val) => setSelectedCar(Number(val))}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Выберите Hyundai Grand Starex" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map(car => (
                      <SelectItem key={car.id} value={car.id.toString()} className="text-base py-3">
                        <div className="flex items-center justify-between w-full">
                          <span>{car.name}</span>
                          <span className="ml-4 font-semibold">{car.price.toLocaleString()} ₽/сутки</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {dateFrom && dateTo && selectedCar && (
                <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 rounded-xl border-2 border-primary/20 animate-scale-in">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-medium">Количество дней:</span>
                      <span className="text-3xl font-bold">{Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))}</span>
                    </div>
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-medium">Цена за сутки:</span>
                      <span className="text-2xl font-bold">{cars.find(c => c.id === selectedCar)?.price.toLocaleString()} ₽</span>
                    </div>
                    <div className="h-px bg-border my-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold">Итоговая стоимость:</span>
                      <span className="text-4xl font-bold text-gradient">{calculatePrice().toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              )}

              <Button size="lg" className="w-full text-lg h-14 shadow-lg shadow-primary/20" disabled={!dateFrom || !dateTo || !selectedCar}>
                <Icon name="CheckCircle" size={22} className="mr-2" />
                Забронировать сейчас
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Бронирование бесплатно • Оплата при получении • Отмена в любое время
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="routes" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Старт из Москвы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Популярные маршруты</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Проверенные маршруты с реальными расстояниями и ценами на аренду
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {routes.map(route => (
              <Card key={route.id} className="overflow-hidden hover-scale group cursor-pointer border-2" onClick={() => setSelectedRoute(route)}>
                <div className="relative h-80 overflow-hidden">
                  <img src={route.images[0]} alt={route.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-primary/90 backdrop-blur text-base px-3 py-1">
                      <Icon name="Clock" size={16} className="mr-1" />
                      {route.duration}
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-bold text-white mb-3">{route.name}</h3>
                    <div className="flex items-center gap-3 text-white/90 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={18} className="text-primary" />
                        {route.distance}
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Wallet" size={18} className="text-secondary" />
                        от {route.price} ₽
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-2">Маршрут:</div>
                    <p className="text-sm leading-relaxed">{route.description}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-3">Что увидите:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {route.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline" size="lg">
                        <Icon name="Image" size={18} className="mr-2" />
                        Посмотреть фото маршрута
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                      <div className="grid grid-cols-2 gap-4">
                        {route.images.map((img, idx) => (
                          <img key={idx} src={img} alt={`${route.name} ${idx + 1}`} className="w-full rounded-lg" />
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">Отзывы клиентов</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Реальные путешествия</h2>
            <p className="text-muted-foreground text-lg">Истории наших клиентов</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id} className="hover-scale border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{review.avatar}</div>
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          {review.date}
                          <span>•</span>
                          <span>{review.duration}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={18} className="text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                  <Badge variant="secondary" className="text-sm">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {review.route}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="https://cdn.poehali.dev/files/IMG_1080.PNG" alt="Русская Фантазия" className="h-12 w-auto mb-4" />
              <p className="text-sm text-muted-foreground">Путешествия по России на Hyundai Grand Starex</p>
              <div className="mt-4 flex gap-2">
                <Badge variant="outline">Москва</Badge>
                <Badge variant="outline">2026</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Наш автопарк</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Условия аренды</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Маршруты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#routes" className="hover:text-primary transition-colors">Золотое кольцо</a></li>
                <li><a href="#routes" className="hover:text-primary transition-colors">Байкал</a></li>
                <li><a href="#routes" className="hover:text-primary transition-colors">Крым</a></li>
                <li><a href="#routes" className="hover:text-primary transition-colors">Карелия</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Phone" size={16} className="text-primary" />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Mail" size={16} className="text-secondary" />
                  info@rusfantasy.ru
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={16} className="text-accent" />
                  Москва, Россия
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2026 Русская Фантазия. Путешествия начинаются здесь.
          </div>
        </div>
      </footer>
    </div>
  );
}