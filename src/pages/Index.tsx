import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const carTypes = ['Все', 'Седан', 'Внедорожник', 'Минивэн', 'Премиум'];

const cars = [
  { id: 1, name: 'Toyota Camry', type: 'Седан', price: 2500, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/d836d610-8343-4123-b1e0-758aca926e27.jpg', seats: 5, transmission: 'Автомат' },
  { id: 2, name: 'Toyota RAV4', type: 'Внедорожник', price: 3500, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/d836d610-8343-4123-b1e0-758aca926e27.jpg', seats: 5, transmission: 'Автомат' },
  { id: 3, name: 'Hyundai Solaris', type: 'Седан', price: 2000, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/d836d610-8343-4123-b1e0-758aca926e27.jpg', seats: 5, transmission: 'Механика' },
  { id: 4, name: 'Kia Sportage', type: 'Внедорожник', price: 3200, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/d836d610-8343-4123-b1e0-758aca926e27.jpg', seats: 5, transmission: 'Автомат' },
  { id: 5, name: 'Mercedes E-Class', type: 'Премиум', price: 6000, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/d836d610-8343-4123-b1e0-758aca926e27.jpg', seats: 5, transmission: 'Автомат' },
  { id: 6, name: 'Volkswagen Multivan', type: 'Минивэн', price: 4500, image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/d836d610-8343-4123-b1e0-758aca926e27.jpg', seats: 7, transmission: 'Автомат' },
];

const routes = [
  { id: 1, name: 'Золотое кольцо России', duration: '5-7 дней', distance: '800 км', image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/21860e77-571c-47b8-8d77-1d707ca6a0a8.jpg', description: 'Исторические города России' },
  { id: 2, name: 'Байкал и Листвянка', duration: '10-14 дней', distance: '5000 км', image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/21860e77-571c-47b8-8d77-1d707ca6a0a8.jpg', description: 'Великое озеро и природа Сибири' },
  { id: 3, name: 'Крым - по побережью', duration: '7-10 дней', distance: '1200 км', image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/21860e77-571c-47b8-8d77-1d707ca6a0a8.jpg', description: 'Море, горы и древние дворцы' },
  { id: 4, name: 'Карелия и водопады', duration: '5-7 дней', distance: '900 км', image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/21860e77-571c-47b8-8d77-1d707ca6a0a8.jpg', description: 'Озёра, водопады и северная природа' },
];

const reviews = [
  { id: 1, name: 'Алексей М.', rating: 5, text: 'Прекрасный сервис! Машина чистая, в отличном состоянии. Путешествие по Золотому кольцу прошло идеально!', date: '15.01.2026', route: 'Золотое кольцо' },
  { id: 2, name: 'Мария К.', rating: 5, text: 'Быстрое оформление, адекватные цены. Рекомендую всем, кто хочет свободно путешествовать!', date: '10.01.2026', route: 'Крым' },
  { id: 3, name: 'Дмитрий П.', rating: 4, text: 'Хорошая компания, машины надёжные. Единственное - хотелось бы больше вариантов внедорожников.', date: '05.01.2026', route: 'Карелия' },
  { id: 4, name: 'Елена С.', rating: 5, text: 'Спасибо за незабываемое путешествие на Байкал! Всё организовано на высшем уровне.', date: '28.12.2025', route: 'Байкал' },
];

export default function Index() {
  const [selectedType, setSelectedType] = useState('Все');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedCar, setSelectedCar] = useState<number | null>(null);

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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://cdn.poehali.dev/files/IMG_1080.PNG" alt="Русская Фантазия" className="h-12 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Автомобили</a>
            <a href="#booking" className="text-sm font-medium hover:text-primary transition-colors">Бронирование</a>
            <a href="#routes" className="text-sm font-medium hover:text-primary transition-colors">Маршруты</a>
            <a href="#reviews" className="text-sm font-medium hover:text-primary transition-colors">Отзывы</a>
          </div>
          <Button variant="default" size="lg" className="gap-2">
            <Icon name="Phone" size={18} />
            +7 (800) 555-35-35
          </Button>
        </div>
      </nav>

      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/65283f3c-fc7c-4b4e-8eaf-74ace5205d58.jpg" 
            alt="Hero" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Русская Фантазия
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white max-w-3xl mx-auto">
            Помогаем людям путешествовать на авто по всей бескрайней России! 
            Это очень увлекательно и выгодно.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gap-2 text-lg px-8" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Car" size={20} />
              Выбрать автомобиль
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-background/20 backdrop-blur">
              <Icon name="Map" size={20} />
              Популярные маршруты
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center hover-scale border-primary/20">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <CardTitle>Надёжность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Все автомобили застрахованы и проходят техосмотр</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale border-secondary/20">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Icon name="Wallet" size={32} className="text-secondary" />
                </div>
                <CardTitle>Выгодно</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Прозрачные цены без скрытых платежей</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale border-accent/20">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Icon name="MapPin" size={32} className="text-accent" />
                </div>
                <CardTitle>Свобода</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Путешествуйте по России без ограничений</p>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale border-primary/20">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <CardTitle>Быстро</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Бронирование за 5 минут онлайн</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наш автопарк</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Выберите идеальный автомобиль для вашего путешествия</p>
          
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {carTypes.map(type => (
              <Button 
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(type)}
                className="transition-all"
              >
                {type}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredCars.map(car => (
              <Card key={car.id} className="overflow-hidden hover-scale group cursor-pointer" onClick={() => setSelectedCar(car.id)}>
                <div className="relative h-48 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <Badge className="absolute top-3 right-3 bg-primary">{car.type}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {car.name}
                    <span className="text-2xl font-bold text-primary">{car.price} ₽</span>
                  </CardTitle>
                  <CardDescription>за сутки</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Users" size={16} />
                      {car.seats} мест
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Settings" size={16} />
                      {car.transmission}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant={selectedCar === car.id ? 'default' : 'outline'}>
                    {selectedCar === car.id ? 'Выбрано' : 'Забронировать'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Бронирование</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Рассчитайте стоимость аренды и забронируйте автомобиль</p>
          
          <Card className="max-w-4xl mx-auto animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Выберите даты и автомобиль</CardTitle>
              <CardDescription>Укажите период аренды для расчёта стоимости</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Дата начала аренды</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        {dateFrom ? format(dateFrom, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Дата окончания аренды</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        {dateTo ? format(dateTo, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Автомобиль</label>
                <Select value={selectedCar?.toString()} onValueChange={(val) => setSelectedCar(Number(val))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите автомобиль" />
                  </SelectTrigger>
                  <SelectContent>
                    {cars.map(car => (
                      <SelectItem key={car.id} value={car.id.toString()}>
                        {car.name} - {car.price} ₽/сутки
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {dateFrom && dateTo && selectedCar && (
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 animate-scale-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium">Количество дней:</span>
                    <span className="text-2xl font-bold">{Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Итоговая стоимость:</span>
                    <span className="text-3xl font-bold text-primary">{calculatePrice().toLocaleString()} ₽</span>
                  </div>
                </div>
              )}

              <Button size="lg" className="w-full text-lg" disabled={!dateFrom || !dateTo || !selectedCar}>
                <Icon name="CheckCircle" size={20} className="mr-2" />
                Забронировать сейчас
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="routes" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Популярные маршруты</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Вдохновитесь идеями для путешествий по России</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map(route => (
              <Card key={route.id} className="overflow-hidden hover-scale group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img src={route.image} alt={route.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{route.name}</h3>
                    <p className="text-white/90">{route.description}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex gap-6 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Clock" size={18} />
                      {route.duration}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="MapPin" size={18} />
                      {route.distance}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Узнать подробнее</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Отзывы путешественников</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Что говорят наши клиенты</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id} className="hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.date}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{review.text}</p>
                  <Badge variant="outline">{review.route}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="https://cdn.poehali.dev/files/IMG_1080.PNG" alt="Русская Фантазия" className="h-12 w-auto mb-4" />
              <p className="text-sm text-muted-foreground">Помогаем людям путешествовать по всей России</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#catalog" className="hover:text-primary transition-colors">Аренда авто</a></li>
                <li><a href="#routes" className="hover:text-primary transition-colors">Маршруты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Страхование</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 555-35-35
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@rusfantasy.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, Россия
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2026 Русская Фантазия. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
