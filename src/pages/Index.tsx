import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const routes = [
  { id: 1, city: 'Казань', distance: 800, days: '2-3 дня', coords: { x: 52, y: 48 }, priceStandard: 8000, priceComfort: 12000, pricePremium: 16000 },
  { id: 2, city: 'Санкт-Петербург', distance: 700, days: '2-3 дня', coords: { x: 30, y: 35 }, priceStandard: 7000, priceComfort: 10000, pricePremium: 14000 },
  { id: 3, city: 'Сочи', distance: 1600, days: '4-5 дней', coords: { x: 45, y: 70 }, priceStandard: 16000, priceComfort: 24000, pricePremium: 32000 },
  { id: 4, city: 'Екатеринбург', distance: 1800, days: '4-6 дней', coords: { x: 65, y: 45 }, priceStandard: 18000, priceComfort: 27000, pricePremium: 36000 },
  { id: 5, city: 'Нижний Новгород', distance: 420, days: '1-2 дня', coords: { x: 48, y: 44 }, priceStandard: 4200, priceComfort: 6000, pricePremium: 8400 },
  { id: 6, city: 'Ярославль', distance: 270, days: '1 день', coords: { x: 42, y: 40 }, priceStandard: 2700, priceComfort: 4000, pricePremium: 5400 },
  { id: 7, city: 'Новосибирск', distance: 3300, days: '8-10 дней', coords: { x: 78, y: 50 }, priceStandard: 33000, priceComfort: 50000, pricePremium: 66000 },
  { id: 8, city: 'Краснодар', distance: 1350, days: '3-4 дня', coords: { x: 43, y: 68 }, priceStandard: 13500, priceComfort: 20000, pricePremium: 27000 },
  { id: 9, city: 'Владивосток', distance: 9200, days: '20-25 дней', coords: { x: 95, y: 58 }, priceStandard: 92000, priceComfort: 138000, pricePremium: 184000 },
  { id: 10, city: 'Воронеж', distance: 520, days: '1-2 дня', coords: { x: 44, y: 52 }, priceStandard: 5200, priceComfort: 7800, pricePremium: 10400 },
  { id: 11, city: 'Ростов-на-Дону', distance: 1100, days: '3 дня', coords: { x: 44, y: 62 }, priceStandard: 11000, priceComfort: 16500, pricePremium: 22000 },
  { id: 12, city: 'Иркутск', distance: 5200, days: '12-15 дней', coords: { x: 88, y: 52 }, priceStandard: 52000, priceComfort: 78000, pricePremium: 104000 },
];

