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
  { 
    id: 1, 
    city: 'Казань',
    region: 'Республика Татарстан', 
    distance: '800 км', 
    duration: '2-3 дня', 
    coords: { lat: 55.7964, lng: 49.1089, x: 49, y: 56 }, 
    priceStandard: 8000, 
    priceComfort: 12000, 
    pricePremium: 16000,
    images: [
      'https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?w=800',
      'https://images.unsplash.com/photo-1585869284839-13c5e9f41165?w=800',
      'https://images.unsplash.com/photo-1612422656768-d5e4ec31fac0?w=800'
    ]
  },
  { 
    id: 2, 
    city: 'Санкт-Петербург',
    region: 'Ленинградская область', 
    distance: '700 км', 
    duration: '2-3 дня', 
    coords: { lat: 59.9343, lng: 30.3351, x: 30, y: 60 }, 
    priceStandard: 7000, 
    priceComfort: 10000, 
    pricePremium: 14000,
    images: [
      'https://images.unsplash.com/photo-1564868705557-7195914a9f19?w=800',
      'https://images.unsplash.com/photo-1556214983-3a99aafe6e4c?w=800',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
    ]
  },
  { 
    id: 3, 
    city: 'Сочи',
    region: 'Краснодарский край', 
    distance: '1600 км', 
    duration: '4-5 дней', 
    coords: { lat: 43.6028, lng: 39.7342, x: 40, y: 44 }, 
    priceStandard: 16000, 
    priceComfort: 24000, 
    pricePremium: 32000,
    images: [
      'https://images.unsplash.com/photo-1612351990022-a0b8cdda9b36?w=800',
      'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ]
  },
  { 
    id: 4, 
    city: 'Екатеринбург',
    region: 'Свердловская область', 
    distance: '1800 км', 
    duration: '4-6 дней', 
    coords: { lat: 56.8389, lng: 60.6057, x: 61, y: 57 }, 
    priceStandard: 18000, 
    priceComfort: 27000, 
    pricePremium: 36000,
    images: [
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800'
    ]
  },
  { 
    id: 5, 
    city: 'Нижний Новгород',
    region: 'Нижегородская область', 
    distance: '420 км', 
    duration: '1-2 дня', 
    coords: { lat: 56.2965, lng: 43.9361, x: 44, y: 56 }, 
    priceStandard: 4200, 
    priceComfort: 6000, 
    pricePremium: 8400,
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800',
      'https://images.unsplash.com/photo-1590564762767-a4f65d7a0e2e?w=800',
      'https://images.unsplash.com/photo-1568564321589-3e581d074e1b?w=800'
    ]
  },
  { 
    id: 6, 
    city: 'Ярославль',
    region: 'Ярославская область', 
    distance: '270 км', 
    duration: '1 день', 
    coords: { lat: 57.6261, lng: 39.8845, x: 40, y: 58 }, 
    priceStandard: 2700, 
    priceComfort: 4000, 
    pricePremium: 5400,
    images: [
      'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800',
      'https://images.unsplash.com/photo-1584466129727-0c03db7f8bca?w=800',
      'https://images.unsplash.com/photo-1541963058-d6c85b0c0b12?w=800'
    ]
  },
  { 
    id: 7, 
    city: 'Новосибирск',
    region: 'Новосибирская область', 
    distance: '3300 км', 
    duration: '8-10 дней', 
    coords: { lat: 55.0084, lng: 82.9357, x: 83, y: 55 }, 
    priceStandard: 33000, 
    priceComfort: 50000, 
    pricePremium: 66000,
    images: [
      'https://images.unsplash.com/photo-1577365876306-7f0f8e1fe6af?w=800',
      'https://images.unsplash.com/photo-1568640363784-862693a0f9e9?w=800',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800'
    ]
  },
  { 
    id: 8, 
    city: 'Краснодар',
    region: 'Краснодарский край', 
    distance: '1350 км', 
    duration: '3-4 дня', 
    coords: { lat: 45.0355, lng: 38.9753, x: 39, y: 46 }, 
    priceStandard: 13500, 
    priceComfort: 20000, 
    pricePremium: 27000,
    images: [
      'https://images.unsplash.com/photo-1590172741945-fb8b08928fc6?w=800',
      'https://images.unsplash.com/photo-1573655349936-de6bed86f839?w=800',
      'https://images.unsplash.com/photo-1580982172477-50f3f7f1f89e?w=800'
    ]
  },
  { 
    id: 9, 
    city: 'Владивосток',
    region: 'Приморский край', 
    distance: '9200 км', 
    duration: '20-25 дней', 
    coords: { lat: 43.1056, lng: 131.8735, x: 132, y: 43 }, 
    priceStandard: 92000, 
    priceComfort: 138000, 
    pricePremium: 184000,
    images: [
      'https://images.unsplash.com/photo-1598894731111-be5d498c2eae?w=800',
      'https://images.unsplash.com/photo-1585904881241-8e61ccf4b61c?w=800',
      'https://images.unsplash.com/photo-1613561512598-7b1c04d9f196?w=800'
    ]
  },
  { 
    id: 10, 
    city: 'Воронеж',
    region: 'Воронежская область', 
    distance: '520 км', 
    duration: '1-2 дня', 
    coords: { lat: 51.6720, lng: 39.1843, x: 40, y: 52 }, 
    priceStandard: 5200, 
    priceComfort: 7800, 
    pricePremium: 10400,
    images: [
      'https://images.unsplash.com/photo-1612200142110-9c0d5a57ef8f?w=800',
      'https://images.unsplash.com/photo-1580991961581-f23db0ab6c9b?w=800',
      'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800'
    ]
  },
  { 
    id: 11, 
    city: 'Ростов-на-Дону',
    region: 'Ростовская область', 
    distance: '1100 км', 
    duration: '3 дня', 
    coords: { lat: 47.2357, lng: 39.7015, x: 40, y: 48 }, 
    priceStandard: 11000, 
    priceComfort: 16500, 
    pricePremium: 22000,
    images: [
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800',
      'https://images.unsplash.com/photo-1551881192-d5c993936271?w=800'
    ]
  },
  { 
    id: 12, 
    city: 'Иркутск',
    region: 'Иркутская область', 
    distance: '5200 км', 
    duration: '12-15 дней', 
    coords: { lat: 52.2978, lng: 104.2964, x: 104, y: 52 }, 
    priceStandard: 52000, 
    priceComfort: 78000, 
    pricePremium: 104000,
    images: [
      'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=800',
      'https://images.unsplash.com/photo-1552652494-5394207d418c?w=800',
      'https://images.unsplash.com/photo-1594887226681-5749e88d8c91?w=800'
    ]
  },
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <img src="https://cdn.poehali.dev/files/IMG_1080.PNG" alt="Русская Фантазия" className="h-10 w-auto" />
            <div className="hidden lg:flex items-center gap-6">
              <a href="#routes" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Маршруты</a>
              <a href="#calculator" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Калькулятор</a>
              <a href="#vehicles" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Транспорт</a>
              <a href="#about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">О нас</a>
              <a href="#reviews" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Отзывы</a>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md text-sm">
              <Icon name="Phone" size={16} className="mr-1" />
              +7 (495) 123-45-67
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-16" style={{
        backgroundImage: 'url(https://cdn.poehali.dev/files/IMG_1122.PNG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <Badge className="mb-4 bg-white/20 backdrop-blur-lg text-white text-sm px-4 py-2 border border-white/30">
                <Icon name="MapPin" size={16} className="mr-2" />
                Старт из Москвы
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-2xl leading-tight">
                Путешествуй по всей России
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                12 готовых маршрутов с продуманными остановками. Возьмите комфортный транспорт и отправляйтесь в незабываемое путешествие!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="default" className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl" onClick={() => document.getElementById('routes')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon name="Map" size={18} className="mr-2" />
                  Выбрать маршрут
                </Button>
                <Button size="default" variant="outline" className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-lg" onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon name="Calculator" size={18} className="mr-2" />
                  Рассчитать
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="routes" className="py-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full mb-4 border border-white/30">
              <Icon name="Sparkles" size={18} className="text-orange-300 animate-pulse" />
              <span className="text-white font-semibold text-sm">Интерактивная карта</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white drop-shadow-xl">
              Выбери свой <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-yellow-200 to-orange-400">маршрут</span>
            </h2>
            <p className="text-sm text-blue-100 max-w-3xl mx-auto leading-relaxed">
              12 направлений по России • Нажми на точку и получи план поездки
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 rounded-2xl blur-xl opacity-40"></div>
                <div className="relative bg-white rounded-2xl p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                      <Icon name="Map" size={18} className="text-blue-600" />
                      Карта России
                    </h3>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-sm">
                      {routes.length} городов
                    </Badge>
                  </div>
                  <div className="relative w-full aspect-[2.2/1] rounded-xl overflow-hidden shadow-inner border-2 border-blue-300">
                    <img 
                      src="https://cdn.poehali.dev/projects/cdb115cf-04fc-4b69-a392-036f0de79f80/bucket/4b37ab87-47fb-4435-b959-a6dcbf29806d.PNG" 
                      alt="Карта России" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <svg viewBox="0 0 220 100" className="absolute inset-0 w-full h-full">
                      <defs>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <radialGradient id="moscowGlow">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity="1"/>
                          <stop offset="100%" stopColor="#dc2626" stopOpacity="0"/>
                        </radialGradient>
                      </defs>
                      
                      <circle cx="37" cy="56" r="8" fill="url(#moscowGlow)" className="animate-pulse" opacity="0.5" />
                      <circle cx="37" cy="56" r="4" fill="#dc2626" filter="url(#glow)" />
                      <circle cx="37" cy="56" r="2" fill="#ffffff" />
                      <text x="37" y="49" textAnchor="middle" className="text-[3.5px] font-black fill-white drop-shadow-lg">МОСКВА</text>
                      
                      {routes.map(route => (
                        <g key={route.id}>
                          <circle 
                            cx={route.coords.x} 
                            cy={route.coords.y} 
                            r={selectedRoute?.id === route.id ? "5" : hoveredRoute === route.id ? "4" : "3"}
                            fill={selectedRoute?.id === route.id ? '#f59e0b' : hoveredRoute === route.id ? '#fbbf24' : '#60a5fa'}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            className="cursor-pointer transition-all duration-300"
                            filter="url(#glow)"
                            onMouseEnter={() => setHoveredRoute(route.id)}
                            onMouseLeave={() => setHoveredRoute(null)}
                            onClick={() => setSelectedRoute(route)}
                          />
                          {(hoveredRoute === route.id || selectedRoute?.id === route.id) && (
                            <>
                              <rect
                                x={route.coords.x - 18}
                                y={route.coords.y - 13}
                                width="36"
                                height="8"
                                fill="#1e293b"
                                rx="2"
                                opacity="0.95"
                                filter="url(#glow)"
                              />
                              <text 
                                x={route.coords.x} 
                                y={route.coords.y - 7.5} 
                                textAnchor="middle" 
                                className="text-[3.2px] font-bold fill-white"
                              >
                                {route.city}
                              </text>
                            </>
                          )}
                        </g>
                      ))}
                      
                      <text x="110" y="10" textAnchor="middle" className="text-[2.5px] fill-blue-200 font-medium" opacity="0.6">Северный Ледовитый океан</text>
                      <text x="195" y="75" textAnchor="middle" className="text-[2.5px] fill-blue-200 font-medium" opacity="0.6">Тихий океан</text>
                    </svg>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-600 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-2">
                    <Icon name="MousePointer2" size={14} className="text-blue-600 animate-bounce" />
                    <span className="font-medium text-xs">Кликни на город</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
              {selectedRoute ? (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-xl blur-md opacity-30"></div>
                  <Card className="relative border-2 border-orange-400 shadow-lg animate-scale-in overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white p-3 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl">📍</span>
                        <div>
                          <div className="text-[10px] opacity-70">Маршрут</div>
                          <CardTitle className="text-sm font-bold">Москва → {selectedRoute.city}</CardTitle>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full h-6 w-6 p-0" onClick={() => setSelectedRoute(null)}>
                        <Icon name="X" size={14} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-2">
                      <div className="flex items-center gap-0.5 bg-white/20 px-2 py-0.5 rounded-full">
                        <Icon name="Route" size={12} />
                        <span className="font-semibold">{selectedRoute.distance} км</span>
                      </div>
                      <div className="flex items-center gap-0.5 bg-white/20 px-2 py-0.5 rounded-full">
                        <Icon name="Clock" size={12} />
                        <span className="font-semibold">{selectedRoute.days}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 space-y-2 bg-gradient-to-br from-orange-50 to-pink-50">
                    <div className="mb-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Icon name="Camera" size={14} className="text-orange-500" />
                        <h4 className="font-semibold text-xs text-gray-800">Фото города:</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {selectedRoute.images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow-sm group">
                            <img 
                              src={image} 
                              alt={`${selectedRoute.city} ${index + 1}`} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Icon name="Sparkles" size={14} className="text-orange-500" />
                        <h4 className="font-semibold text-sm text-gray-800">Тип маршрута:</h4>
                      </div>
                      <div className="space-y-1.5">
                        <Card className="border border-gray-300 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group">
                          <CardContent className="p-2 bg-gradient-to-r from-blue-50 to-blue-100 group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <div className="text-lg">🎯</div>
                                <div>
                                  <div className="font-semibold text-xs text-gray-800">Стандарт</div>
                                  <div className="text-[10px] text-gray-600">туда-обратно</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-blue-600">{selectedRoute.priceStandard.toLocaleString()} ₽</div>
                                <div className="text-[9px] text-gray-500">от суммы</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border border-gray-300 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group">
                          <CardContent className="p-2 bg-gradient-to-r from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200 transition-all">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 flex-1">
                                <div className="text-lg">🎨</div>
                                <div>
                                  <div className="font-semibold text-xs text-gray-800">Комфорт</div>
                                  <div className="text-[10px] text-gray-600">2-3 города</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-purple-600">{selectedRoute.priceComfort.toLocaleString()} ₽</div>
                                <div className="text-[9px] text-gray-500">от суммы</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 border-orange-500 hover:shadow-md transition-all cursor-pointer bg-gradient-to-r from-orange-100 to-yellow-100 group relative">
                          <div className="absolute top-0.5 right-0.5">
                            <Badge className="bg-red-500 text-white font-bold px-1.5 py-0.5 text-[9px]">ХИТ</Badge>
                          </div>
                          <CardContent className="p-2 group-hover:from-orange-200 group-hover:to-yellow-200 transition-all">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 flex-1">
                                <div className="text-lg">⭐</div>
                                <div>
                                  <div className="font-semibold text-xs text-orange-700 flex items-center gap-1">
                                    <Icon name="Crown" size={12} className="text-orange-500 fill-orange-500" />
                                    Премиум
                                  </div>
                                  <div className="text-[10px] text-gray-700">4-5 городов</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-orange-600">{selectedRoute.pricePremium.toLocaleString()} ₽</div>
                                <div className="text-[9px] text-gray-600">от суммы</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 text-sm font-bold shadow-lg transition-all">
                      <Icon name="Rocket" size={14} className="mr-1" />
                      Забронировать
                    </Button>
                  </CardContent>
                </Card>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur-md opacity-20"></div>
                  <Card className="relative border-2 border-dashed border-blue-400 shadow-md bg-gradient-to-br from-white to-blue-50">
                    <CardContent className="p-4 text-center">
                      <Icon name="MousePointer2" size={32} className="mx-auto text-blue-500 animate-bounce mb-2" />
                      <h3 className="text-base font-bold text-gray-800 mb-1">Выбери город!</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Кликни на точку на карте
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-blue-100 px-3 py-1 rounded-full">
                        <Icon name="Info" size={12} className="text-blue-600" />
                        <span className="text-blue-800 font-semibold text-[10px]">3 варианта</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>

          {selectedRoute && (
            <div className="mt-8 max-w-5xl mx-auto animate-scale-in">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200">
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 p-4 text-white text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-1">
                    🚗 Маршрут: Москва → {selectedRoute.city}
                  </h3>
                  <p className="text-sm opacity-90">
                    Подробное описание
                  </p>
                </div>

                <div className="p-4 md:p-6">
                  <div className="mb-6">
                    <h4 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Icon name="Camera" size={18} className="text-orange-500" />
                      Фотографии маршрута
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedRoute.images.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-md group cursor-pointer">
                          <img 
                            src={image} 
                            alt={`${selectedRoute.city} ${index + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                            <span className="text-white text-xs font-semibold">Фото {index + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                          <Icon name="Route" size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 mb-1">Расстояние и время</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            <strong className="text-blue-600">{selectedRoute.distance} км</strong> в одну сторону. 
                            Продолжительность: <strong className="text-blue-600">{selectedRoute.days}</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                          <Icon name="CheckCircle" size={20} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 mb-1">Что включено</h4>
                          <ul className="space-y-1 text-gray-600 text-xs">
                            <li className="flex items-center gap-1.5">
                              <Icon name="Check" size={14} className="text-green-600" />
                              Страховка (КАСКО + ОСАГО)
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Icon name="Check" size={14} className="text-green-600" />
                              Поддержка 24/7
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Icon name="Check" size={14} className="text-green-600" />
                              Карта с точками интереса
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Icon name="Check" size={14} className="text-green-600" />
                              Рекомендации по отелям
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                          <Icon name="MapPin" size={20} className="text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 mb-1">Ключевые точки</h4>
                          <div className="bg-purple-50 rounded-lg p-2 space-y-1">
                            <div className="flex items-center gap-1.5 text-purple-700 text-xs">
                              <Icon name="MapPin" size={12} className="flex-shrink-0" />
                              <span>Исторические центры</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-purple-700 text-xs">
                              <Icon name="Camera" size={12} className="flex-shrink-0" />
                              <span>Смотровые площадки</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-purple-700 text-xs">
                              <Icon name="Landmark" size={12} className="flex-shrink-0" />
                              <span>Памятники</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-purple-700 text-xs">
                              <Icon name="Trees" size={12} className="flex-shrink-0" />
                              <span>Заповедники</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-orange-100 rounded-full p-2 flex-shrink-0">
                          <Icon name="Calendar" size={20} className="text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 mb-1">Лучшее время</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">
                            Оптимальный сезон: <strong className="text-orange-600">май-сентябрь</strong>. 
                            Комфортная погода.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-xl p-4 border border-orange-200">
                    <div className="text-center mb-3">
                      <h4 className="text-base font-bold text-gray-800 mb-1">
                        💰 Выгодные цены
                      </h4>
                      <p className="text-gray-600 text-xs">
                        Выберите подходящий вариант
                      </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow border border-blue-200">
                        <div className="text-center mb-2">
                          <div className="text-2xl mb-1">🎯</div>
                          <h5 className="text-sm font-bold text-gray-800">Стандарт</h5>
                          <p className="text-[10px] text-gray-600">туда-обратно</p>
                        </div>
                        <div className="text-center mb-2">
                          <div className="text-lg font-bold text-blue-600">{selectedRoute.priceStandard.toLocaleString()} ₽</div>
                          <div className="text-[9px] text-gray-500">от суммы</div>
                        </div>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li className="flex items-center gap-1">
                            <Icon name="Check" size={12} className="text-blue-600" />
                            Прямой маршрут
                          </li>
                          <li className="flex items-center gap-1">
                            <Icon name="Check" size={12} className="text-blue-600" />
                            Основные точки
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow border border-purple-200">
                        <div className="text-center mb-2">
                          <div className="text-2xl mb-1">🎨</div>
                          <h5 className="text-sm font-bold text-gray-800">Комфорт</h5>
                          <p className="text-[10px] text-gray-600">2-3 города</p>
                        </div>
                        <div className="text-center mb-2">
                          <div className="text-lg font-bold text-purple-600">{selectedRoute.priceComfort.toLocaleString()} ₽</div>
                          <div className="text-[9px] text-gray-500">от суммы</div>
                        </div>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li className="flex items-center gap-1">
                            <Icon name="Check" size={12} className="text-purple-600" />
                            Остановки
                          </li>
                          <li className="flex items-center gap-1">
                            <Icon name="Check" size={12} className="text-purple-600" />
                            Больше впечатлений
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow border-2 border-orange-300 relative">
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-red-500 text-white font-bold px-2 py-0.5 text-[9px]">ХИТ!</Badge>
                        </div>
                        <div className="text-center mb-2">
                          <div className="text-2xl mb-1">⭐</div>
                          <h5 className="text-sm font-bold text-orange-700">Премиум</h5>
                          <p className="text-[10px] text-gray-700">4-5 городов</p>
                        </div>
                        <div className="text-center mb-2">
                          <div className="text-lg font-bold text-orange-600">{selectedRoute.pricePremium.toLocaleString()} ₽</div>
                          <div className="text-[9px] text-gray-600">от суммы</div>
                        </div>
                        <ul className="space-y-1 text-xs text-gray-700">
                          <li className="flex items-center gap-1">
                            <Icon name="Check" size={12} className="text-orange-600" />
                            Максимум точек
                          </li>
                          <li className="flex items-center gap-1">
                            <Icon name="Check" size={12} className="text-orange-600" />
                            VIP поддержка
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <Button size="default" className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 text-white px-6 text-sm font-bold shadow-lg transition-all">
                      <Icon name="Phone" size={16} className="mr-2" />
                      Забронировать
                    </Button>
                    <p className="mt-2 text-gray-600 text-xs">
                      Или позвоните: <strong className="text-blue-600">8 (800) 555-35-35</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full mb-6 border border-white/30">
              <Icon name="Award" size={24} className="text-yellow-300" />
              <span className="text-white font-bold text-lg">Наши преимущества</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-6 text-white drop-shadow-2xl">
              Почему выбирают нас?
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              Мы делаем путешествия простыми, безопасными и незабываемыми
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl h-full">
                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Shield" size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Полная страховка</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  КАСКО и ОСАГО включены в стоимость. Путешествуйте спокойно!
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl h-full">
                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Clock" size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Поддержка 24/7</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Всегда на связи в любой точке России. Решим любой вопрос!
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl h-full">
                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="MapPin" size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Готовые маршруты</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  12 проверенных направлений с остановками и достопримечательностями
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all hover:scale-105 hover:shadow-2xl h-full">
                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Wallet" size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Прозрачные цены</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Никаких скрытых платежей. Что видите — то и платите!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 h-16 px-12 text-xl font-black shadow-2xl hover:scale-105 transition-all">
              <Icon name="Phone" size={24} className="mr-3" />
              Позвонить нам сейчас
            </Button>
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