const vehicles = [
  { id: 1, type: 'Минивэн', model: 'Hyundai Grand Starex', seats: '7-8 мест', price: '4 000 ₽/сутки', image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/4f158deb-99e5-4fdc-a7a6-9ab6a278f9ec.jpg', features: ['АКПП', 'Кондиционер', 'Багажник 900л'] },
  { id: 2, type: 'Автодом', model: 'Fiat Ducato Camper', seats: '4 спальных места', price: '8 000 ₽/сутки', image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/df0fff68-3f4d-4105-b38d-1690d3b1ec6e.jpg', features: ['Кухня', 'Душ', 'Автономное отопление'] },
  { id: 3, type: 'Микроавтобус', model: 'Mercedes Sprinter', seats: '15-18 мест', price: '6 500 ₽/сутки', image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/4f158deb-99e5-4fdc-a7a6-9ab6a278f9ec.jpg', features: ['Климат-контроль', 'USB-порты', 'Большой багажник'] },
  { id: 4, type: 'Автобус', model: 'ПАЗ Vector Next', seats: '30-35 мест', price: '10 000 ₽/сутки', image: 'https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/files/df0fff68-3f4d-4105-b38d-1690d3b1ec6e.jpg', features: ['Панорамные окна', 'Подогрев сидений', 'Микрофон'] },
];

const reviews = [
  { id: 1, name: 'Алексей М.', rating: 5, text: 'Брали Starex на неделю до Казани. Всё отлично организовано, машина чистая, поддержка 24/7 работает!', date: '10.01.2026', platform: 'Авито' },
  { id: 2, name: 'Мария К.', rating: 5, text: 'Ездили семьёй в Сочи на автодоме. Незабываемые впечатления! Спасибо за профессионализм.', date: '05.01.2026', platform: 'Яндекс' },
  { id: 3, name: 'Дмитрий П.', rating: 5, text: 'Организовали корпоратив, взяли микроавтобус. Всем понравилось, цена адекватная.', date: '28.12.2025', platform: 'Авито' },
];

export default function Index() {
  const [selectedRoute, setSelectedRoute] = useState<typeof routes[0] | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedDistance, setSelectedDistance] = useState<number>(1000);

  const calculatePrice = () => {
    if (!dateFrom || !dateTo) return 0;
    const days = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24));
    return days * 4000;
  };

  const estimatedDays = Math.ceil(selectedDistance / 500);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <img src="https://cdn.poehali.dev/files/IMG_1080.PNG" alt="Русская Фантазия" className="h-14 w-auto" />
            <div className="hidden lg:flex items-center gap-8">
              <a href="#routes" className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors">Маршруты</a>
              <a href="#calculator" className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors">Калькулятор</a>
              <a href="#vehicles" className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors">Транспорт</a>
              <a href="#about" className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors">О нас</a>
              <a href="#reviews" className="text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors">Отзывы</a>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (495) 123-45-67
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-20" style={{
        backgroundImage: 'url(https://cdn.poehali.dev/files/IMG_1122.PNG)',
        backgroundSize: 'contain',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white"></div>
        <div className="container mx-auto px-6 relative z-10 mt-auto pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200">
              <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base px-4 py-2">
                <Icon name="MapPin" size={18} className="mr-2" />
                Старт из Москвы
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-blue-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                Путешествуй по всей России
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                12 готовых маршрутов с продуманными остановками. Возьмите комфортный транспорт и отправляйтесь в незабываемое путешествие!
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 h-14 shadow-lg" onClick={() => document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon name="Map" size={22} className="mr-2" />
                  Выбрать маршрут
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-2 border-blue-600 text-blue-600 hover:bg-blue-50" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon name="Calculator" size={22} className="mr-2" />
                  Рассчитать стоимость
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-10 shadow-2xl text-white">
              <h3 className="text-3xl font-bold mb-8">Почему мы?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <Icon name="Shield" size={28} />
                  </div>
                  <div>
                    <div className="font-bold text-xl mb-1">Полная страховка</div>
                    <div className="text-blue-100">КАСКО и ОСАГО включены</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <Icon name="Clock" size={28} />
                  </div>
                  <div>
                    <div className="font-bold text-xl mb-1">Поддержка 24/7</div>
                    <div className="text-blue-100">На связи в любой точке России</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <Icon name="MapPin" size={28} />
                  </div>
                  <div>
                    <div className="font-bold text-xl mb-1">Готовые маршруты</div>
                    <div className="text-blue-100">Продуманные точки и остановки</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <Icon name="Wallet" size={28} />
                  </div>
                  <div>
                    <div className="font-bold text-xl mb-1">Прозрачные цены</div>
                    <div className="text-blue-100">Без скрытых платежей</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="routes" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base px-4 py-2">
              Интерактивная карта
            </Badge>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent">
              12 маршрутов из Москвы
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы продумали ваш отдых! Выберите направление и получите готовый план путешествия с остановками
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="38" cy="43" r="2" fill="#dc2626" className="animate-pulse" />
                  <text x="38" y="40" textAnchor="middle" className="text-[3px] font-bold fill-gray-700">Москва</text>
                  
                  {routes.map(route => (
                    <g key={route.id}>
                      <line x1="38" y1="43" x2={route.coords.x} y2={route.coords.y} 
                        stroke={hoveredRoute === route.id ? '#2563eb' : '#94a3b8'} 
                        strokeWidth="0.3" 
                        strokeDasharray="1,1" 
                        opacity="0.5"
                      />
                      <circle 
                        cx={route.coords.x} 
                        cy={route.coords.y} 
                        r={hoveredRoute === route.id ? "2.5" : "1.5"}
                        fill={hoveredRoute === route.id ? '#2563eb' : '#3b82f6'}
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredRoute(route.id)}
                        onMouseLeave={() => setHoveredRoute(null)}
                        onClick={() => setSelectedRoute(route)}
                      />
                      {hoveredRoute === route.id && (
                        <text 
                          x={route.coords.x} 
                          y={route.coords.y - 3} 
                          textAnchor="middle" 
                          className="text-[2.5px] font-bold fill-blue-700"
                        >
                          {route.city}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                Наведите курсор на точку для просмотра информации
              </div>
            </div>

            <div className="space-y-4">
              {selectedRoute ? (
                <Card className="border-2 border-blue-600 shadow-2xl animate-scale-in">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl">Москва → {selectedRoute.city}</CardTitle>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setSelectedRoute(null)}>
                        <Icon name="X" size={20} />
                      </Button>
                    </div>
                    <CardDescription className="text-blue-100 text-lg">{selectedRoute.distance} км • {selectedRoute.days}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <h4 className="font-bold text-xl mb-4 text-gray-800">Выберите тип маршрута:</h4>
                      <div className="space-y-3">
                        <Card className="border-2 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-bold text-lg text-gray-800">Стандарт</div>
                                <div className="text-sm text-gray-600">Москва → {selectedRoute.city} → Москва</div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{selectedRoute.priceStandard.toLocaleString()} ₽</div>
                                <div className="text-xs text-gray-500">от суммы</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-bold text-lg text-gray-800">Комфорт</div>
                                <div className="text-sm text-gray-600">С остановками по пути (2-3 города)</div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{selectedRoute.priceComfort.toLocaleString()} ₽</div>
                                <div className="text-xs text-gray-500">от суммы</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 border-orange-500 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-r from-orange-50 to-yellow-50">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-bold text-lg text-orange-700 flex items-center gap-2">
                                  <Icon name="Star" size={20} className="fill-orange-500" />
                                  Премиум
                                </div>
                                <div className="text-sm text-gray-700">Расширенный маршрут (4-5 городов)</div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-orange-600">{selectedRoute.pricePremium.toLocaleString()} ₽</div>
                                <div className="text-xs text-gray-600">от суммы</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-3xl font-bold text-blue-600">{selectedRoute.distance} км</div>
                          <div className="text-sm text-gray-600">Расстояние</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-blue-600">{selectedRoute.days}</div>
                          <div className="text-sm text-gray-600">Длительность</div>
                        </div>
                      </div>
                    </div>

                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-14 text-lg shadow-lg">
                      <Icon name="Car" size={22} className="mr-2" />
                      Забронировать маршрут
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-2 border-dashed border-gray-300 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Icon name="MousePointer" size={64} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">Выберите направление на карте</h3>
                    <p className="text-gray-500 text-lg">Нажмите на любую точку, чтобы узнать детали маршрута и варианты поездки</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base px-4 py-2">
              Планирование поездки
            </Badge>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent">
              Рассчитайте стоимость вашего путешествия
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Выберите даты и укажите примерное расстояние — мы рассчитаем стоимость аренды
            </p>
          </div>

          <Card className="max-w-5xl mx-auto shadow-2xl border-2 border-gray-200">
            <CardContent className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-base font-bold text-gray-800 flex items-center gap-2">
                    <Icon name="CalendarArrowDown" size={20} className="text-blue-600" />
                    Дата начала аренды
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start h-14 text-base border-2 hover:border-blue-500">
                        <Icon name="Calendar" size={20} className="mr-3" />
                        {dateFrom ? format(dateFrom, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <label className="text-base font-bold text-gray-800 flex items-center gap-2">
                    <Icon name="CalendarArrowUp" size={20} className="text-orange-600" />
                    Дата окончания аренды
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start h-14 text-base border-2 hover:border-blue-500">
                        <Icon name="Calendar" size={20} className="mr-3" />
                        {dateTo ? format(dateTo, 'PPP', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <label className="text-base font-bold text-gray-800 flex items-center gap-2">
                  <Icon name="Route" size={20} className="text-blue-600" />
                  Примерное расстояние (км в одну сторону)
                </label>
                <Input 
                  type="number" 
                  value={selectedDistance} 
                  onChange={(e) => setSelectedDistance(Number(e.target.value))}
                  className="h-14 text-lg border-2 hover:border-blue-500"
                  placeholder="Например: 1000"
                />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="Info" size={16} />
                  Примерная длительность поездки: {estimatedDays} {estimatedDays === 1 ? 'день' : estimatedDays < 5 ? 'дня' : 'дней'}
                </div>
              </div>

              {dateFrom && dateTo && (
                <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 mb-8 border-2 border-blue-200 animate-scale-in">
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Количество дней</div>
                      <div className="text-4xl font-bold text-blue-600">
                        {Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Расстояние туда-обратно</div>
                      <div className="text-4xl font-bold text-blue-600">{selectedDistance * 2} км</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Цена за сутки</div>
                      <div className="text-4xl font-bold text-blue-600">4 000 ₽</div>
                    </div>
                  </div>
                  <div className="h-px bg-gray-300 my-6"></div>
                  <div className="text-center">
                    <div className="text-lg text-gray-700 mb-2">Итоговая стоимость аренды</div>
                    <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                      {calculatePrice().toLocaleString()} ₽
                    </div>
                  </div>
                </div>
              )}

              <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-16 text-xl shadow-xl">
                <Icon name="CheckCircle" size={24} className="mr-3" />
                Забронировать сейчас
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Бесплатная отмена • Без предоплаты • Страховка включена
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white text-base px-4 py-2">
              Простой процесс
            </Badge>
            <h2 className="text-5xl font-bold mb-6">
              Как происходит аренда
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold">1</div>
              <h3 className="text-2xl font-bold mb-3">Выбор</h3>
              <p className="text-blue-100 text-lg">Выберите маршрут и транспорт на сайте</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold">2</div>
              <h3 className="text-2xl font-bold mb-3">Бронирование</h3>
              <p className="text-blue-100 text-lg">Оставьте заявку и получите подтверждение</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold">3</div>
              <h3 className="text-2xl font-bold mb-3">Получение</h3>
              <p className="text-blue-100 text-lg">Приезжайте в офис и заберите авто</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-3xl font-bold">4</div>
              <h3 className="text-2xl font-bold mb-3">Путешествие</h3>
              <p className="text-blue-100 text-lg">Наслаждайтесь поездкой по России!</p>
            </div>
          </div>
        </div>
      </section>

      <section id="vehicles" className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base px-4 py-2">
              Наш автопарк
            </Badge>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent">
              Наши возможности
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              От минивэнов до автобусов — подберём транспорт для любой компании
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicles.map(vehicle => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-200">
                <div className="relative h-56 overflow-hidden">
                  <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover" />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base px-3 py-1">
                    {vehicle.type}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{vehicle.model}</h3>
                  <p className="text-gray-600 mb-4 text-lg">{vehicle.seats}</p>
                  <div className="space-y-2 mb-6">
                    {vehicle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon name="Check" size={16} className="text-blue-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-blue-600">{vehicle.price.split(' ')[0]}</span>
                    <span className="text-gray-500">{vehicle.price.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Забронировать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base px-4 py-2">
                О компании
              </Badge>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent">
                Русская Фантазия
              </h2>
            </div>
            
            <Card className="border-2 border-gray-200 shadow-xl overflow-hidden">
              <CardContent className="p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    Мы — команда энтузиастов, которые верят, что путешествия по России должны быть доступными, комфортными и незабываемыми. 
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed mb-8">
                    С 2015 года помогаем семьям и компаниям исследовать красоты нашей страны на комфортном транспорте. Более 5000 довольных клиентов уже отправились в путь с нами!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                      <div className="text-5xl font-bold text-blue-600 mb-2">11 лет</div>
                      <div className="text-gray-700 font-semibold">на рынке</div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
                      <div className="text-5xl font-bold text-orange-600 mb-2">5000+</div>
                      <div className="text-gray-700 font-semibold">довольных клиентов</div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                      <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
                      <div className="text-gray-700 font-semibold">автомобилей</div>
                    </div>
                  </div>

                  <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Наши ценности</h3>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start gap-3">
                        <Icon name="Heart" size={24} className="flex-shrink-0 mt-1" />
                        <span>Забота о каждом клиенте и персональный подход</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Shield" size={24} className="flex-shrink-0 mt-1" />
                        <span>Безопасность и надёжность на всех этапах путешествия</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Smile" size={24} className="flex-shrink-0 mt-1" />
                        <span>Честность и прозрачность в работе</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-base px-4 py-2">
              Отзывы клиентов
            </Badge>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent">
              Спасибо за доверие
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Читайте реальные отзывы наших клиентов
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="outline" size="lg" className="gap-2 border-2">
                <Icon name="ExternalLink" size={20} />
                Все отзывы на Авито
              </Button>
              <Button variant="outline" size="lg" className="gap-2 border-2">
                <Icon name="ExternalLink" size={20} />
                Все отзывы на Яндекс
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map(review => (
              <Card key={review.id} className="border-2 border-gray-200 hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={20} className="text-orange-500 fill-orange-500" />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-sm">{review.platform}</Badge>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 text-base">{review.text}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-semibold">{review.name}</span>
                    <span>{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base px-4 py-2">
                Контакты
              </Badge>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-orange-500 bg-clip-text text-transparent">
                Свяжитесь с нами
              </h2>
              <p className="text-xl text-gray-600">
                Ответим на все вопросы и поможем подобрать идеальный маршрут
              </p>
            </div>

            <Card className="border-2 border-gray-200 shadow-2xl">
              <CardContent className="p-10">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Ваше имя</label>
                      <Input placeholder="Иван Иванов" className="h-12 border-2" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Телефон</label>
                      <Input placeholder="+7 (999) 123-45-67" className="h-12 border-2" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Email</label>
                    <Input type="email" placeholder="example@mail.ru" className="h-12 border-2" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">Сообщение</label>
                    <textarea 
                      placeholder="Расскажите, куда планируете поехать и когда..."
                      className="w-full min-h-[150px] p-4 border-2 rounded-md resize-none"
                    />
                  </div>
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-14 text-lg shadow-lg">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src="https://cdn.poehali.dev/files/IMG_1080.PNG" alt="Русская Фантазия" className="h-16 w-auto mb-6 brightness-0 invert" />
              <p className="text-gray-400 leading-relaxed">
                Путешествия по России на комфортном транспорте с 2015 года
              </p>
              <div className="mt-6 flex gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <Icon name="Facebook" size={20} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <Icon name="Instagram" size={20} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <Icon name="Youtube" size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Маршруты</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Золотое кольцо</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Байкал</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Крым и Сочи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Дальний Восток</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Все маршруты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Компания</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#vehicles" className="hover:text-white transition-colors">Автопарк</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Условия аренды</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Вакансии</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Контакты</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <Icon name="Phone" size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold">+7 (495) 123-45-67</div>
                    <div className="text-sm">Ежедневно, 24/7</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Mail" size={20} className="flex-shrink-0 mt-0.5" />
                  <div className="text-white">info@rusfantasy.ru</div>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="flex-shrink-0 mt-0.5" />
                  <div>Москва, ул. Тверская, 1<br/>офис 101</div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              © 2026 Русская Фантазия. Путешествия по России начинаются здесь.
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
